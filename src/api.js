// ===== API MODULE =====
// Supabase integração e sincronização com nuvem

const SUPABASE_URL = "https://papakiwailmirguubanf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcGFraXdhaWxtaXJndXViYW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NzEwNjksImV4cCI6MjA5NjQ0NzA2OX0.ffBCveRc8Snwj7TBvTEAv7K8sLEIjTNEZjlSuBwqh8M";

export function sb() {
  if (!window._sb && window.supabase) {
    try { window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); }
    catch (e) { /* Supabase init falhou silenciosamente */ }
  }
  return window._sb;
}

export async function syncOnStartup() {
  const client = sb();
  if (!client) return;
  try {
    const { data, error } = await client.from("places").select("data");
    if (error) {
      showErrorNotification("Falha ao carregar da nuvem. Usando dados locais.");
      return;
    }
    if (data && data.length) {
      let incoming = data.map(row => migrate(row.data));
      // Remove lugares-demo que ainda estejam na nuvem
      const hadDemoCloud = incoming.some(r => DEMO_IDS.includes(r.id));
      incoming = incoming.filter(r => !DEMO_IDS.includes(r.id));
      if (hadDemoCloud) DEMO_IDS.forEach(id => { try { deleteFromCloud(id); } catch (e) {} });

      const incomingIds = new Set(incoming.map(r => r.id));
      const localIds = new Set(restaurants.map(r => r.id));
      const idsChanged = incomingIds.size !== localIds.size ||
        ![...incomingIds].every(id => localIds.has(id));
      if (idsChanged) {
        setRestaurants(incoming);
        saveLocal();
        populateFilters();
        render();
        updateStats();
      }
    } else if (restaurants.length) {
      await pushAll();
    }
  } catch (e) { /* Supabase indisponível silenciosamente */ }
}

export function schedulePush() {
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(pushAll, DELAY_CLOUD_SYNC);
}

export async function pushAll() {
  const client = sb();
  if (!client || !restaurants.length) return;
  const rows = restaurants.map(r => ({ id: r.id, data: r, updated_at: new Date().toISOString() }));
  const { error } = await client.from("places").upsert(rows);
  if (error) {
    showErrorNotification("Falha ao salvar na nuvem. Dados locais preservados.");
  }
}

export async function deleteFromCloud(id) {
  const client = sb();
  if (!client) return;
  const { error } = await client.from("places").delete().eq("id", id);
}

export async function clearCloud() {
  const client = sb();
  if (!client) return;
  const { error } = await client.from("places").delete().neq("id", "");
}

export async function purgeDemoSeedsCloud() {
  const client = sb();
  if (!client) return;
  for (const id of DEMO_IDS) {
    const { error } = await client.from("places").delete().eq("id", id);
  }
}

export async function uploadToStorage(dataUrl, prefix) {
  const client = sb();
  if (!client || !dataUrl || !dataUrl.startsWith("data:")) return dataUrl;
  try {
    const blob = await (await fetch(dataUrl)).blob();
    const ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
    const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await client.storage.from("photos").upload(path, blob, { contentType: blob.type, upsert: false });
    if (error) { return dataUrl; }
    const { data } = client.storage.from("photos").getPublicUrl(path);
    return data.publicUrl || dataUrl;
  } catch (e) {
    return dataUrl;
  }
}
