// ===== DADOS INICIAIS =====
// Sem lugares-demo: o app começa vazio e adota os dados reais da nuvem.
const DEFAULT_RESTAURANTS = [];
// IDs dos antigos lugares-demo, que devem ser removidos de vez (voltavam pela
// sincronização). Ver purgeDemoSeeds().
const DEMO_IDS = ["demo-1", "demo-2", "demo-3"];

const CATEGORY_IMAGES = {
  "Hambúrguer": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
  "Pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
  "Italiano": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
  "Japonês": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80",
  "Café": "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=80",
  "Pub": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80",
  "Carnes": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
  "Brasileiro": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80",
  "Vegetariano": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
  "Doceria": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
  "Outro": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80"
};

// ===== CATÁLOGO DE RESTAURANTES POPULARES DE PORTO ALEGRE =====
// Usado para sugestões ao digitar o nome do restaurante.
// instagram = handle do Instagram (sem @). Se não souber, deixe vazio e usaremos a busca.
const POA_CATALOG = [
  { name: "Agridoce Cafeteria",        bairro: "Cidade Baixa",      categoria: "Café",        instagram: "agridocecafeteria",   price: "$" },
  { name: "Severo Garage",             bairro: "Bom Fim",           categoria: "Hambúrguer",  instagram: "severogarage",        price: "$$" },
  { name: "Koh Pee Pee",               bairro: "Moinhos de Vento",  categoria: "Outro",       instagram: "kohpeepee",           price: "$$$" },
  { name: "Hashi Art Cuisine",         bairro: "Bela Vista",        categoria: "Japonês",     instagram: "hashiartcuisine",     price: "$$$$" },
  { name: "Atelier das Massas",        bairro: "Auxiliadora",       categoria: "Italiano",    instagram: "atelierdasmassas",    price: "$$$" },
  { name: "Press Café",                bairro: "Moinhos de Vento",  categoria: "Café",        instagram: "presscafepoa",        price: "$$" },
  { name: "Galpão Crioulo",            bairro: "Praia de Belas",    categoria: "Carnes",      instagram: "galpaocrioulo",       price: "$$$" },
  { name: "Na Brasa",                  bairro: "Bela Vista",        categoria: "Carnes",      instagram: "nabrasapoa",          price: "$$$$" },
  { name: "Don Itálo Cucina",          bairro: "Moinhos de Vento",  categoria: "Italiano",    instagram: "donitalocucina",      price: "$$$" },
  { name: "Lola Cocina",               bairro: "Moinhos de Vento",  categoria: "Outro",       instagram: "lolacocina",          price: "$$$" },
  { name: "Salumeria Central",         bairro: "Centro Histórico",  categoria: "Italiano",    instagram: "salumeriacentral",    price: "$$" },
  { name: "Bar do Beto",               bairro: "Cidade Baixa",      categoria: "Pub",         instagram: "bardobetopoa",        price: "$$" },
  { name: "Bah Garagem & Cozinha",     bairro: "Cidade Baixa",      categoria: "Hambúrguer",  instagram: "bahgaragem",          price: "$$" },
  { name: "Etiqueta Bar",              bairro: "Moinhos de Vento",  categoria: "Pub",         instagram: "etiquetabar",         price: "$$$" },
  { name: "Mamma Mia",                 bairro: "Moinhos de Vento",  categoria: "Pizza",       instagram: "mammamiapoa",         price: "$$" },
  { name: "Padeirinho do Sul",         bairro: "Menino Deus",       categoria: "Doceria",     instagram: "padeirinhodosul",     price: "$" },
  { name: "Tropeiro Churrascaria",     bairro: "Praia de Belas",    categoria: "Carnes",      instagram: "tropeirochurrascaria",price: "$$$" },
  { name: "Vegana",                    bairro: "Bom Fim",           categoria: "Vegetariano", instagram: "veganapoa",           price: "$$" },
  { name: "Voilà Bistrot",             bairro: "Moinhos de Vento",  categoria: "Outro",       instagram: "voilabistrot",        price: "$$$" },
  { name: "Brewpub Lake Side",         bairro: "Tres Figueiras",    categoria: "Pub",         instagram: "brewpublakeside",     price: "$$$" },
  { name: "Toca do Mel",               bairro: "Bom Fim",           categoria: "Café",        instagram: "tocadomel",           price: "$" },
  { name: "Estaminé Café",             bairro: "Moinhos de Vento",  categoria: "Café",        instagram: "estaminecafe",        price: "$$" },
  { name: "Cervejaria Tupiniquim",     bairro: "Moinhos de Vento",  categoria: "Pub",         instagram: "tupiniquimbrewing",   price: "$$" },
  { name: "Boteco Quintana",           bairro: "Cidade Baixa",      categoria: "Brasileiro",  instagram: "botecoquintana",      price: "$$" },
  { name: "Aroma Sushi",               bairro: "Moinhos de Vento",  categoria: "Japonês",     instagram: "aromasushi",          price: "$$$" },
  { name: "Hamburgueria Black Beef",   bairro: "Bom Fim",           categoria: "Hambúrguer",  instagram: "blackbeefpoa",        price: "$$" },
  { name: "Casa de Pizza",             bairro: "Bela Vista",        categoria: "Pizza",       instagram: "casadepizza",         price: "$$" },
  { name: "Tudo Pelo Social",          bairro: "Cidade Baixa",      categoria: "Pub",         instagram: "tudopelosocialpoa",   price: "$" },
  { name: "Chez Philippe",             bairro: "Auxiliadora",       categoria: "Outro",       instagram: "chezphilippepoa",     price: "$$$$" },
  { name: "Confeitaria Tonin",         bairro: "Auxiliadora",       categoria: "Doceria",     instagram: "confeitariatonin",    price: "$$" }
];

const CATEGORIA_EMOJI = {
  "Hambúrguer":"🍔","Pizza":"🍕","Italiano":"🍝","Japonês":"🍣","Café":"☕",
  "Pub":"🍺","Carnes":"🥩","Brasileiro":"🇧🇷","Vegetariano":"🥗","Doceria":"🍰","Outro":"🍽️"
};

// ===== CONSTANTES =====
// Delays de animação e sincronização (em ms)
const DELAY_MAP_RENDER = 60;      // re-renderizar mapa após resize
const DELAY_CLOUD_SYNC = 800;     // sincronizar com nuvem (debounced)
const INTERVAL_FIREWORKS = 2400;  // intervalo de explosões de fogos de artifício

// IDs dos modais
const MODAL_IDS = {
  detail: "modal-detail",
  add: "modal-add",
  menu: "modal-menu",
  stats: "modal-stats",
  confirm: "modal-confirm"
};

// Classes CSS importantes
const CSS_CLASSES = {
  modalActive: "active",
  modalOpen: "modal-open"
};

// ===== ESTADO =====
let restaurants = [];
let currentFilter = "todos";
let currentSearch = "";
let currentSort = "recent";
let currentCategoria = "";
let currentBairro = "";
let currentView = "list";

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("role_poa_restaurants");
  if (stored) {
    try {
      restaurants = JSON.parse(stored).map(migrate);
    } catch { restaurants = [...DEFAULT_RESTAURANTS]; }
  } else {
    restaurants = [...DEFAULT_RESTAURANTS];
    saveToStorage();
  }
  purgeDemoSeeds();   // tira os lugares-demo antigos do aparelho (e da nuvem)

  setupPricePicker();
  populateFilters();
  render();
  animateStats();
  checkUrlImports();
  syncOnStartup();
  purgeDemoSeeds();
  setupModalScrollLock();
  setupModalClose();
});

// ===== SEÇÕES DO APP =====
// STATE: variáveis globais (linhas ~63-70)
// API (Supabase): sincronização e armazenamento na nuvem (linhas ~258-355)
// RENDERING Cards: renderização da lista de cartões (linhas ~376-542)
// RENDERING Modals: modais de detalhe, adicionar e editar (linhas ~1728-2150)
// UI Interactions: filtros, busca, favoritos, etc (linhas ~683-786)
// RATINGS: avaliações por estrelas (linhas ~1729-1993)
// UTILITY: funções auxiliares de formatação e validação (linhas ~3040+)

// Referência ao MutationObserver dos modais (para cleanup)
let _modalObserver = null;

// Remove de vez os lugares-demo (sementes antigas) que voltavam pela sincronização.
// Limpa o aparelho e manda apagar da nuvem também.
function purgeDemoSeeds() {
  const before = restaurants.length;
  restaurants = restaurants.filter(r => !DEMO_IDS.includes(r.id));
  if (restaurants.length !== before) {
    saveLocal();
    DEMO_IDS.forEach(id => { try { deleteFromCloud(id); } catch (e) {} });
  }
}

// Trava o scroll do fundo enquanto QUALQUER modal estiver aberto.
// Evita o flicker no celular (barra de endereço mexendo + fundo rolando).
function setupModalScrollLock() {
  const sync = () => {
    const open = document.querySelector(".modal.active") || document.getElementById("welcome-overlay");
    document.body.classList.toggle("modal-open", !!open);
  };
  _modalObserver = new MutationObserver(sync);
  document.querySelectorAll(".modal").forEach(m =>
    _modalObserver.observe(m, { attributes: true, attributeFilter: ["class"] }));
  // Observa também a entrada/saída da tela de boas-vindas (criada dinamicamente).
  new MutationObserver(sync).observe(document.body, { childList: true });
  sync();
}

function cleanupModalScrollLock() {
  if (_modalObserver) {
    _modalObserver.disconnect();
    _modalObserver = null;
  }
}

// ===== MODAL CLOSE LISTENER (removível) =====
let _modalCloseListener = null;

function setupModalClose() {
  _modalCloseListener = e => {
    if (e.target.classList?.contains("modal")) {
      e.target.classList.remove("active");
    }
  };
  document.addEventListener("click", _modalCloseListener);
}

function cleanupModalClose() {
  if (_modalCloseListener) {
    document.removeEventListener("click", _modalCloseListener);
    _modalCloseListener = null;
  }
}

// Migração de campos novos
function migrate(r) {
  const m = {
    favorite: false,
    notes: "",
    price: "$$",
    instagram: "",
    reels: "",
    photos: [],
    dishes: [],
    photoPos: "center",
    logo: "",
    createdAt: Date.now(),
    ...r
  };
  if (!Array.isArray(m.photos)) m.photos = [];
  if (!Array.isArray(m.dishes)) m.dishes = [];
  // Dados antigos guardavam o PERFIL do Instagram no campo "reels".
  // Se "reels" for um perfil (e não um reel/post), move pra "instagram".
  if (m.reels && !m.instagram) {
    if (!/instagram\.com\/(reel|reels|p|tv)\//i.test(m.reels)) {
      const mm = m.reels.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
      if (mm) { m.instagram = mm[1]; m.reels = ""; }
    }
  }
  // Avaliações: LISTA de avaliações { id, person, ...notas }. Migra formatos antigos.
  if (Array.isArray(m.ratings)) {
    // já no formato novo
  } else if (m.ratings && typeof m.ratings === "object") {
    // Formato antigo { marcelo:{...}, andressa:{...} } -> lista com nomes.
    m.ratings = Object.keys(m.ratings).filter(k => m.ratings[k]).map(k => ({
      id: "rt-" + k,
      person: k.charAt(0).toUpperCase() + k.slice(1),
      ...m.ratings[k]
    }));
  } else {
    m.ratings = [];
    // Avaliação legada (única) vira a primeira da lista.
    if (m.rating && (m.rating.average || m.rating.comida)) {
      m.ratings.push(legacyToRating(m.rating, "Marcelo"));
    }
  }
  recomputeCombined(m);
  return m;
}

// Extrai o handle (@perfil) de um texto: @perfil, perfil ou URL do Instagram.
function extractInstagramHandle(raw) {
  const s = (raw || "").trim();
  if (!s) return "";
  const m = s.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
  if (m && !/^(reel|reels|p|tv|explore)$/i.test(m[1])) return m[1];
  return s.replace(/^@/, "").replace(/[^A-Za-z0-9._]/g, "");
}

// URL do perfil do Instagram a partir do registro.
function instagramProfileUrl(r) {
  return r.instagram ? `https://www.instagram.com/${r.instagram}/` : "";
}

// Avatar/logo do Instagram via unavatar.io (sem chave; redireciona pra CDN do IG).
function instagramAvatarUrl(handle) {
  const h = (handle || "").replace(/^@/, "").toLowerCase();
  return h ? `https://unavatar.io/instagram/${h}` : "";
}

// Fundo da capa: foto do lugar por cima + imagem da categoria por baixo (fallback
// se a foto do Google falhar ao carregar fora do localhost).
function coverBg(r) {
  const cat = CATEGORY_IMAGES[r.categoria] || CATEGORY_IMAGES["Outro"];
  return r.photo
    ? `url('${escapeAttr(r.photo)}'), url('${escapeAttr(cat)}')`
    : `url('${escapeAttr(cat)}')`;
}

// Logo do lugar: logo customizado, ou o avatar do Instagram.
function placeLogoUrl(r) {
  if (r.logo) return r.logo;
  return r.instagram ? instagramAvatarUrl(r.instagram) : "";
}

// Logo pequeno ao lado do nome (substitui o logo no meio da foto).
function titleLogoHTML(r) {
  const logoUrl = placeLogoUrl(r);
  const emoji = CATEGORIA_EMOJI[r.categoria] || "🍽️";
  const img = logoUrl ? `<img src="${escapeAttr(logoUrl)}" alt="" onerror="this.style.display='none'">` : "";
  return `<span class="title-logo"><span class="title-logo-emoji">${emoji}</span>${img}</span>`;
}

// ===== STORAGE (localStorage = cache offline) =====
function saveLocal() {
  try {
    localStorage.setItem("role_poa_restaurants", JSON.stringify(restaurants));
    return true;
  } catch (e) {
    console.error("Falha ao salvar local (cota cheia?):", e);
    return false;
  }
}
function saveToStorage() {
  const ok = saveLocal();
  updateStats();
  schedulePush(); // sincroniza com a nuvem (debounced)
  return ok;
}

// ===== SUPABASE (nuvem) =====
const SUPABASE_URL = "https://papakiwailmirguubanf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcGFraXdhaWxtaXJndXViYW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NzEwNjksImV4cCI6MjA5NjQ0NzA2OX0.ffBCveRc8Snwj7TBvTEAv7K8sLEIjTNEZjlSuBwqh8M";
let _sb = null;
function sb() {
  if (!_sb && window.supabase) {
    try { _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); }
    catch (e) { /* Supabase init falhou silenciosamente */ }
  }
  return _sb;
}

// Sincroniza na abertura: adota a nuvem se tiver dados; senão sobe o que é local.
async function syncOnStartup() {
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
      // Remove lugares-demo que ainda estejam na nuvem e manda apagá-los de lá.
      const hadDemoCloud = incoming.some(r => DEMO_IDS.includes(r.id));
      incoming = incoming.filter(r => !DEMO_IDS.includes(r.id));
      if (hadDemoCloud) DEMO_IDS.forEach(id => { try { deleteFromCloud(id); } catch (e) {} });
      // Só re-renderiza se a nuvem trouxer algo DIFERENTE do que já está na tela
      // (evita um segundo render desnecessário no boot, que causava piscada).
      const incomingIds = new Set(incoming.map(r => r.id));
      const localIds = new Set(restaurants.map(r => r.id));
      const idsChanged = incomingIds.size !== localIds.size ||
        ![...incomingIds].every(id => localIds.has(id));
      if (idsChanged) {
        restaurants = incoming;
        saveLocal();
        populateFilters();
        render();
        updateStats();
      }
    } else if (restaurants.length) {
      await pushAll(); // nuvem vazia: primeira sincronização (sobe o local)
    }
  } catch (e) { /* Supabase indisponível silenciosamente */ }
}

let _pushTimer = null;
function schedulePush() {
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(pushAll, DELAY_CLOUD_SYNC);
}
async function pushAll() {
  const client = sb();
  if (!client || !restaurants.length) return;
  const rows = restaurants.map(r => ({ id: r.id, data: r, updated_at: new Date().toISOString() }));
  const { error } = await client.from("places").upsert(rows);
  if (error) {
    showErrorNotification("Falha ao salvar na nuvem. Dados locais preservados.");
  }
}
async function deleteFromCloud(id) {
  const client = sb();
  if (!client) return;
  const { error } = await client.from("places").delete().eq("id", id);
}
async function clearCloud() {
  const client = sb();
  if (!client) return;
  const { error } = await client.from("places").delete().neq("id", "");
}
// Remove os antigos lugares-demo que voltavam pela sincronização.
async function purgeDemoSeeds() {
  const client = sb();
  if (!client) return;
  for (const id of DEMO_IDS) {
    const { error } = await client.from("places").delete().eq("id", id);
  }
}

// Sobe um dataURL pro Storage e devolve a URL pública (fallback: o próprio dataURL).
async function uploadToStorage(dataUrl, prefix) {
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

// ===== POPULAR FILTROS =====
function populateFilters() {
  const cats = [...new Set(restaurants.map(r => r.categoria))].sort();
  const bairros = [...new Set(restaurants.map(r => r.bairro))].sort();

  const catSelect = document.getElementById("filter-categoria");
  const baiSelect = document.getElementById("filter-bairro");
  const curCat = catSelect.value;
  const curBai = baiSelect.value;

  catSelect.innerHTML = `<option value="">Todas categorias</option>` +
    cats.map(c => `<option value="${escapeAttr(c)}">${CATEGORIA_EMOJI[c]||"🍽️"} ${escapeHtml(c)}</option>`).join("");
  baiSelect.innerHTML = `<option value="">Todos bairros</option>` +
    bairros.map(b => `<option value="${escapeAttr(b)}">${escapeHtml(b)}</option>`).join("");

  catSelect.value = curCat;
  baiSelect.value = curBai;
}

// ===== RENDER =====
function getFilteredRestaurants() {
  currentCategoria = document.getElementById("filter-categoria")?.value || "";
  currentBairro = document.getElementById("filter-bairro")?.value || "";
  currentSort = document.getElementById("sort-by")?.value || "recent";

  const filtered = restaurants.filter(r => {
    if (currentFilter === "favoritos") { if (!r.favorite) return false; }
    else if (currentFilter !== "todos" && r.status !== currentFilter) return false;
    if (currentCategoria && r.categoria !== currentCategoria) return false;
    if (currentBairro && r.bairro !== currentBairro) return false;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const comments = r.ratings ? Object.values(r.ratings).map(p => p && p.comments) : [];
      const hay = [r.name, r.bairro, r.categoria, r.notes, ...comments].filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    switch (currentSort) {
      case "rating":
        return (b.rating?.average || 0) - (a.rating?.average || 0);
      case "name": return a.name.localeCompare(b.name);
      case "bairro": return a.bairro.localeCompare(b.bairro);
      default: return (b.createdAt || 0) - (a.createdAt || 0);
    }
  });
  return filtered;
}

function render() {
  const filtered = getFilteredRestaurants();

  const grid = document.getElementById("restaurants-grid");
  const sectionTitle = document.getElementById("section-title");
  const titleMap = {
    "todos": "Todos os Lugares 🍽️",
    "para-conhecer": "Para Conhecer 📌",
    "ja-fui": "Já Fui & Avaliados ✅",
    "favoritos": "Seus Favoritos ❤️"
  };
  sectionTitle.innerHTML = titleMap[currentFilter] + ` <small style="font-size:13px;color:var(--text-muted);font-family:var(--font-ui);font-weight:500;">(${filtered.length})</small>`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${currentSearch ? "🔎" : "📍"}</div>
        <div class="empty-text">${currentSearch ? "Nada encontrado para sua busca." : "Nenhum lugar por aqui ainda!"}</div>
        <button class="btn-primary" onclick="openAddModal()" style="display:inline-block; width:auto; padding: 12px 24px;">+ Adicionar lugar</button>
      </div>`;
    updateStats();
    return;
  }

  grid.innerHTML = filtered.map(renderCard).join("");
  // Animação de entrada (cascata) só na PRIMEIRA renderização — evita o "piscar"
  // que acontecia quando o render() rodava de novo (boot, favoritar, filtrar...).
  if (_introDone) {
    grid.classList.remove("intro");
  } else {
    grid.classList.add("intro");
    _introDone = true;
    setTimeout(() => grid.classList.remove("intro"), 900);
  }
  updateStats();

  if (currentView === "map") renderMapMarkers(filtered);
}
let _introDone = false;

function renderCard(r) {
  const searchString = encodeURIComponent(`${r.name} ${r.bairro} Porto Alegre`);
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${searchString}`;
  const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${searchString}`;

  let badgeHtml = "";
  if (r.status === "ja-fui" && r.rating) {
    badgeHtml = `<div class="card-badge rating">★ ${Number(r.rating.average).toFixed(1)}</div>`;
  } else {
    badgeHtml = `<div class="card-badge todo">📌 Conhecer</div>`;
  }

  let ratingHtml = "";
  if (r.status === "ja-fui" && r.rating) {
    const cardRatingShort = {
      comida: "🍔 Comida", bebida: "🍹 Bebida", atendimento: "🧑‍🍳 Atend.", ambiente: "🪑 Ambiente",
      preco: "💰 Preço", instagramavel: "📸 Instag.", experiencia: "❤️ Exper."
    };
    const ratingRows = RATE_CATS.map(c =>
      `<div class="rating-item-summary">${cardRatingShort[c.key]} <span>${r.rating[c.key] || "–"}</span></div>`
    ).join("");
    const raters = r.rating.raters || [];
    const peopleLine = raters.map(p => {
      const drink = DRINK_TYPES.find(d => d.key === p.bebidaTipo);
      return `<span class="rater-chip">👤 ${escapeHtml(p.person)} <strong>${p.average}</strong>★${drink ? ` ${drink.emoji}` : ""}</span>`;
    }).join("");
    const commentsLine = (Array.isArray(r.ratings) ? r.ratings : []).filter(rt => rt.comments).map(rt =>
      `<div class="rating-comment">👤 ${escapeHtml(rt.person)}: "${escapeHtml(rt.comments)}"</div>`
    ).join("");
    ratingHtml = `
      <div class="card-ratings-summary">
        <div class="rater-count">👥 ${r.rating.count} ${r.rating.count === 1 ? "avaliação" : "avaliações"}${r.rating.date ? ` · 📅 ${formatDateBR(r.rating.date)}` : ""}</div>
        ${peopleLine ? `<div class="rater-chips">${peopleLine}</div>` : ""}
        <div class="rating-grid">
          ${ratingRows}
        </div>
        ${commentsLine}
      </div>`;
  } else if (r.notes) {
    ratingHtml = `<div class="card-ratings-summary"><div class="rating-comment">📝 ${escapeHtml(r.notes)}</div></div>`;
  }

  const igUrl = instagramProfileUrl(r);
  return `
    <div class="restaurant-card ${r.status === 'ja-fui' ? 'visited' : ''}" data-cat="${escapeAttr(r.categoria)}" onclick="cardClick(event, '${r.id}')">
      <div class="card-image-wrapper">
        <div class="card-image" style="background-image: ${coverBg(r)}; background-position: ${escapeAttr(r.photoPos || 'center')}"></div>
        ${badgeHtml}
        <button class="card-fav ${r.favorite ? 'active' : ''}" data-id="${r.id}" onclick="event.stopPropagation(); toggleFavorite('${r.id}')" title="Favoritar">${r.favorite ? '❤️' : '🤍'}</button>
        ${(r.photos && r.photos.length) ? `<div class="card-badge photos">📸 ${r.photos.length}</div>` : ''}
      </div>

      <div class="card-info">
        <div class="card-meta">
          <span class="tag tag-bairro">📍 ${escapeHtml(r.bairro)}</span>
          <span class="tag tag-categoria">${CATEGORIA_EMOJI[r.categoria]||"🍽️"} ${escapeHtml(r.categoria)}</span>
        </div>

        <div class="card-title-row">
          <h3 class="card-title">${escapeHtml(r.name)}</h3>
          <div class="card-title-right">
            ${r.price ? `<span class="title-price">${r.price}</span>` : ''}
            ${titleLogoHTML(r)}
          </div>
        </div>

        <div class="card-actions">
          ${igUrl ? `<a href="${escapeAttr(igUrl)}" target="_blank" rel="noopener" class="action-btn btn-instagram">📷 Instagram</a>` : '<button class="action-btn" disabled style="opacity:0.4">📷 Sem Instagram</button>'}
          ${r.reels ? `<a href="${escapeAttr(r.reels)}" target="_blank" rel="noopener" class="action-btn btn-reels">🎬 Reels</a>` : '<button class="action-btn" disabled style="opacity:0.4">🎬 Sem Reels</button>'}
        </div>

        <div class="card-actions" style="margin-top: 0;">
          <a href="${mapsRouteUrl}" target="_blank" rel="noopener" class="action-btn btn-route">🚗 Rota</a>
          <a href="${mapsSearchUrl}" target="_blank" rel="noopener" class="action-btn btn-maps">📍 No Mapa</a>
        </div>

        <div class="card-bottom-row">
          <button onclick="toggleStatus('${r.id}')" class="btn-status-toggle ${r.status === 'ja-fui' ? 'visited' : ''}" style="flex: 1;">
            ${r.status === 'ja-fui' ? '⭐ Refazer avaliação' : '✅ Já fui!'}
          </button>
          <button class="icon-action" onclick="openEditModal('${r.id}')" title="Editar">✏️</button>
          <button class="icon-action danger" onclick="confirmDelete('${r.id}')" title="Excluir">🗑️</button>
        </div>

        ${ratingHtml}
      </div>
    </div>`;
}

// Clicar em qualquer parte do card abre o detalhe — exceto em botões/links.
function cardClick(event, id) {
  if (event.target.closest("a, button")) return;
  openDetailModal(id);
}

// ===== MAPA (Leaflet + OpenStreetMap) =====
let _map = null;
let _markers = {};          // id -> marker
let _markerLayer = null;

function setView(view) {
  currentView = view;
  document.getElementById("list-view").style.display = view === "list" ? "" : "none";
  document.getElementById("map-view").style.display = view === "map" ? "" : "none";
  document.querySelectorAll(".view-toggle button").forEach(b =>
    b.classList.toggle("active", b.dataset.view === view));
  if (view === "map") {
    if (!initMap()) return;
    // O mapa estava escondido; precisa recalcular o tamanho.
    setTimeout(() => { _map.invalidateSize(); render(); }, DELAY_MAP_RENDER);
  }
}

function initMap() {
  if (typeof L === "undefined") {
    toast("Mapa ainda carregando… tente de novo em 1s.", "info");
    return false;
  }
  if (_map) return true;
  _map = L.map("map", { zoomControl: true, attributionControl: true })
    .setView([-30.0346, -51.2177], 12); // Porto Alegre
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(_map);
  _markerLayer = L.layerGroup().addTo(_map);
  return true;
}

function makeMarkerIcon(r, highlight) {
  const visited = r.status === "ja-fui";
  const emoji = CATEGORIA_EMOJI[r.categoria] || "🍽️";
  return L.divIcon({
    className: "map-pin-wrap",
    html: `<div class="map-pin ${visited ? "visited" : "todo"} ${highlight ? "hl" : ""}">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
}

function renderMapMarkers(list) {
  if (!_map || !_markerLayer) return;
  _markerLayer.clearLayers();
  _markers = {};
  const withCoords = list.filter(r => r.lat && r.lon);

  withCoords.forEach(r => {
    const m = L.marker([r.lat, r.lon], { icon: makeMarkerIcon(r, false) });
    m.bindPopup(`
      <div class="map-popup">
        <div class="map-popup-img" style="background-image:${coverBg(r)}"></div>
        <div class="map-popup-name">${escapeHtml(r.name)}</div>
        <div class="map-popup-meta">${CATEGORIA_EMOJI[r.categoria]||"🍽️"} ${escapeHtml(r.categoria)} · 📍 ${escapeHtml(r.bairro)}${r.rating ? ` · ★ ${r.rating.average}` : ""}</div>
        <button class="map-popup-btn" onclick="closeMapPopupAndOpen('${r.id}')">Ver detalhes</button>
      </div>`, { closeButton: true });
    m.on("mouseover", () => highlightMapItem(r.id, true));
    m.on("mouseout", () => highlightMapItem(r.id, false));
    m.addTo(_markerLayer);
    _markers[r.id] = m;
  });

  // Lista lateral (sincroniza com o mapa)
  renderMapList(withCoords);

  // Enquadra todos os pins
  if (withCoords.length) {
    const bounds = L.latLngBounds(withCoords.map(r => [r.lat, r.lon]));
    _map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
  }
}

function renderMapList(list) {
  const box = document.getElementById("map-list");
  if (!box) return;
  if (!list.length) {
    box.innerHTML = `<div class="map-list-empty">Nenhum lugar com localização ainda.<br><small>Use a busca inteligente pra trazer as coordenadas do Google.</small></div>`;
    return;
  }
  box.innerHTML = list.map(r => {
    return `<div class="map-list-item" data-id="${r.id}"
        onmouseenter="focusMarker('${r.id}', true)" onmouseleave="focusMarker('${r.id}', false)"
        onclick="openDetailModal('${r.id}')">
      <div class="mli-img" style="background-image:${coverBg(r)}; background-size:cover; background-position:center"></div>
      <div class="mli-info">
        <div class="mli-name">${escapeHtml(r.name)}</div>
        <div class="mli-meta">${CATEGORIA_EMOJI[r.categoria]||"🍽️"} ${escapeHtml(r.categoria)} · 📍 ${escapeHtml(r.bairro)}</div>
        <div class="mli-bottom">${r.rating ? `★ ${r.rating.average}` : '<span class="mli-todo">📌 Conhecer</span>'} · ${r.price || "$$"}</div>
      </div>
    </div>`;
  }).join("");
}

// Hover no card lateral -> destaca o pin no mapa
function focusMarker(id, on) {
  const r = restaurants.find(x => x.id === id);
  const m = _markers[id];
  if (!r || !m) return;
  m.setIcon(makeMarkerIcon(r, on));
  if (on) {
    m.setZIndexOffset(1000);
    if (_map) _map.panTo(m.getLatLng(), { animate: true, duration: 0.4 });
  } else {
    m.setZIndexOffset(0);
  }
}

// Hover no pin -> destaca o card lateral
function highlightMapItem(id, on) {
  const item = document.querySelector(`.map-list-item[data-id="${id}"]`);
  if (!item) return;
  item.classList.toggle("hl", on);
  if (on) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeMapPopupAndOpen(id) {
  if (_map) _map.closePopup();
  openDetailModal(id);
}

// ===== SIDEBAR (drawer no mobile) =====
function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  const bd = document.getElementById("sidebar-backdrop");
  const open = sb.classList.toggle("open");
  bd.classList.toggle("show", open);
}
function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-backdrop").classList.remove("show");
}
function closeSidebarOnMobile() {
  if (window.innerWidth < 980) closeSidebar();
}

// ===== FILTROS =====
function filterStatus(status, btnElement) {
  currentFilter = status;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btnElement.classList.add("active");
  render();
  closeSidebarOnMobile();
}

function onSearchInput(value) {
  currentSearch = value.trim();
  document.getElementById("search-clear").style.display = currentSearch ? "block" : "none";
  render();
}
function clearSearch() {
  document.getElementById("search-input").value = "";
  currentSearch = "";
  document.getElementById("search-clear").style.display = "none";
  render();
}

// ===== STATS =====
function updateStats() {
  const total = restaurants.length;
  const todo = restaurants.filter(r => r.status === "para-conhecer").length;
  const visited = restaurants.filter(r => r.status === "ja-fui").length;
  const rated = restaurants.filter(r => r.rating);
  const avg = rated.length ? (rated.reduce((s,r) => s + r.rating.average, 0) / rated.length).toFixed(1) : "—";

  document.getElementById("stat-total").innerText = total;
  document.getElementById("stat-todo").innerText = todo;
  document.getElementById("stat-visited").innerText = visited;
  document.getElementById("stat-avg").innerText = avg;
}

// Conta de 0 até o valor (efeito suave), usado só no carregamento da página.
function animateCount(el, target, decimals = 0, duration = 900) {
  if (!el) return;
  const isNum = typeof target === "number" && isFinite(target);
  if (!isNum) { el.innerText = target; return; }
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.innerText = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
    else el.innerText = target.toFixed(decimals);
  }
  requestAnimationFrame(tick);
}

function animateStats() {
  const total = restaurants.length;
  const todo = restaurants.filter(r => r.status === "para-conhecer").length;
  const visited = restaurants.filter(r => r.status === "ja-fui").length;
  const rated = restaurants.filter(r => r.rating);
  const avg = rated.length ? (rated.reduce((s, r) => s + r.rating.average, 0) / rated.length) : null;
  animateCount(document.getElementById("stat-total"), total);
  animateCount(document.getElementById("stat-todo"), todo);
  animateCount(document.getElementById("stat-visited"), visited);
  animateCount(document.getElementById("stat-avg"), avg === null ? "—" : avg, 1);
}

// ===== TOGGLE STATUS =====
function toggleStatus(id) {
  const rest = restaurants.find(r => r.id === id);
  if (!rest) return;

  if (rest.status === "para-conhecer") {
    openDetailModal(id, true);
  } else {
    showConfirm({
      title: `"${rest.name}"`,
      message: "Quer voltar para 'Para Conhecer' ou refazer a nota?",
      okLabel: "Voltar p/ Conhecer",
      cancelLabel: "Refazer Nota",
      onOk: () => {
        rest.status = "para-conhecer";
        rest.rating = null;
        saveToStorage(); render();
        toast("Movido para 'Para Conhecer'", "info");
      },
      onCancel: () => openDetailModal(id, true)
    });
  }
}

// ===== FAVORITO =====
function toggleFavorite(id) {
  const rest = restaurants.find(r => r.id === id);
  if (!rest) return;
  rest.favorite = !rest.favorite;
  saveToStorage();
  render();
  if (rest.favorite) {
    requestAnimationFrame(() => {
      const btn = document.querySelector(`.card-fav[data-id="${id}"]`);
      if (btn) { btn.classList.add("pulse"); btn.addEventListener("animationend", () => btn.classList.remove("pulse"), { once: true }); }
    });
  }
  toast(rest.favorite ? "❤️ Adicionado aos favoritos" : "Removido dos favoritos", rest.favorite ? "success" : "info");
}

// ===== MODAL ADICIONAR =====
function openAddModal() {
  document.getElementById("modal-add-title").innerText = "Adicionar Lugar";
  document.getElementById("form-restaurant").reset();
  document.getElementById("edit-id").value = "";
  document.getElementById("input-photo").value = "";
  document.getElementById("input-photo").style.display = "none";
  setHiddenCoords("", "");
  setPricePicker("$$");
  updatePhotoPreview("");
  updateMapPreview("");
  _smartExtra = null;
  document.getElementById("smart-query").value = "";
  document.getElementById("smart-results").innerHTML = "";
  document.getElementById("smart-confirm").innerHTML = "";
  renderGoogleStatus();
  dismissDupAlert();
  document.getElementById("modal-add").classList.add("active");
}
function closeAddModal() { document.getElementById("modal-add").classList.remove("active"); }

// ===== AVISO DE LUGAR JÁ CADASTRADO =====
// Nomes "parecidos": iguais, ou um contém o outro (ex: "Fornellone" x "Fornellone Petrópolis").
function namesSimilar(a, b) {
  a = normalize(a).trim();
  b = normalize(b).trim();
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.length >= 4 && b.length >= 4 && (a.includes(b) || b.includes(a))) return true;
  return false;
}
// Alerta vermelho fixo (perto do campo), some só ao clicar.
function showDupAlert(name) {
  const el = document.getElementById("dup-alert");
  if (!el) return;
  el.innerHTML = `⚠️ <strong>${escapeHtml(name)}</strong> já está cadastrado na sua lista! <span class="dup-alert-x">✕ fechar</span>`;
  el.style.display = "";
}
function dismissDupAlert() {
  const el = document.getElementById("dup-alert");
  if (el) { el.style.display = "none"; el.innerHTML = ""; }
}
// Acha um lugar já existente com nome parecido OU mesmo @ do Instagram.
function findDuplicatePlace(name, instagram, excludeId) {
  const ig = (instagram || "").replace(/^@/, "").toLowerCase();
  const hasName = normalize(name).trim().length > 0;
  if (!hasName && !ig) return null;
  return restaurants.find(r => {
    if (excludeId && r.id === excludeId) return false;
    if (hasName && namesSimilar(name, r.name)) return true;
    if (ig && r.instagram && r.instagram.toLowerCase() === ig) return true;
    return false;
  }) || null;
}

function openEditModal(id) {
  const r = restaurants.find(x => x.id === id);
  if (!r) return;
  document.getElementById("modal-add-title").innerText = "Editar Lugar";
  document.getElementById("edit-id").value = r.id;
  document.getElementById("input-name").value = r.name;
  document.getElementById("input-bairro").value = r.bairro;
  document.getElementById("input-categoria").value = r.categoria;
  document.getElementById("input-instagram").value = r.instagram ? `@${r.instagram}` : "";
  document.getElementById("input-reels").value = r.reels || "";
  document.getElementById("input-photo").value = r.photo || "";
  document.getElementById("input-notes").value = r.notes || "";
  setPricePicker(r.price || "$$");
  updatePhotoPreview(r.photo || "");
  if (r.lat && r.lon) {
    setHiddenCoords(r.lat, r.lon);
    updateMapPreview(r.name, r.lat, r.lon);
  } else {
    setHiddenCoords("", "");
    updateMapPreview(r.name);
  }
  document.getElementById("modal-add").classList.add("active");
}

// ===== AUTOCOMPLETE (CATÁLOGO POA) =====
function normalize(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

let _nominatimTimer = null;
let _nominatimToken = 0;

function onNameInput(value) {
  const list = document.getElementById("autocomplete-list");
  const q = normalize(value).trim();
  updateMapPreview(value);
  if (q.length < 2) { closeAutocomplete(); return; }

  const matches = POA_CATALOG
    .filter(c => normalize(c.name).includes(q) || normalize(c.bairro).includes(q))
    .slice(0, 4);

  // Dispara busca remota (Nominatim/OpenStreetMap), com debounce
  clearTimeout(_nominatimTimer);
  const token = ++_nominatimToken;
  _nominatimTimer = setTimeout(() => fetchNominatim(value, token), 450);

  list._currentMatches = matches;
  list._nominatim = [];
  renderAutocomplete(value, true);
}

function renderAutocomplete(value, loading) {
  const list = document.getElementById("autocomplete-list");
  const matches = list._currentMatches || [];
  const nominatim = list._nominatim || [];
  const guess = guessInstagramHandle(value);

  const catalogHtml = matches.map((m, i) => `
    <div class="autocomplete-item" onmousedown="event.preventDefault()" onclick="selectCatalog(${i})">
      <div class="autocomplete-name">${CATEGORIA_EMOJI[m.categoria]||"🍽️"} ${escapeHtml(m.name)} <small style="color:var(--text-muted); font-weight:500;">· catálogo</small></div>
      <div class="autocomplete-meta">
        <span>📍 ${escapeHtml(m.bairro)}</span>
        <span>·</span>
        <span>${escapeHtml(m.categoria)}</span>
        <span>·</span>
        <span><strong>${m.price}</strong></span>
        ${m.instagram ? `<span>· @${escapeHtml(m.instagram)}</span>` : ''}
      </div>
    </div>
  `).join("");

  const nomiHtml = nominatim.map((n, i) => `
    <div class="autocomplete-item" onmousedown="event.preventDefault()" onclick="selectNominatim(${i})">
      <div class="autocomplete-name">🗺️ ${escapeHtml(n.name)} <small style="color:var(--text-muted); font-weight:500;">· mapa</small></div>
      <div class="autocomplete-meta">
        <span>📍 ${escapeHtml(n.bairro || n.address)}</span>
        ${n.categoria ? `<span>·</span><span>${escapeHtml(n.categoria)}</span>` : ''}
      </div>
    </div>
  `).join("");

  const loadingHtml = loading ? `<div class="autocomplete-empty">🔎 Buscando no mapa...</div>` : "";

  const noResults = !matches.length && !nominatim.length && !loading;
  const fallbackHtml = noResults ? `
    <div class="autocomplete-empty" style="border-bottom:1px solid var(--border)">
      Nada encontrado. Você pode preencher manualmente:
    </div>` : '';

  const helperHtml = `
    <div class="autocomplete-item" onmousedown="event.preventDefault()" onclick="useGuessedInstagram('${escapeAttr(guess)}')">
      <div class="autocomplete-name">✨ Tentar perfil @${escapeHtml(guess)}</div>
      <div class="autocomplete-meta"><span>Auto-preencher Instagram com este handle</span></div>
    </div>
    <div class="autocomplete-item" onmousedown="event.preventDefault()" onclick="searchInstagram()">
      <div class="autocomplete-name">🔍 Buscar "${escapeHtml(value)}" no Instagram</div>
      <div class="autocomplete-meta"><span>Abre a busca em nova aba</span></div>
    </div>`;

  list.innerHTML = catalogHtml + nomiHtml + loadingHtml + fallbackHtml + helperHtml;
  list.classList.add("show");
}

// ===== NOMINATIM (OpenStreetMap) =====
async function fetchNominatim(query, token) {
  if (!query || query.trim().length < 3) return;
  // POA bounding box: lon esquerda, lat topo, lon direita, lat baixo
  // POA aprox: -51.30,-29.95,-51.05,-30.30
  const url = `https://nominatim.openstreetmap.org/search?` +
    `q=${encodeURIComponent(query + " porto alegre")}` +
    `&format=json&limit=5&addressdetails=1&extratags=1` +
    `&viewbox=-51.30,-29.95,-51.05,-30.30&bounded=1`;

  try {
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    if (token !== _nominatimToken) return; // resposta obsoleta
    const data = await res.json();
    const list = document.getElementById("autocomplete-list");
    list._nominatim = data
      .filter(d => d.type !== "city" && d.type !== "administrative")
      .map(d => parseNominatim(d));
    renderAutocomplete(query, false);
  } catch (e) {
    if (token !== _nominatimToken) return;
    renderAutocomplete(query, false);
  }
}

function parseNominatim(d) {
  const a = d.address || {};
  const tags = d.extratags || {};
  // Extrai nome principal (display_name é longo)
  const name = (d.namedetails?.name) || d.display_name.split(",")[0].trim();
  const bairro = a.suburb || a.neighbourhood || a.quarter || a.city_district || a.residential || "Outro";
  const cuisine = tags.cuisine || tags.amenity || d.type || "";
  return {
    name,
    bairro: normalizeBairro(bairro),
    categoria: cuisineToCategoria(cuisine),
    address: d.display_name,
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
    website: tags.website || tags["contact:website"] || "",
    phone: tags.phone || tags["contact:phone"] || ""
  };
}

function normalizeBairro(b) {
  // Mapeia bairros para os do select; se não bater, retorna "Outro"
  if (!b) return "Outro";
  const known = [
    "Bom Fim", "Cidade Baixa", "Moinhos de Vento", "Auxiliadora", "Menino Deus",
    "Rio Branco", "Centro Histórico", "Três Figueiras", "Petrópolis", "Floresta",
    "Higienópolis", "Bela Vista", "Independência", "Montserrat", "Boa Vista",
    "Passo d'Areia", "Praia de Belas", "Santana", "Jardim Botânico", "Chácara das Pedras",
    "Cavalhada", "Ipanema", "Teresópolis", "Glória", "Partenon",
    "Cristal", "Medianeira", "Nonoai", "Tristeza", "Vila Assunção", "Navegantes",
    "São Geraldo", "Azenha", "Farroupilha", "Jardim do Salso", "Jardim Itu-Sabará",
    "Jardim Lindóia", "Vila Ipiranga", "Cristo Redentor", "São João", "Sarandi",
    "Rubem Berta", "Zona Sul"
  ];
  const n = normalize(b);
  for (const k of known) {
    if (normalize(k) === n || n.includes(normalize(k))) return k;
  }
  return "Outro";
}

function cuisineToCategoria(cuisine) {
  const c = (cuisine || "").toLowerCase();
  if (c.includes("burger") || c.includes("lanche")) return "Hambúrguer";
  if (c.includes("pizza")) return "Pizza";
  if (c.includes("italian") || c.includes("pasta") || c.includes("cantina") ||
      c.includes("trattoria") || c.includes("osteria")) return "Italiano";
  if (c.includes("japan") || c.includes("sushi")) return "Japonês";
  // Carnes antes de Pub: "barbecue" contém "bar".
  if (c.includes("steak") || c.includes("churrasc") || c.includes("meat") ||
      c.includes("barbecue") || c.includes("grill")) return "Carnes";
  if (c.includes("dessert") || c.includes("cake") || c.includes("ice_cream") ||
      c.includes("bakery") || c.includes("padaria") || c.includes("confei") ||
      c.includes("sorvet") || c.includes("sweet")) return "Doceria";
  if (c.includes("cafe") || c.includes("coffee")) return "Café";
  if (c.includes("pub") || c.includes("bar") || c.includes("beer") ||
      c.includes("wine") || c.includes("brewery")) return "Pub";
  if (c.includes("brazil")) return "Brasileiro";
  if (c.includes("veg")) return "Vegetariano";
  return "Outro";
}

function selectNominatim(idx) {
  const list = document.getElementById("autocomplete-list");
  const n = list._nominatim?.[idx];
  if (!n) return;
  document.getElementById("input-name").value = n.name;
  document.getElementById("input-bairro").value =
    [...document.getElementById("input-bairro").options].some(o => o.value === n.bairro) ? n.bairro : "Outro";
  document.getElementById("input-categoria").value = n.categoria;
  // Salva coordenadas em campo escondido (criamos se não existe)
  setHiddenCoords(n.lat, n.lon);
  // Não inventamos o @ do Instagram (gerava handle errado). Deixa o usuário preencher.
  document.getElementById("input-reels").value = "";
  updateMapPreview(n.name, n.lat, n.lon);
  closeAutocomplete();
  toast(`"${n.name}" carregado do mapa! Adicione o Instagram se quiser.`, "success");
}

function setHiddenCoords(lat, lon) {
  let el = document.getElementById("input-coords");
  if (!el) {
    el = document.createElement("input");
    el.type = "hidden"; el.id = "input-coords";
    document.getElementById("form-restaurant").appendChild(el);
  }
  el.value = (lat && lon) ? `${lat},${lon}` : "";
}

function getHiddenCoords() {
  return document.getElementById("input-coords")?.value || "";
}

function selectCatalog(idx) {
  const list = document.getElementById("autocomplete-list");
  const m = list._currentMatches?.[idx];
  if (!m) return;

  document.getElementById("input-name").value = m.name;
  document.getElementById("input-bairro").value = m.bairro;
  document.getElementById("input-categoria").value = m.categoria;
  setPricePicker(m.price);
  if (m.instagram) {
    document.getElementById("input-reels").value = `https://www.instagram.com/${m.instagram}/`;
  }

  // Se não tem foto definida, deixamos a padrão da categoria
  closeAutocomplete();
  toast(`"${m.name}" carregado! Confira os dados e salve.`, "success");
}

function closeAutocomplete() {
  const list = document.getElementById("autocomplete-list");
  if (list) { list.classList.remove("show"); list.innerHTML = ""; }
}

let _mapTimer = null;
function updateMapPreview(name, lat, lon) {
  const wrap = document.getElementById("map-preview-wrapper");
  const iframe = document.getElementById("map-preview");
  if (!wrap || !iframe) return;

  if (!name || name.trim().length < 2) {
    wrap.style.display = "none";
    iframe.src = "";
    return;
  }
  wrap.style.display = "block";

  clearTimeout(_mapTimer);
  _mapTimer = setTimeout(() => {
    let src;
    if (lat && lon) {
      src = `https://maps.google.com/maps?q=${lat},${lon}&z=17&output=embed`;
    } else {
      const q = encodeURIComponent(`${name} Porto Alegre`);
      src = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
    }
    if (iframe.src !== src) iframe.src = src;
  }, 600);
}

function guessInstagramHandle(name) {
  // Gera um handle provável: remove acentos, espaços, símbolos
  return normalize(name).replace(/[^a-z0-9._]/g, "").slice(0, 30) || "porto.alegre";
}

function useGuessedInstagram(handle) {
  if (!handle) return;
  document.getElementById("input-reels").value = `https://www.instagram.com/${handle}/`;
  closeAutocomplete();
  toast(`Link preenchido com @${handle}. Confira se está correto!`, "info");
}

// ===== PREENCHIMENTO INTELIGENTE =====
// Dados extras descobertos na busca, mesclados ao salvar.
let _smartExtra = null;

/**
 * PlaceEnrichmentService — descobre e enriquece os dados de um lugar.
 * Hoje a fonte é o OpenStreetMap/Nominatim (grátis, sem chave).
 * Os métodos fetchGoogleData/fetchPlacePhotos são "ganchos" prontos pra
 * quando uma chave do Google Places + proxy forem conectados — aí fotos,
 * horários, faixa de preço e avaliação passam a vir preenchidos.
 */
const PlaceEnrichmentService = {
  // Interpreta o que o usuário colou: @handle, URL de perfil, URL de reel ou nome livre.
  parseInput(raw) {
    const s = (raw || "").trim();
    if (!s) return { handle: "", query: "", isReel: false };
    // Reel/post não expõe o perfil — não dá pra descobrir o estabelecimento.
    if (/instagram\.com\/(reel|reels|p|tv)\//i.test(s)) {
      return { handle: "", query: "", isReel: true };
    }
    let handle = "";
    const urlMatch = s.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
    if (urlMatch) handle = urlMatch[1];
    else if (s.startsWith("@")) handle = s.slice(1).replace(/[^A-Za-z0-9._]/g, "");
    // Se veio handle, deriva uma query "humana" trocando . e _ por espaço.
    const query = handle ? handle.replace(/[._]+/g, " ").trim() : s;
    return { handle, query, isReel: false };
  },

  // Busca candidatos: tenta Google (se conectado) e cai pro OSM. Enriquece localmente.
  async search(query, handle) {
    let candidates = [];
    this._lastError = "";
    if (getGoogleKey()) {
      try {
        candidates = await this.fetchGoogleData(query);
      } catch (e) {
        this._lastError = (e && e.message) ? e.message : String(e);
        console.error("Google Places falhou:", e);
      }
    }
    if (!candidates.length) {
      candidates = await this.searchByName(query);
    }
    candidates.forEach(c => {
      if (handle && !c.instagram) c.instagram = handle;
      this.enrichLocal(c);
    });
    return candidates;
  },

  async searchByInstagram(handleOrUrl) {
    const { handle, query, isReel } = this.parseInput(handleOrUrl);
    if (isReel) return [];
    return this.search(query || handle, handle);
  },

  async searchByName(name) {
    if (!name || name.trim().length < 2) return [];
    const url = `https://nominatim.openstreetmap.org/search?` +
      `q=${encodeURIComponent(name + " porto alegre")}` +
      `&format=json&limit=6&addressdetails=1&extratags=1&namedetails=1` +
      `&viewbox=-51.30,-29.95,-51.05,-30.30&bounded=1`;
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    const data = await res.json();
    return data
      .filter(d => d.type !== "city" && d.type !== "administrative" && d.class !== "boundary")
      .map(d => this.normalizeCandidate(d));
  },

  normalizeCandidate(d) {
    const a = d.address || {}, tags = d.extratags || {}, nd = d.namedetails || {};
    const name = nd.name || d.display_name.split(",")[0].trim();
    const bairroRaw = a.suburb || a.neighbourhood || a.quarter || a.city_district || a.residential || "";
    const cuisine = tags.cuisine || tags.amenity || d.type || "";
    return {
      name,
      bairro: normalizeBairro(bairroRaw),
      categoria: this.detectCategory(cuisine, name),
      subcategoria: (tags.cuisine || "").split(";")[0] || "",
      address: d.display_name,
      lat: parseFloat(d.lat),
      lon: parseFloat(d.lon),
      website: tags.website || tags["contact:website"] || "",
      phone: tags.phone || tags["contact:phone"] || tags["contact:mobile"] || "",
      instagram: this.extractIg(tags),
      hours: this.formatHours(tags.opening_hours || ""),
      price: ""
    };
  },

  extractIg(tags) {
    const ig = tags["contact:instagram"] || tags["instagram"] || "";
    if (!ig) return "";
    const m = ig.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
    return m ? m[1] : ig.replace(/^@/, "");
  },

  detectCategory(cuisine, name) {
    return cuisineToCategoria(`${cuisine || ""} ${name || ""}`);
  },

  // Estimativa de faixa de preço por categoria (heurística até ter Google/iFood).
  estimatePriceRange(c) {
    const map = {
      "Café": "$", "Doceria": "$",
      "Hambúrguer": "$$", "Pizza": "$$", "Pub": "$$", "Brasileiro": "$$", "Vegetariano": "$$",
      "Italiano": "$$$", "Japonês": "$$$", "Carnes": "$$$"
    };
    return map[c.categoria] || "$$";
  },

  enrichLocal(c) {
    if (!c.price) c.price = this.estimatePriceRange(c);
  },

  formatHours(oh) {
    if (!oh) return "";
    return oh.replace(/;\s*/g, " · ").trim();
  },

  // ===== Google Places (New) — roda no navegador, chave travada por domínio =====
  async fetchGoogleData(query) {
    if (!query || query.trim().length < 2) return [];
    await loadGoogleMaps();
    const { Place } = await google.maps.importLibrary("places");
    const { places } = await Place.searchByText({
      textQuery: `${query} Porto Alegre`,
      fields: [
        "displayName", "formattedAddress", "location", "rating", "userRatingCount",
        "priceLevel", "photos", "nationalPhoneNumber", "websiteURI",
        "regularOpeningHours", "types", "primaryType", "primaryTypeDisplayName",
        "addressComponents"
      ],
      locationBias: { center: { lat: -30.0346, lng: -51.2177 }, radius: 25000 },
      maxResultCount: 6,
      language: "pt-BR",
      region: "br"
    });
    return (places || []).map(p => this.googleToCandidate(p));
  },

  googleToCandidate(p) {
    const comps = p.addressComponents || [];
    const comp = (type) => {
      const c = comps.find(x => (x.types || []).includes(type));
      return c ? c.longText : "";
    };
    const bairroRaw = comp("sublocality_level_1") || comp("sublocality") || comp("neighborhood") || "";
    const types = p.types || [];
    const primaryType = p.primaryType || "";
    const PL = (google.maps.places && google.maps.places.PriceLevel) || {};
    const priceMap = new Map([
      [PL.FREE, "$"], [PL.INEXPENSIVE, "$"], [PL.MODERATE, "$$"],
      [PL.EXPENSIVE, "$$$"], [PL.VERY_EXPENSIVE, "$$$$"]
    ]);
    // O Google às vezes coloca o Instagram no campo "site".
    const site = p.websiteURI || "";
    const igFromSite = site.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
    const primaryDisplay = (p.primaryTypeDisplayName && p.primaryTypeDisplayName.text)
      ? p.primaryTypeDisplayName.text
      : (typeof p.primaryTypeDisplayName === "string" ? p.primaryTypeDisplayName : "");
    return {
      name: p.displayName || "",
      bairro: (bairroRaw || "").trim(),
      categoria: this.detectCategory(`${primaryType} ${types.join(" ")}`, p.displayName || ""),
      subcategoria: primaryDisplay || this.prettyType([primaryType, ...types]),
      address: p.formattedAddress || "",
      lat: p.location ? p.location.lat() : null,
      lon: p.location ? p.location.lng() : null,
      website: igFromSite ? "" : site,
      phone: p.nationalPhoneNumber || "",
      instagram: igFromSite ? igFromSite[1] : "",
      hours: (p.regularOpeningHours?.weekdayDescriptions || []).join(" · "),
      price: priceMap.get(p.priceLevel) || "",
      photo: (p.photos && p.photos[0]) ? p.photos[0].getURI({ maxWidth: 900 }) : "",
      photos: (p.photos || []).slice(0, 8).map(ph => ph.getURI({ maxWidth: 900 })),
      rating: p.rating || null,
      reviewCount: p.userRatingCount || null
    };
  },

  prettyType(types) {
    const t = (types || []).find(x => /restaurant|bar|cafe|coffee|bakery|pub|food|store/.test(x)) || (types || [])[0] || "";
    return t.replace(/_/g, " ").replace(/\b\w/g, m => m.toUpperCase());
  }
};

// ===== Carregamento da API do Google (lazy, só quando há chave) =====
// Chave do Google Maps/Places embutida (restrita por domínio: localhost + rolepoa.netlify.app).
// Assim funciona automaticamente em qualquer aparelho, sem precisar "conectar" manualmente.
const DEFAULT_GOOGLE_KEY = "AIzaSyCVH7932duKQQ4qkRxxaq-2ICZPralu79s";
function getGoogleKey() { return localStorage.getItem("role_poa_gmaps_key") || DEFAULT_GOOGLE_KEY; }
function setGoogleKey(k) {
  k = (k || "").trim();
  if (k) localStorage.setItem("role_poa_gmaps_key", k);
  else localStorage.removeItem("role_poa_gmaps_key");
  _gmapsLoader = null;
  renderGoogleStatus();
}
let _gmapsLoader = null;
function loadGoogleMaps() {
  const key = getGoogleKey();
  if (!key) return Promise.reject(new Error("Sem chave do Google"));
  if (window.google?.maps?.importLibrary) return Promise.resolve();
  if (_gmapsLoader) return _gmapsLoader;
  _gmapsLoader = new Promise((resolve) => {
    // Loader oficial inline do Google Maps JS API
    ((g) => {
      let h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary",
        q = "__ib__", m = document, b = window;
      b = b[c] || (b[c] = {});
      const d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(),
        u = () => h || (h = new Promise(async (f, n) => {
          await (a = m.createElement("script"));
          e.set("libraries", [...r] + "");
          for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
          e.set("callback", c + ".maps." + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => h = n(Error(p + " could not load."));
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a);
        }));
      d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
    })({ key, v: "weekly" });
    resolve();
  });
  return _gmapsLoader;
}

function renderGoogleStatus() {
  const el = document.getElementById("google-status");
  if (!el) return;
  if (getGoogleKey()) {
    el.innerHTML = `<span class="g-on">✓ Google Places conectado</span> · <a href="#" onclick="promptGoogleKey();return false;">trocar chave</a>`;
  } else {
    el.innerHTML = `<button type="button" class="g-connect" onclick="promptGoogleKey()">⚙️ Conectar Google Places — traz foto, nota e preço</button>`;
  }
}
function promptGoogleKey() {
  const k = window.prompt("Cole sua chave da API do Google Maps (Places API New + Maps JavaScript API ativadas).\n\nDeixe em branco e confirme para remover.", getGoogleKey());
  if (k === null) return;
  setGoogleKey(k);
  toast(k.trim() ? "Google conectado! 🎉 Faça uma busca." : "Chave removida.", k.trim() ? "success" : "info");
}

async function runSmartSearch() {
  const raw = document.getElementById("smart-query").value.trim();
  const resultsEl = document.getElementById("smart-results");
  const confirmEl = document.getElementById("smart-confirm");
  if (!raw) { toast("Cole o @ do Instagram ou o nome", "error"); return; }
  dismissDupAlert();
  confirmEl.innerHTML = "";
  resultsEl.innerHTML = `<div class="smart-loading">🔎 Buscando informações…</div>`;

  try {
    const { handle, query, isReel } = PlaceEnrichmentService.parseInput(raw);
    if (isReel) {
      resultsEl.innerHTML = `<div class="smart-msg">⚠️ Esse link é de um <b>Reel/post</b>, não do perfil. Cole o <b>@ do perfil</b> do estabelecimento (ex: @agridocecafe) ou o nome do lugar.</div>`;
      return;
    }
    const candidates = await PlaceEnrichmentService.search(query || handle, handle);
    if (!candidates.length) {
      const gErr = PlaceEnrichmentService._lastError
        ? `<div class="smart-msg" style="color:var(--secondary)">⚠️ Erro do Google: <b>${escapeHtml(PlaceEnrichmentService._lastError)}</b></div>`
        : "";
      resultsEl.innerHTML = gErr +
        `<div class="smart-msg">Nada encontrado para "<b>${escapeHtml(query || handle)}</b>". Tente o nome completo ou preencha os campos abaixo manualmente.</div>`;
      const dupNF = findDuplicatePlace(query || handle, handle, document.getElementById("edit-id")?.value || null);
      if (dupNF) showDupAlert(dupNF.name);
      return;
    }
    if (candidates.length === 1) {
      applyCandidate(candidates[0]);
      resultsEl.innerHTML = "";
    } else {
      resultsEl._candidates = candidates;
      resultsEl.innerHTML =
        `<div class="smart-msg">Encontramos ${candidates.length} lugares. Qual é?</div>` +
        candidates.map((c, i) => renderCandidateRow(c, i)).join("");
    }
  } catch (e) {
    resultsEl.innerHTML = `<div class="smart-msg">Não consegui buscar agora. Verifique a conexão e tente de novo.</div>`;
  }
}

function renderCandidateRow(c, i) {
  const emoji = CATEGORIA_EMOJI[c.categoria] || "🍽️";
  const loc = [c.bairro && c.bairro !== "Outro" ? c.bairro : "", c.subcategoria].filter(Boolean).join(" · ");
  return `<button type="button" class="smart-candidate" onclick="pickCandidate(${i})">
    <span class="cand-emoji">${emoji}</span>
    <span class="cand-info">
      <span class="cand-name">${escapeHtml(c.name)}</span>
      <span class="cand-sub">${escapeHtml(loc || c.categoria)}</span>
    </span>
    <span class="cand-go">›</span>
  </button>`;
}

function pickCandidate(i) {
  const list = document.getElementById("smart-results")._candidates;
  const c = list && list[i];
  if (!c) return;
  applyCandidate(c);
  document.getElementById("smart-results").innerHTML = "";
}

// Preenche o formulário e mostra o card de confirmação.
function applyCandidate(c) {
  document.getElementById("input-name").value = c.name;
  setBairroValue(c.bairro);
  document.getElementById("input-categoria").value = c.categoria;
  setPricePicker(c.price || "$$");
  // Instagram (perfil): preenche se houver @ real; senão limpa. Reels fica pro usuário.
  document.getElementById("input-instagram").value = c.instagram ? `@${c.instagram}` : "";
  document.getElementById("input-reels").value = "";
  // Foto: usa a do Google se houver; senão limpa (volta pra padrão da categoria).
  _smartPhotos = (c.photos && c.photos.length) ? c.photos : (c.photo ? [c.photo] : []);
  if (c.photo) {
    document.getElementById("input-photo").value = c.photo;
    updatePhotoPreview(c.photo);
  } else {
    document.getElementById("input-photo").value = "";
    updatePhotoPreview("");
  }
  setHiddenCoords(c.lat, c.lon);
  updateMapPreview(c.name, c.lat, c.lon);

  _smartExtra = {
    website: c.website || "",
    phone: c.phone || "",
    hours: c.hours || "",
    instagram: c.instagram || "",
    address: c.address || "",
    subcategoria: c.subcategoria || "",
    rating_external: c.rating ?? null,
    review_count: c.reviewCount ?? null
  };
  renderConfirmCard(c);
  // Aviso fixo se esse lugar já está na lista — usa o nome COMPLETO + @ do Google.
  const dup = findDuplicatePlace(c.name, c.instagram, document.getElementById("edit-id")?.value || null);
  if (dup) showDupAlert(dup.name);
  else toast(`"${c.name}" preenchido! Confira e salve.`, "success");
}

// Seleciona o bairro; se não existir na lista, adiciona como nova opção.
function setBairroValue(bairro) {
  const sel = document.getElementById("input-bairro");
  const b = (bairro || "").trim();
  if (!b) { sel.value = "Outro"; return; }
  if (![...sel.options].some(o => o.value === b)) {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    const outro = sel.querySelector('option[value="Outro"]');
    sel.insertBefore(opt, outro || null);
  }
  sel.value = b;
}

function renderConfirmCard(c) {
  const emoji = CATEGORIA_EMOJI[c.categoria] || "🍽️";
  const priceTxt = c.price ? `${c.price}${c.rating ? "" : " (estimado)"}` : "";
  const ratingTxt = c.rating ? `${Number(c.rating).toFixed(1)} ⭐${c.reviewCount ? ` (${c.reviewCount} avaliações)` : ""}` : "";
  const rows = [
    ["🏢", "Nome", c.name],
    ["📍", "Endereço", c.address],
    [emoji, "Categoria", c.subcategoria ? `${c.categoria} · ${c.subcategoria}` : c.categoria],
    ["🏘️", "Bairro", c.bairro !== "Outro" ? c.bairro : ""],
    ["⭐", "Avaliação", ratingTxt],
    ["💰", "Faixa de preço", priceTxt],
    ["📱", "Instagram", c.instagram ? "@" + c.instagram : ""],
    ["📞", "Telefone", c.phone],
    ["🌐", "Site", c.website],
    ["🕒", "Horário", c.hours]
  ].filter(r => r[2]);

  const photoHtml = c.photo
    ? `<div class="confirm-photo" style="background-image:url('${escapeAttr(c.photo)}')"></div>`
    : "";
  const thumbs = (c.photos && c.photos.length > 1)
    ? `<div class="cover-pick-hint">📸 Escolha a capa — tente a da <b>fachada com o nome/logo</b>:</div>
       <div class="cover-pick">
         ${c.photos.map((u, i) => `<button type="button" class="cover-thumb ${i === 0 ? "sel" : ""}" style="background-image:url('${escapeAttr(u)}')" onclick="pickCover(${i})"></button>`).join("")}
       </div>`
    : "";
  const note = c.photo
    ? ""
    : `<div class="confirm-note">📷 Sem foto do Google — usando a padrão da categoria. Você pode trocar nos campos abaixo.</div>`;

  // Instagram não veio do Google: oferece busca rápida + campo pra colar o @.
  const igBlock = c.instagram ? "" : `
    <div class="confirm-ig" id="confirm-ig">
      <div class="confirm-note">📱 O Google não informou o Instagram. Procure e cole o @:</div>
      <div class="ig-row">
        <a class="action-btn small ig-search" href="${escapeAttr(instagramSearchUrl())}" target="_blank" rel="noopener">🔎 Procurar no Google</a>
        <input type="text" class="form-control ig-input" placeholder="@perfil" autocomplete="off"
               onchange="applyInstagramInput(this.value)"
               onkeydown="if(event.key==='Enter'){event.preventDefault();applyInstagramInput(this.value);}">
      </div>
    </div>`;

  document.getElementById("smart-confirm").innerHTML = `
    <div class="confirm-card">
      <div class="confirm-head">${emoji} Resumo encontrado</div>
      ${photoHtml}
      ${thumbs}
      ${rows.map(([ic, lbl, val]) => `
        <div class="confirm-row"><span class="cr-ic">${ic}</span>
          <span class="cr-lbl">${lbl}</span>
          <span class="cr-val">${escapeHtml(val)}</span>
        </div>`).join("")}
      ${igBlock}
      ${note}
      <button type="submit" class="btn-confirm-save">✅ Salvar Lugar</button>
    </div>`;
}

// Escolhe a foto de capa entre as do Google (clicando num thumbnail).
let _smartPhotos = [];
function pickCover(i) {
  const url = _smartPhotos[i];
  if (!url) return;
  document.getElementById("input-photo").value = url;
  updatePhotoPreview(url);
  const big = document.querySelector("#smart-confirm .confirm-photo");
  if (big) big.style.backgroundImage = `url('${url}')`;
  document.querySelectorAll("#smart-confirm .cover-thumb").forEach((t, idx) =>
    t.classList.toggle("sel", idx === i));
}

// Monta a URL de busca do Instagram no Google usando nome + bairro do formulário.
function instagramSearchUrl() {
  const name = document.getElementById("input-name").value.trim();
  const bairro = document.getElementById("input-bairro").value;
  const q = [name, bairro && bairro !== "Outro" ? bairro : "", "Porto Alegre instagram"]
    .filter(Boolean).join(" ");
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

// Aceita @perfil, perfil ou URL do Instagram → extrai o handle e preenche tudo.
function applyInstagramInput(raw) {
  const s = (raw || "").trim();
  if (!s) return;
  let handle = "";
  const m = s.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
  if (m) handle = m[1];
  else handle = s.replace(/^@/, "").replace(/[^A-Za-z0-9._]/g, "");
  if (!handle) { toast("Não entendi esse @. Cole o perfil ou o link.", "error"); return; }
  document.getElementById("input-instagram").value = `@${handle}`;
  if (_smartExtra) _smartExtra.instagram = handle;
  const block = document.getElementById("confirm-ig");
  if (block) block.innerHTML = `<div class="confirm-note" style="color:var(--success)">✓ Instagram @${escapeHtml(handle)} adicionado.</div>`;
  toast(`Instagram @${handle} adicionado!`, "success");
}

function searchInstagram() {
  const name = document.getElementById("input-name").value.trim();
  if (!name) {
    toast("Digite ou busque um nome primeiro", "error");
    return;
  }
  window.open(instagramSearchUrl(), "_blank", "noopener");
}

// ===== PRICE PICKER =====
function setupPricePicker() {
  document.querySelectorAll(".price-opt").forEach(btn => {
    btn.onclick = () => setPricePicker(btn.dataset.price);
  });
}
function setPricePicker(value) {
  document.getElementById("input-price").value = value;
  document.querySelectorAll(".price-opt").forEach(b => {
    b.classList.toggle("active", b.dataset.price === value);
  });
}

// ===== PHOTO UPLOAD =====
function onPhotoFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    toast("Imagem muito grande (máx 2MB)", "error"); return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("input-photo").value = reader.result;
    updatePhotoPreview(reader.result);
    toast("Foto carregada!", "success");
  };
  reader.readAsDataURL(file);
}
function togglePhotoUrl() {
  const input = document.getElementById("input-photo");
  input.style.display = input.style.display === "none" ? "block" : "none";
  if (input.style.display === "block") input.focus();
}
function clearPhoto() {
  document.getElementById("input-photo").value = "";
  document.getElementById("input-photo-file").value = "";
  updatePhotoPreview("");
}
function updatePhotoPreview(url) {
  const preview = document.getElementById("photo-preview");
  if (url) {
    preview.style.backgroundImage = `url('${url}')`;
    preview.innerHTML = "";
  } else {
    preview.style.backgroundImage = "";
    preview.innerHTML = "<span>📷 Sem foto</span>";
  }
}

// ===== SALVAR =====
function saveRestaurant(event) {
  event.preventDefault();
  const id = document.getElementById("edit-id").value;
  const coords = getHiddenCoords().split(",");
  const lat = coords[0] ? parseFloat(coords[0]) : null;
  const lon = coords[1] ? parseFloat(coords[1]) : null;
  const extra = _smartExtra || {};
  const reels = document.getElementById("input-reels").value.trim();
  const instagram = extractInstagramHandle(document.getElementById("input-instagram").value) || extra.instagram || "";
  const data = {
    name: document.getElementById("input-name").value.trim(),
    bairro: document.getElementById("input-bairro").value,
    categoria: document.getElementById("input-categoria").value,
    price: document.getElementById("input-price").value,
    reels,
    photo: document.getElementById("input-photo").value.trim(),
    notes: document.getElementById("input-notes").value.trim(),
    lat, lon,
    // Campos enriquecidos (OSM agora; Google no futuro)
    instagram,
    website: extra.website || "",
    phone: extra.phone || "",
    hours: extra.hours || "",
    address: extra.address || "",
    subcategoria: extra.subcategoria || "",
    rating_external: extra.rating_external ?? null,
    review_count: extra.review_count ?? null
  };

  if (id) {
    const i = restaurants.findIndex(r => r.id === id);
    if (i !== -1) {
      restaurants[i] = { ...restaurants[i], ...data };
      toast("Lugar atualizado!", "success");
    }
    saveToStorage(); populateFilters(); closeAddModal(); render();
    return;
  }

  // Novo lugar: avisa se já existe um igual (mesmo nome ou mesmo @).
  const dup = findDuplicatePlace(data.name, instagram, null);
  if (dup) {
    showConfirm({
      title: "⚠️ Lugar já cadastrado?",
      message: `Parece que "${dup.name}"${dup.bairro ? ` — ${dup.bairro}` : ''} já está na sua lista. Quer adicionar mesmo assim?`,
      okLabel: "Adicionar mesmo assim",
      onOk: () => commitNewPlace(data)
    });
    return;
  }
  commitNewPlace(data);
}

// Adiciona de fato um lugar novo à lista e atualiza tudo.
function commitNewPlace(data) {
  restaurants.push({
    id: "rest-" + Date.now(),
    ...data,
    status: "para-conhecer",
    favorite: false,
    rating: null,
    ratings: [],
    createdAt: Date.now()
  });
  toast(`"${data.name}" adicionado à sua lista!`, "success");
  saveToStorage();
  populateFilters();
  closeAddModal();
  render();
}

// ===== EXCLUIR =====
function confirmDelete(id) {
  const r = restaurants.find(x => x.id === id);
  if (!r) return;
  showConfirm({
    title: "Excluir lugar?",
    message: `Tem certeza que deseja excluir "${r.name}"? Esta ação não pode ser desfeita.`,
    okLabel: "Excluir",
    okDanger: true,
    onOk: () => {
      restaurants = restaurants.filter(x => x.id !== id);
      saveToStorage(); populateFilters(); render();
      deleteFromCloud(id);
      toast("Lugar excluído", "info");
    }
  });
}

// ===== DETAIL MODAL =====
// ===== AVALIAÇÃO POR ESTRELAS (no detalhe) =====
const RATE_CATS = [
  { key: "comida", label: "Comida", emoji: "🍔" },
  { key: "bebida", label: "Bebida", emoji: "🍹" },
  { key: "atendimento", label: "Atendimento", emoji: "🧑‍🍳" },
  { key: "ambiente", label: "Ambiente", emoji: "🪑" },
  { key: "preco", label: "Preço-benefício", emoji: "💰" },
  { key: "instagramavel", label: "Instagramável", emoji: "📸" },
  { key: "experiencia", label: "Experiência", emoji: "❤️" }
];
// Tipos de bebida (escolhido ao avaliar o critério Bebida).
const DRINK_TYPES = [
  { key: "cerveja", label: "Cerveja", emoji: "🍺" },
  { key: "drinks", label: "Drinks", emoji: "🍸" },
  { key: "vinho", label: "Vinho", emoji: "🍷" }
];

// Monta uma avaliação a partir do estado de trabalho do formulário.
function buildRating(work) {
  const present = RATE_CATS.map(c => work.vals[c.key]).filter(v => v > 0);
  const avg = present.length ? +(present.reduce((a, b) => a + b, 0) / present.length).toFixed(1) : 0;
  const out = {
    id: work.id || ("rt-" + Date.now()),
    person: (work.person || "").trim() || "Anônimo",
    average: avg,
    comments: (work.comments || "").trim(),
    date: work.date || "",
    bebidaTipo: work.bebidaTipo || ""
  };
  RATE_CATS.forEach(c => { out[c.key] = work.vals[c.key] || 0; });
  return out;
}

// Converte a avaliação antiga (única) numa avaliação da lista nova.
function legacyToRating(old, person) {
  const vals = {};
  RATE_CATS.forEach(c => { vals[c.key] = old[c.key] || 0; });
  return buildRating({ id: "rt-legacy", person, vals, comments: old.comments, date: old.date, bebidaTipo: old.bebidaTipo });
}

// Recalcula a avaliação COMBINADA (média de TODAS as avaliações) em r.rating.
// r.rating mantém o formato antigo (average + por critério) e ganha:
// .count (nº de avaliações) e .raters (lista resumida por pessoa).
function recomputeCombined(r) {
  const list = Array.isArray(r.ratings) ? r.ratings.filter(Boolean) : [];
  if (!list.length) { r.rating = null; return; }
  const combined = { count: list.length };
  RATE_CATS.forEach(c => {
    const vals = list.map(p => p[c.key]).filter(v => v > 0);
    combined[c.key] = vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : 0;
  });
  const avgs = list.map(p => p.average).filter(v => v > 0);
  combined.average = avgs.length ? +(avgs.reduce((a, b) => a + b, 0) / avgs.length).toFixed(1) : 0;
  const dates = list.map(p => p.date).filter(Boolean).sort();
  combined.date = dates[dates.length - 1] || "";
  combined.raters = list.map(p => ({ id: p.id, person: p.person, average: p.average, bebidaTipo: p.bebidaTipo }));
  r.rating = combined;
}

// Estado do formulário de avaliação aberto (ou null = fechado).
let _detailWork = null;   // { id, person, vals:{}, bebidaTipo, comments, date }
let _detailRestId = null;

// HTML da lista de avaliações já existentes.
function rateListHTML(r) {
  const list = Array.isArray(r.ratings) ? r.ratings : [];
  if (!list.length) return `<p class="rate-empty">Ainda sem avaliações. Seja o primeiro! ⭐</p>`;
  return list.map(rt => {
    const drink = DRINK_TYPES.find(d => d.key === rt.bebidaTipo);
    return `<div class="rate-card" onclick="toggleRateCard(this, event)">
      <div class="rate-card-top">
        <span class="rate-card-person">👤 ${escapeHtml(rt.person || "Anônimo")}</span>
        <span class="rate-card-avg">★ ${rt.average || "–"} <span class="rate-card-caret">▾</span></span>
      </div>
      <div class="rate-card-meta">${drink ? `${drink.emoji} ${drink.label}` : ""}${drink && rt.date ? " · " : ""}${rt.date ? formatDateBR(rt.date) : ""} · toque pra ver as notas</div>
      ${rt.comments ? `<div class="rate-card-comment">"${escapeHtml(rt.comments)}"</div>` : ""}
      <div class="rate-card-detail">${renderStarsHTML(rt, false)}</div>
      <div class="rate-card-actions">
        <button type="button" onclick="editRating('${r.id}','${rt.id}')">✏️ Editar</button>
        <button type="button" class="danger" onclick="deleteRating('${r.id}','${rt.id}')">🗑️ Excluir</button>
      </div>
    </div>`;
  }).join("");
}

// Clicar no card da avaliação expande/recolhe as notas dadas (estrelas por critério).
function toggleRateCard(el, event) {
  if (event && event.target.closest("button")) return;  // não alterna ao clicar em Editar/Excluir
  el.classList.toggle("open");
}

// Abre o formulário em branco para uma nova avaliação.
function newRating(id) {
  _detailRestId = id;
  _detailWork = { id: null, person: "", vals: {}, bebidaTipo: "", comments: "", date: new Date().toISOString().slice(0, 10) };
  renderRateForm();
}

// Carrega uma avaliação existente na cópia de trabalho (sem rolar a tela).
function loadRating(id, ratingId) {
  const r = restaurants.find(x => x.id === id);
  const src = r && Array.isArray(r.ratings) ? r.ratings.find(x => x.id === ratingId) : null;
  if (!src) return false;
  _detailRestId = id;
  const vals = {};
  RATE_CATS.forEach(c => { vals[c.key] = src[c.key] || 0; });
  _detailWork = { id: src.id, person: src.person || "", vals, bebidaTipo: src.bebidaTipo || "", comments: src.comments || "", date: src.date || new Date().toISOString().slice(0, 10) };
  return true;
}

// Edita uma avaliação existente (abre o form e rola até ele).
function editRating(id, ratingId) {
  if (!loadRating(id, ratingId)) return;
  renderRateForm();
  const el = document.getElementById("rate-form-area");
  if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), DELAY_MAP_RENDER);
}

// Estado padrão ao abrir o lugar: mostra as estrelas da ÚLTIMA pessoa (visualização);
// se ainda não houver avaliações, abre o formulário em branco direto.
function showDefaultRateForm(id) {
  _detailRestId = id;
  _detailWork = null;
  const r = restaurants.find(x => x.id === id);
  const list = r && Array.isArray(r.ratings) ? r.ratings : [];
  if (!list.length) { newRating(id); return; }
  renderRateForm();   // sem _detailWork + com avaliações = mostra preview da última
}

function cancelRating() {
  _detailWork = null;
  renderRateForm();
}

// Renderiza HTML das estrelas (ambos os modos: leitura e edição).
// Se editMode=false: mostra estrelas só-leitura da avaliação `rating`.
// Se editMode=true: renderiza campo interativo no elemento DOM (detail-rate-body).
function renderStarsHTML(rating, editMode = false) {
  if (editMode) {
    // Modo editável: gera HTML para inserir em detail-rate-body
    if (!_detailWork) return "";
    const work = _detailWork;
    return RATE_CATS.map(cat => {
      const v = work.vals[cat.key] || 0;
      const stars = [1, 2, 3, 4, 5].map(n =>
        `<button type="button" class="star ${n <= v ? "on" : ""}" onclick="setStar('${cat.key}', ${n})" onmouseover="previewStars('${cat.key}', ${n})" onmouseout="previewStars('${cat.key}', ${v})" title="${n} estrela${n > 1 ? "s" : ""}">★</button>`
      ).join("");
      let extra = "";
      if (cat.key === "bebida") {
        extra = `<div class="drink-types">${DRINK_TYPES.map(d =>
          `<button type="button" class="drink-pin ${work.bebidaTipo === d.key ? "active" : ""}" onclick="setDrinkType('${d.key}')">${d.emoji} ${d.label}</button>`
        ).join("")}</div>`;
      }
      return `<div class="rate-row" data-cat="${cat.key}">
        <span class="rate-label">${cat.emoji} ${cat.label}</span>
        <span class="rate-stars">${stars}</span>
      </div>${extra}`;
    }).join("");
  } else {
    // Modo leitura: visualização de avaliação existente
    if (!rating) return "";
    return RATE_CATS.map(cat => {
      const v = rating[cat.key] || 0;
      const stars = [1, 2, 3, 4, 5].map(n => `<span class="star ro ${n <= v ? "on" : ""}">★</span>`).join("");
      let tag = "";
      if (cat.key === "bebida" && rating.bebidaTipo) {
        const d = DRINK_TYPES.find(x => x.key === rating.bebidaTipo);
        if (d) tag = ` <span class="drink-tag">${d.emoji} ${d.label}</span>`;
      }
      return `<div class="rate-row">
        <span class="rate-label">${cat.emoji} ${cat.label}${tag}</span>
        <span class="rate-stars">${stars}</span>
      </div>`;
    }).join("");
  }
}

// Renderiza a área da tabela de estrelas: visualização da última pessoa OU formulário editável.
function renderRateForm() {
  const area = document.getElementById("rate-form-area");
  if (!area) return;
  const r = restaurants.find(x => x.id === _detailRestId);
  const list = r && Array.isArray(r.ratings) ? r.ratings : [];

  // Sem formulário aberto: mostra a tabela da ÚLTIMA pessoa + botão "Nova avaliação".
  if (!_detailWork) {
    if (!list.length) {
      area.innerHTML = `<button type="button" class="btn-confirm-save" onclick="newRating('${_detailRestId}')">➕ Nova avaliação</button>`;
      return;
    }
    const last = list[list.length - 1];
    area.innerHTML = `
      <button type="button" class="add-other-btn" onclick="newRating('${_detailRestId}')">➕ Nova avaliação</button>
      <div class="rate-preview">
        <div class="detail-rate-head"><span>⭐ Última avaliação · 👤 ${escapeHtml(last.person || "Anônimo")}</span><span class="detail-rate-avg-wrap"><strong>${last.average || "–"}</strong>★</span></div>
        ${renderStarsHTML(last, false)}
      </div>`;
    return;
  }

  // Formulário editável (nova ou editando).
  const w = _detailWork;
  const editing = !!w.id;
  const otherBtn = list.length
    ? `<button type="button" class="add-other-btn" onclick="newRating('${_detailRestId}')">➕ Nova avaliação</button>`
    : "";
  area.innerHTML = `
    ${otherBtn}
    <div class="rate-form">
      <label class="form-label">${editing ? "Editando avaliação de:" : "Quem está avaliando?"}</label>
      <input type="text" id="rate-person" class="form-control" placeholder="Nome de quem avalia (ex: Marcelo)" value="${escapeAttr(w.person || "")}" autocomplete="off">
      <div class="detail-rate-head" style="margin-top:14px;">
        <span>⭐ Notas</span>
        <span class="detail-rate-avg-wrap">Média: <strong id="detail-rate-avg">—</strong></span>
      </div>
      <div id="detail-rate-body"></div>
      <label class="form-label" style="margin-top:12px;">📅 Data da visita</label>
      <input type="date" id="detail-rate-date" class="form-control" value="${w.date}">
      <label class="form-label" style="margin-top:12px;">💬 Comentário</label>
      <textarea id="detail-comments" class="form-control" rows="2" placeholder="Ex: peça a batata frita trufada, vale muito a pena!">${escapeHtml(w.comments || "")}</textarea>
      <div class="rate-form-actions">
        ${list.length ? `<button type="button" class="btn-ghost" onclick="cancelRating()">Cancelar</button>` : ""}
        <button type="button" class="btn-confirm-save" onclick="saveDetailRating('${_detailRestId}')">✅ Salvar avaliação</button>
      </div>
    </div>`;
  renderDetailStars();
}

// Renderiza o campo interativo de estrelas no modal de detalhe (modo editável).
function renderDetailStars() {
  const body = document.getElementById("detail-rate-body");
  if (!body) return;
  body.innerHTML = renderStarsHTML(null, true);
  const avgEl = document.getElementById("detail-rate-avg");
  if (avgEl && _detailWork) {
    const vals = RATE_CATS.map(c => _detailWork.vals[c.key] || 0).filter(v => v > 0);
    avgEl.textContent = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";
  }
}

function setStar(key, n) {
  if (!_detailWork) return;
  // Tocar de novo na mesma nota zera (permite corrigir).
  _detailWork.vals[key] = (_detailWork.vals[key] === n) ? 0 : n;
  captureRateInputs();
  renderDetailStars();
}

function setDrinkType(key) {
  if (!_detailWork) return;
  _detailWork.bebidaTipo = (_detailWork.bebidaTipo === key) ? "" : key;
  captureRateInputs();
  renderDetailStars();
}

// Guarda o que foi digitado (nome/comentário/data) antes de re-renderizar as estrelas.
function captureRateInputs() {
  if (!_detailWork) return;
  const p = document.getElementById("rate-person");
  const c = document.getElementById("detail-comments");
  const d = document.getElementById("detail-rate-date");
  if (p) _detailWork.person = p.value;
  if (c) _detailWork.comments = c.value;
  if (d) _detailWork.date = d.value;
}

// Preview ao passar o mouse: acende as estrelas até a posição, sem salvar.
function previewStars(key, n) {
  const body = document.getElementById("detail-rate-body");
  if (!body) return;
  const row = body.querySelector(`[data-cat="${key}"]`);
  if (!row) return;
  row.querySelectorAll(".star").forEach((s, i) => s.classList.toggle("on", i < n));
}

function saveDetailRating(id) {
  const r = restaurants.find(x => x.id === id);
  if (!r || !_detailWork) return;
  captureRateInputs();
  const filled = RATE_CATS.filter(c => _detailWork.vals[c.key] > 0);
  if (filled.length === 0) { toast("Dê pelo menos 1 estrela", "error"); return; }
  if (!(_detailWork.person || "").trim()) { toast("Escreva quem está avaliando", "error"); return; }
  if (!_detailWork.date) _detailWork.date = new Date().toISOString().slice(0, 10);
  if (!Array.isArray(r.ratings)) r.ratings = [];
  const built = buildRating(_detailWork);
  const idx = r.ratings.findIndex(x => x.id === built.id);
  if (idx !== -1) r.ratings[idx] = built; else r.ratings.push(built);
  r.status = "ja-fui";
  recomputeCombined(r);
  _detailWork = null;
  saveToStorage(); populateFilters(); render();
  toast("Avaliação salva! ⭐", "success");
  openDetailModal(id);
}

function deleteRating(id, ratingId) {
  const r = restaurants.find(x => x.id === id);
  if (!r) return;
  showConfirm({
    title: "Excluir avaliação?",
    message: "Tem certeza que quer excluir esta avaliação?",
    okLabel: "Excluir", okDanger: true,
    onOk: () => {
      r.ratings = (Array.isArray(r.ratings) ? r.ratings : []).filter(x => x.id !== ratingId);
      recomputeCombined(r);
      _detailWork = null;
      saveToStorage(); populateFilters(); render();
      openDetailModal(id);
      toast("Avaliação excluída", "info");
    }
  });
}

function openDetailModal(id, focusRating) {
  const r = restaurants.find(x => x.id === id);
  if (!r) return;
  // Formulário de avaliação começa fechado (só o botão "Nova avaliação").
  _detailRestId = id;
  _detailWork = null;

  const searchString = encodeURIComponent(`${r.name} ${r.bairro} Porto Alegre`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchString}`;
  const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${searchString}`;
  const igUrl = instagramProfileUrl(r);

  const photos = r.photos || [];
  const galleryHtml = `
    <div class="detail-gallery">
      <div class="detail-gallery-head">
        <span>📸 Minhas fotos · ${photos.length}</span>
        <button type="button" class="gallery-add-btn" onclick="addVisitPhoto('${r.id}')">+ Foto</button>
      </div>
      ${photos.length === 0
        ? `<button type="button" class="gallery-empty" onclick="addVisitPhoto('${r.id}')">
             <span class="gallery-empty-ic">📷</span>
             <span>Toque pra adicionar uma foto que você tirou no lugar</span>
           </button>`
        : `<div class="gallery-grid">
            ${photos.map((src, i) => `
              <div class="gallery-thumb" style="background-image:url('${escapeAttr(src)}')" onclick="openPhotoViewer('${r.id}', ${i})">
                <div class="thumb-actions">
                  <button type="button" title="Tornar capa" onclick="event.stopPropagation(); setVisitCover('${r.id}', ${i})">⭐</button>
                  <button type="button" title="Remover" onclick="event.stopPropagation(); removeVisitPhoto('${r.id}', ${i})">🗑️</button>
                </div>
              </div>`).join("")}
            <button type="button" class="gallery-thumb gallery-thumb-add" onclick="addVisitPhoto('${r.id}')">+</button>
          </div>`}
      ${photos.length ? '<div class="gallery-hint">Toque pra ampliar · ⭐ vira capa · 🗑️ remove</div>' : ''}
    </div>`;

  // Endereço + horários (a string de horários vem do Google, separada por " · ")
  const hoursLines = (r.hours || "").split("·").map(s => s.trim()).filter(Boolean);
  const todayName = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][new Date().getDay()];
  const locationHtml = `
    <div class="detail-location">
      ${r.address ? `<div class="loc-address">📍 ${escapeHtml(r.address)}</div>` : `<div class="loc-address" style="color:var(--text-muted); font-size:13px;">📍 Endereço não cadastrado</div>`}
      ${hoursLines.length ? `<div class="loc-hours-title">🕐 Horários de funcionamento</div>
        ${hoursLines.map(line => {
          const isToday = normalize(line).startsWith(normalize(todayName));
          return `<div class="hours-row ${isToday ? "today" : ""}">${escapeHtml(line)}${isToday ? " • hoje" : ""}</div>`;
        }).join("")}` : `<div class="loc-hours-title" style="color:var(--text-muted); font-size:13px; font-weight:normal; margin-top:8px;">🕐 Horários não cadastrados</div>`}
    </div>`;

  const content = document.getElementById("modal-detail-content");
  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">${escapeHtml(r.name)}</h3>
      <button class="modal-close" onclick="closeDetailModal()">×</button>
    </div>
    <div class="detail-hero" id="detail-hero" style="background-image: ${coverBg(r)}; background-position: ${escapeAttr(r.photoPos || 'center')}">
      ${r.rating ? `<div class="detail-hero-badge">★ ${r.rating.average}</div>` : ""}
      <div class="hero-edit">
        <button type="button" class="hero-edit-btn" onclick="toggleReposition('${r.id}')" title="Reposicionar a foto">↕ Ajustar</button>
        <button type="button" class="hero-edit-btn" onclick="replaceCoverPhoto('${r.id}')" title="Trocar a foto">🖼️ Trocar</button>
        <button type="button" class="hero-edit-btn" onclick="replaceLogo('${r.id}')" title="Trocar o logo">🏷️ Logo</button>
      </div>
      <div class="hero-hint" id="hero-hint" style="display:none;">Arraste a foto pra enquadrar · toque em “Salvar”</div>
    </div>
    <div class="card-meta" style="margin-bottom: 14px;">
      <span class="tag tag-bairro">📍 ${escapeHtml(r.bairro)}</span>
      <span class="tag tag-categoria">${CATEGORIA_EMOJI[r.categoria]||"🍽️"} ${escapeHtml(r.categoria)}</span>
      <span class="tag" style="background: rgba(255,255,255,0.06); color: var(--text);">${r.price || '$$'}</span>
      ${r.favorite ? '<span class="tag" style="background: rgba(224,90,71,0.15); color: var(--secondary)">❤️ Favorito</span>' : ''}
    </div>

    <div class="card-actions detail-actions">
      ${igUrl ? `<a href="${escapeAttr(igUrl)}" target="_blank" rel="noopener" class="action-btn btn-instagram">📷 Instagram</a>` : '<button class="action-btn" disabled style="opacity:0.4">📷 Sem Instagram</button>'}
      ${r.reels ? `<a href="${escapeAttr(r.reels)}" target="_blank" rel="noopener" class="action-btn btn-reels">🎬 Reels</a>` : '<button class="action-btn" disabled style="opacity:0.4">🎬 Sem Reels</button>'}
      <a href="${mapsRouteUrl}" target="_blank" rel="noopener" class="action-btn btn-route">🚗 Rota</a>
      <a href="${mapsUrl}" target="_blank" rel="noopener" class="action-btn btn-maps">📍 No Mapa</a>
    </div>

    <div class="detail-sections">
      ${locationHtml}
      
      ${galleryHtml}
      
      <div class="detail-dishes" id="detail-dishes"></div>

      <div class="detail-rate" id="detail-rate">
        <div class="rate-form-area" id="rate-form-area"></div>
      </div>

      <div class="detail-ratings-list" id="detail-ratings-list">
        ${r.rating ? `
        <div class="final-rate">
          <div class="final-rate-big">★ ${r.rating.average}</div>
          <div class="final-rate-info">
            <div class="final-rate-label">Média final</div>
            <div class="final-rate-count">👥 ${r.rating.count} ${r.rating.count === 1 ? "pessoa avaliou" : "pessoas avaliaram"}</div>
          </div>
        </div>` : ""}
        <div class="detail-rate-head"><span>⭐ Avaliações</span></div>
        <div class="rate-list" id="rate-list">${rateListHTML(r)}</div>
      </div>

      ${r.notes ? `<div class="card-ratings-summary"><div class="rating-comment">📝 ${escapeHtml(r.notes)}</div></div>` : ''}
    </div>

    <div class="modal-footer detail-footer">
      <button class="btn-ghost" onclick="closeDetailModal(); openEditModal('${r.id}')">✏️ Editar</button>
      <button class="btn-ghost danger" onclick="closeDetailModal(); confirmDelete('${r.id}')">🗑️ Excluir</button>
    </div>`;
  document.getElementById("modal-detail").classList.add("active");
  showDefaultRateForm(id);   // mostra as estrelas da última pessoa (ou form em branco se não houver)
  renderDishes(r.id);
  if (focusRating) {
    const el = document.getElementById("detail-rate");
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  }
}
function closeDetailModal() { document.getElementById("modal-detail").classList.remove("active"); }

// ===== CAPA: reposicionar (arrastar) e trocar =====
let _repos = null;
function toggleReposition(id) {
  const hero = document.getElementById("detail-hero");
  if (!hero) return;
  const btn = hero.querySelector(".hero-edit-btn");

  if (hero.classList.contains("reposing")) {
    // Salvar
    hero.classList.remove("reposing");
    document.getElementById("hero-hint").style.display = "none";
    hero.onpointerdown = hero.onpointermove = hero.onpointerup = null;
    if (_repos) {
      const r = restaurants.find(x => x.id === id);
      if (r) { r.photoPos = `${Math.round(_repos.posX)}% ${Math.round(_repos.posY)}%`; saveToStorage(); render(); }
      _repos = null;
    }
    if (btn) btn.textContent = "↕ Ajustar";
    toast("Enquadramento salvo! 📸", "success");
    return;
  }

  // Entrar em modo reposicionar
  hero.classList.add("reposing");
  document.getElementById("hero-hint").style.display = "";
  if (btn) btn.textContent = "✅ Salvar";
  const r = restaurants.find(x => x.id === id);
  let px = 50, py = 50;
  const m = ((r && r.photoPos) || "").match(/(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
  if (m) { px = parseFloat(m[1]); py = parseFloat(m[2]); }
  _repos = { posX: px, posY: py, dragging: false, lastX: 0, lastY: 0 };

  hero.onpointerdown = (e) => {
    if (e.target.closest(".hero-edit, .hero-hint")) return;
    _repos.dragging = true; _repos.lastX = e.clientX; _repos.lastY = e.clientY;
    try { hero.setPointerCapture(e.pointerId); } catch (err) {}
  };
  hero.onpointermove = (e) => {
    if (!_repos.dragging) return;
    const dx = e.clientX - _repos.lastX, dy = e.clientY - _repos.lastY;
    _repos.lastX = e.clientX; _repos.lastY = e.clientY;
    _repos.posX = Math.max(0, Math.min(100, _repos.posX - dx * 0.2));
    _repos.posY = Math.max(0, Math.min(100, _repos.posY - dy * 0.2));
    hero.style.backgroundPosition = `${_repos.posX}% ${_repos.posY}%`;
  };
  hero.onpointerup = () => { if (_repos) _repos.dragging = false; };
  toast("Arraste a foto pra enquadrar e toque em Salvar", "info");
}

function replaceCoverPhoto(id) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async () => {
    if (!input.files || !input.files[0]) return;
    try {
      const dataUrl = await resizeImage(input.files[0], 1280, 0.78);
      const r = restaurants.find(x => x.id === id);
      if (!r) return;
      r.photo = await uploadToStorage(dataUrl, "cover");
      r.photoPos = "center";
      const ok = saveToStorage();
      if (ok === false) { toast("Memória cheia! Remova fotos antes.", "error"); return; }
      render();
      openDetailModal(id);
      toast("Foto da capa trocada! 🖼️", "success");
    } catch (e) { console.error(e); toast("Erro ao carregar imagem", "error"); }
  };
  input.click();
}

function replaceLogo(id) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async () => {
    if (!input.files || !input.files[0]) return;
    try {
      const dataUrl = await resizeImage(input.files[0], 256, 0.85);
      const r = restaurants.find(x => x.id === id);
      if (!r) return;
      r.logo = await uploadToStorage(dataUrl, "logo");
      const ok = saveToStorage();
      if (ok === false) { toast("Memória cheia! Remova fotos antes.", "error"); return; }
      render();
      openDetailModal(id);
      toast("Logo atualizado! 🏷️", "success");
    } catch (e) { console.error(e); toast("Erro ao carregar imagem", "error"); }
  };
  input.click();
}

// ===== PRATOS PRA PROVAR =====
function renderDishes(id) {
  const box = document.getElementById("detail-dishes");
  if (!box) return;
  const r = restaurants.find(x => x.id === id);
  if (!r) return;
  const dishes = r.dishes || [];
  const tried = dishes.filter(d => d.tried).length;
  box.innerHTML = `
    <div class="detail-gallery-head">
      <span>🍽️ Pratos pra provar${dishes.length ? ` · ${tried}/${dishes.length}` : ""}</span>
    </div>
    ${dishes.map(d => `
      <div class="dish-row ${d.tried ? "done" : ""}">
        <button type="button" class="dish-check" onclick="toggleDish('${id}', '${d.id}')">${d.tried ? "✅" : "⬜"}</button>
        <span class="dish-name">${escapeHtml(d.name)}</span>
        ${d.tried && d.triedAt ? `<span class="dish-date">${escapeHtml(d.triedAt.slice(5))}</span>` : ""}
        <button type="button" class="dish-remove" onclick="removeDish('${id}', '${d.id}')" title="Remover">×</button>
      </div>`).join("")}
    <div class="dish-add-row">
      <input type="text" id="dish-input" class="form-control" placeholder="Ex: Burrata, Drink da casa..." autocomplete="off"
             onkeydown="if(event.key==='Enter'){event.preventDefault();addDishFromInput('${id}');}">
      <button type="button" class="gallery-add-btn" onclick="addDishFromInput('${id}')">+ Add</button>
    </div>`;
}

function addDishFromInput(id) {
  const input = document.getElementById("dish-input");
  const name = (input && input.value || "").trim();
  if (!name) return;
  const r = restaurants.find(x => x.id === id);
  if (!r) return;
  r.dishes = r.dishes || [];
  r.dishes.push({ id: "dish-" + Date.now(), name, tried: false });
  saveToStorage();
  renderDishes(id);
  const newInput = document.getElementById("dish-input");
  if (newInput) newInput.focus();
}

function toggleDish(id, dishId) {
  const r = restaurants.find(x => x.id === id);
  if (!r || !r.dishes) return;
  const d = r.dishes.find(x => x.id === dishId);
  if (!d) return;
  d.tried = !d.tried;
  d.triedAt = d.tried ? new Date().toISOString().slice(0, 10) : undefined;
  saveToStorage();
  renderDishes(id);
}

function removeDish(id, dishId) {
  const r = restaurants.find(x => x.id === id);
  if (!r || !r.dishes) return;
  r.dishes = r.dishes.filter(x => x.id !== dishId);
  saveToStorage();
  renderDishes(id);
}

// ===== GALERIA "MINHAS FOTOS" =====
// Reduz a imagem (canvas) antes de salvar, pra não estourar o localStorage.
function resizeImage(file, maxDim = 1280, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) { height = Math.round(height * maxDim / width); width = maxDim; }
          else { width = Math.round(width * maxDim / height); height = maxDim; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// Abre o seletor nativo (no celular oferece câmera ou galeria).
function addVisitPhoto(id) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;
  input.onchange = () => onVisitPhotoFiles(id, input.files);
  input.click();
}

async function onVisitPhotoFiles(id, files) {
  const r = restaurants.find(x => x.id === id);
  if (!r || !files || !files.length) return;
  r.photos = r.photos || [];
  toast("Processando foto(s)…", "info");
  let added = 0;
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    try {
      const durl = await resizeImage(file);
      r.photos.push(await uploadToStorage(durl, "gallery"));
      added++;
    } catch (e) { console.error("Erro ao processar imagem:", e); }
  }
  if (!added) { toast("Nenhuma imagem válida", "error"); return; }

  const ok = saveToStorage();
  if (ok === false) {
    r.photos.splice(r.photos.length - added, added); // desfaz
    saveToStorage();
    toast("Memória cheia! Remova fotos antigas antes de adicionar mais.", "error");
  } else {
    toast(`${added} foto(s) adicionada(s)! 📸`, "success");
  }
  render();
  openDetailModal(id);
}

function setVisitCover(id, idx) {
  const r = restaurants.find(x => x.id === id);
  if (!r || !r.photos || !r.photos[idx]) return;
  r.photo = r.photos[idx];
  saveToStorage(); render(); openDetailModal(id);
  toast("Definida como capa! 🖼️", "success");
}

function removeVisitPhoto(id, idx) {
  const r = restaurants.find(x => x.id === id);
  if (!r || !r.photos) return;
  r.photos.splice(idx, 1);
  saveToStorage(); render(); openDetailModal(id);
  toast("Foto removida", "info");
}

function openPhotoViewer(id, idx) {
  const r = restaurants.find(x => x.id === id);
  if (!r || !r.photos || !r.photos[idx]) return;
  let v = document.getElementById("photo-viewer");
  if (!v) {
    v = document.createElement("div");
    v.id = "photo-viewer";
    v.className = "photo-viewer";
    v.onclick = () => v.classList.remove("show");
    document.body.appendChild(v);
  }
  v.innerHTML = `<img src="${escapeAttr(r.photos[idx])}" alt=""><button class="pv-close" aria-label="Fechar">×</button>`;
  v.classList.add("show");
}

// ===== SHARE =====
async function shareRestaurant(id) {
  const r = restaurants.find(x => x.id === id);
  if (!r) return;
  const text = `${r.name} (${r.bairro}, Porto Alegre)${r.rating ? ` — ${r.rating.average}⭐` : ''}\nVisto no RolêPOA 🍷`;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name} ${r.bairro} Porto Alegre`)}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: r.name, text, url });
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast("Link copiado!", "success");
    } catch {
      toast("Não foi possível compartilhar", "error");
    }
  }
}

// ===== RANDOM PICK =====
let _randomCats = new Set();
function openRandomPick() {
  document.getElementById("modal-random").classList.add("active");
  _randomCats = new Set();
  // Categorias que o usuário realmente tem cadastradas (ordenadas).
  const cats = [...new Set(restaurants.map(r => r.categoria).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const chips = `<button type="button" class="cat-pin active" data-cat="" onclick="toggleRandomCat(this)">🎲 Todos</button>` +
    cats.map(c => `<button type="button" class="cat-pin" data-cat="${escapeAttr(c)}" onclick="toggleRandomCat(this)">${CATEGORIA_EMOJI[c] || "🍽️"} ${escapeHtml(c)}</button>`).join("");
  // reset
  const result = document.getElementById("random-result");
  result.innerHTML = `
    <div class="random-intro">
      <div class="random-intro-emoji">🎲</div>
      <p class="random-intro-title">Bora deixar a sorte decidir?</p>
      <p class="random-intro-sub">Eu escolho um rolê pra você agora mesmo.</p>
      <div class="random-field">
        <span>Categorias</span>
        <div class="cat-pins" id="random-cat-pins">${chips}</div>
      </div>
      <label class="random-toggle">
        <input type="checkbox" id="random-only-todo" checked>
        <span>Apenas lugares “Para Conhecer”</span>
      </label>
    </div>`;
}
// Liga/desliga um pin de categoria no sorteio (multi-seleção + "Todos").
function toggleRandomCat(btn) {
  const cat = btn.dataset.cat;
  if (!cat) _randomCats.clear();                 // "Todos" zera os filtros
  else if (_randomCats.has(cat)) _randomCats.delete(cat);
  else _randomCats.add(cat);
  const container = document.getElementById("random-cat-pins");
  container.querySelectorAll(".cat-pin").forEach(p => {
    const c = p.dataset.cat;
    p.classList.toggle("active", c ? _randomCats.has(c) : _randomCats.size === 0);
  });
}
function closeRandomPick() {
  clearTimeout(_diceTimer);
  document.getElementById("modal-random").classList.remove("active");
}
// Pips de cada face do dado (posições numa grade 3x3, células 1–9).
const DICE_PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
function diceFacePips(n) {
  const set = new Set(DICE_PIPS[n]);
  let cells = "";
  for (let c = 1; c <= 9; c++) cells += `<span class="pip ${set.has(c) ? "on" : ""}"></span>`;
  return cells;
}
function dice3dHTML() {
  return `<div class="dice-3d"><div class="cube">
    <div class="face front">${diceFacePips(1)}</div>
    <div class="face back">${diceFacePips(6)}</div>
    <div class="face right">${diceFacePips(3)}</div>
    <div class="face left">${diceFacePips(4)}</div>
    <div class="face top">${diceFacePips(2)}</div>
    <div class="face bottom">${diceFacePips(5)}</div>
  </div></div>`;
}

// ===== SONS (Web Audio API, sem arquivos) =====
let _audioCtx = null;
function getAudio() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
  }
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}
// Um impacto do dado batendo na mesa de madeira: clack curto + corpo grave/amadeirado.
function diceImpact(ctx, t, vol) {
  // Clack — ruído de banda média (madeira, não agudo)
  const dur = 0.035;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * (1 - j / d.length);
  const src = ctx.createBufferSource(); src.buffer = buf;
  const bp = ctx.createBiquadFilter(); bp.type = "bandpass";
  bp.frequency.value = 800 + Math.random() * 800; bp.Q.value = 0.7;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol * 0.55, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp); bp.connect(g); g.connect(ctx.destination);
  src.start(t); src.stop(t + dur);

  // Corpo grave (peso) — ressonância baixa e mais longa
  const low = ctx.createOscillator(); low.type = "triangle";
  const f = 90 + Math.random() * 110;          // 90–200 Hz
  low.frequency.setValueAtTime(f * 1.5, t);
  low.frequency.exponentialRampToValueAtTime(f, t + 0.05);
  const gLow = ctx.createGain();
  gLow.gain.setValueAtTime(vol, t);
  gLow.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  low.connect(gLow); gLow.connect(ctx.destination);
  low.start(t); low.stop(t + 0.16);

  // Harmônico médio curto — dá o timbre de madeira
  const mid = ctx.createOscillator(); mid.type = "sine";
  mid.frequency.setValueAtTime(f * 3, t);
  const gMid = ctx.createGain();
  gMid.gain.setValueAtTime(vol * 0.35, t);
  gMid.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
  mid.connect(gMid); gMid.connect(ctx.destination);
  mid.start(t); mid.stop(t + 0.09);
}

// Rolagem realista: batidas que vão espaçando até o dado assentar (~2,5s).
function playDiceSound() {
  const ctx = getAudio(); if (!ctx) return;
  let t = ctx.currentTime;
  const end = ctx.currentTime + 2.5;
  let gap = 0.06;
  let vol = 0.3;
  while (t < end) {
    diceImpact(ctx, t, vol * (0.75 + Math.random() * 0.3));
    gap *= 1.10 + Math.random() * 0.06;        // intervalos crescem (perde energia)
    gap = Math.min(gap, 0.42);
    t += gap + Math.random() * 0.02;
    vol *= 0.99;
  }
  diceImpact(ctx, t + 0.08, 0.22);             // toque final, mais pesado
}
// Trombeta leve (fanfarra) na revelação.
function playFanfare() {
  const ctx = getAudio(); if (!ctx) return;
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  notes.forEach((f, i) => {
    const t = now + i * 0.11;
    const osc = ctx.createOscillator(); osc.type = "triangle"; osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.2, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.55);
  });
}

let _diceTimer = null;
function doRandomPick() {
  const onlyTodo = document.getElementById("random-only-todo")?.checked ?? true;
  const pool = restaurants.filter(r =>
    (onlyTodo ? r.status === "para-conhecer" : true) &&
    (_randomCats.size ? _randomCats.has(r.categoria) : true)
  );
  if (!pool.length) {
    const catTxt = _randomCats.size ? ` de ${[..._randomCats].join("/")}` : "";
    toast(`Nenhum lugar${catTxt}${onlyTodo ? ' "Para Conhecer"' : ''}!`, "error"); return;
  }
  const picked = pool[Math.floor(Math.random() * pool.length)];
  const result = document.getElementById("random-result");
  const rollBtn = document.getElementById("random-roll-btn");
  if (rollBtn) rollBtn.disabled = true;

  // Animação: dado 3D rolando
  result.innerHTML = `
    <div class="dice-roll">
      ${dice3dHTML()}
      <div class="dice-shadow"></div>
      <p class="dice-text">Sorteando seu rolê…</p>
    </div>`;
  playDiceSound();

  // Revela o lugar após ~2.2s
  clearTimeout(_diceTimer);
  _diceTimer = setTimeout(() => {
    if (rollBtn) rollBtn.disabled = false;
    burstConfetti();
    playFanfare();
    result.innerHTML = `
      <div class="random-result-card">
        <div class="rr-hero" style="background-image:${coverBg(picked)}; background-position:${escapeAttr(picked.photoPos || 'center')}">
          <span class="rr-tag">🎉 Bora pra cá!</span>
          <div class="rr-hero-text">
            <h4>${escapeHtml(picked.name)}</h4>
            <div class="rr-meta">📍 ${escapeHtml(picked.bairro)} · ${CATEGORIA_EMOJI[picked.categoria]||"🍽️"} ${escapeHtml(picked.categoria)} · ${picked.price || '$$'}${picked.rating ? ` · ★ ${picked.rating.average}` : ""}</div>
          </div>
        </div>
        <div class="rr-actions">
          <button class="btn-ghost" onclick="doRandomPick()">🎲 De novo</button>
          <button class="btn-primary" onclick="closeRandomPick(); openDetailModal('${picked.id}')">Ver detalhes</button>
        </div>
      </div>`;
    toast(`Sorteado: ${picked.name}! 🎲`, "success");
  }, 2800);
}

// Estoura confetes a partir do centro da tela.
function burstConfetti() {
  let layer = document.getElementById("confetti-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "confetti-layer";
    layer.className = "confetti-layer";
    document.body.appendChild(layer);
  }
  layer.innerHTML = "";
  const colors = ["#F5A623", "#E05A47", "#4CAF50", "#ffffff", "#ffd87a", "#4A9EFF"];
  const N = 40;
  for (let i = 0; i < N; i++) {
    const p = document.createElement("i");
    p.className = "confetti-piece";
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    p.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--ty", `${Math.sin(angle) * dist + 140}px`);
    p.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = `${Math.random() * 0.12}s`;
    layer.appendChild(p);
  }
  setTimeout(() => { if (layer) layer.innerHTML = ""; }, 1600);
}


// ===== BOAS-VINDAS (primeira visita) =====

// Fogos de artifício: bursts de partículas dentro de um container (%).
function launchFireworks(host, rounds = 4) {
  if (!host || !document.body.contains(host)) return;
  const colors = ["#F5A623", "#E05A47", "#4CAF50", "#ffd87a", "#4A9EFF", "#ff7eb3", "#ffffff"];
  let round = 0;
  const fire = () => {
    if (!document.body.contains(host)) return;
    const cx = 18 + Math.random() * 64;   // % horizontal
    const cy = 10 + Math.random() * 42;   // % vertical (parte de cima)
    const color = colors[Math.floor(Math.random() * colors.length)];
    const N = 16;
    for (let i = 0; i < N; i++) {
      const s = document.createElement("i");
      s.className = "fw-spark";
      const ang = (Math.PI * 2 * i) / N + Math.random() * 0.3;
      const dist = 24 + Math.random() * 30;
      s.style.left = cx + "%";
      s.style.top = cy + "%";
      s.style.color = color;
      s.style.background = color;
      s.style.setProperty("--fx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--fy", Math.sin(ang) * dist + "px");
      s.style.animationDelay = (Math.random() * 0.05) + "s";
      host.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
    round++;
    if (round < rounds) setTimeout(fire, 340 + Math.random() * 280);
  };
  fire();
}

// Emojis subindo como balõezinhos.
function floatEmojis(host) {
  if (!host) return;
  const set = ["🍷", "🍔", "🍕", "🌮", "🍻", "🎉", "✨", "🥂", "🍝", "🧉", "🍰", "🌭"];
  const spawn = () => {
    if (!document.body.contains(host)) return;
    const e = document.createElement("span");
    e.className = "we-emoji";
    e.textContent = set[Math.floor(Math.random() * set.length)];
    e.style.left = (6 + Math.random() * 86) + "%";
    const dur = 3.4 + Math.random() * 2.2;
    e.style.animationDuration = dur + "s";
    e.style.fontSize = (16 + Math.random() * 13) + "px";
    host.appendChild(e);
    setTimeout(() => e.remove(), dur * 1000 + 120);
    setTimeout(spawn, 420 + Math.random() * 460);
  };
  spawn();
}


// ===== MENU =====
function openMenu() { document.getElementById("modal-menu").classList.add("active"); }
function closeMenu() { document.getElementById("modal-menu").classList.remove("active"); }

// ===== BOOKMARKLET =====
function openBookmarkletInfo() {
  closeMenu();

  // Gera a URL base do próprio app (funciona tanto em file:/// local quanto hospedado)
  const appUrl = window.location.href.split('?')[0];

  // Script minificado do bookmarklet
  // Ele roda NA PÁGINA DO INSTAGRAM e coleta as informações disponíveis
  const script = `(function(){
    var u=window.location.href;
    if(!u.includes('instagram.com')){alert('Abra o perfil de um restaurante no Instagram primeiro!');return;}
    var name='';
    var photo='';
    var bio='';
    var reels=u;
    // Tenta coletar o nome do perfil
    try{var h1=document.querySelector('h2,h1,[data-testid="user-name"]');if(h1)name=h1.innerText.trim();}catch(e){}
    if(!name){var m=u.match(/instagram\.com\/([^/?]+)/);if(m)name=m[1];}
    // Tenta coletar a foto do perfil em alta resolução
    try{var img=document.querySelector('img[data-testid="user-avatar"],header img,main img');if(img)photo=img.src;}catch(e){}
    // Tenta coletar a bio para inferir bairro
    try{var bioEl=document.querySelector('[data-testid="user-bio"] *,section li span,.-vDIg span,._7UhW7 span');if(bioEl)bio=bioEl.innerText||'';}catch(e){}
    // Detecta bairros de POA na bio
    var bairros=['Bom Fim','Cidade Baixa','Moinhos de Vento','Auxiliadora','Menino Deus','Rio Branco','Centro Historico','Tres Figueiras','Petropolis','Floresta','Higienopolis','Bela Vista','Independencia','Montserrat','Boa Vista','Passo d Areia','Praia de Belas','Santana','Jardim Botanico','Cavalhada','Ipanema','Teresopolis','Gloria','Partenon','Zona Sul','Chácaradasbpedras'];
    var bairro='';
    var bioN=bio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    for(var i=0;i<bairros.length;i++){if(bioN.includes(bairros[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''))){bairro=bairros[i];break;}}
    var params=new URLSearchParams();
    params.set('import','true');
    params.set('name',name);
    if(photo)params.set('photo',photo);
    if(bairro)params.set('bairro',bairro);
    params.set('reels',reels);
    window.open('${appUrl}?'+params.toString(),'_blank');
  })()`;

  const bookmarkletHref = 'javascript:' + encodeURIComponent(script);
  const link = document.getElementById('bookmarklet-link');
  if (link) link.href = bookmarkletHref;

  document.getElementById('modal-bookmarklet').classList.add('active');
}

function closeBookmarkletInfo() {
  document.getElementById('modal-bookmarklet').classList.remove('active');
}

// Verifica se a página foi aberta pelo bookmarklet com dados para importar
function checkUrlImports() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('import') !== 'true') return;

  const name   = params.get('name')  || '';
  const photo  = params.get('photo') || '';
  const bairro = params.get('bairro')|| '';
  const reels  = params.get('reels') || '';

  // Limpa a query string da URL sem recarregar a página
  const cleanUrl = window.location.href.split('?')[0];
  window.history.replaceState({}, '', cleanUrl);

  if (!name) return;

  // Preenche o modal de adicionar
  openAddModal();

  setTimeout(() => {
    document.getElementById('input-name').value = name;
    if (photo) {
      document.getElementById('input-photo').value = photo;
      updatePhotoPreview(photo);
    }
    if (bairro) {
      const sel = document.getElementById('input-bairro');
      const found = [...sel.options].find(o => normalize(o.value) === normalize(bairro) || normalize(bairro).includes(normalize(o.value)));
      if (found) sel.value = found.value;
    }
    if (reels) document.getElementById('input-reels').value = reels;

    // Dispara autocomplete e mapa
    onNameInput(name);

    toast(`✨ "${name}" importado do Instagram! Confirme os dados e salve.`, 'success');
  }, 350);
}

// ===== EXPORT =====
function exportData() {
  const data = JSON.stringify(restaurants, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `rolepoa-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast("Backup baixado!", "success");
  closeMenu();
}

// ===== IMPORT =====
function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error("Formato inválido");
      showConfirm({
        title: "Importar dados?",
        message: `Encontrei ${data.length} lugar(es). Substituir todos os dados atuais?`,
        okLabel: "Substituir",
        onOk: () => {
          restaurants = data.map(migrate);
          saveToStorage(); populateFilters(); render();
          toast(`${data.length} lugares importados!`, "success");
          closeMenu();
        }
      });
    } catch {
      toast("Arquivo JSON inválido", "error");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

// ===== CLEAR ALL =====
function clearAllData() {
  showConfirm({
    title: "Apagar tudo?",
    message: "Isto apagará todos os seus lugares salvos. Esta ação não pode ser desfeita!",
    okLabel: "Sim, apagar tudo",
    okDanger: true,
    onOk: () => {
      restaurants = [];
      saveLocal(); updateStats(); populateFilters(); render();
      clearCloud();
      toast("Tudo apagado", "info");
      closeMenu();
    }
  });
}

// ===== STATS MODAL =====
function openStats() {
  closeMenu();
  const total = restaurants.length;
  const todo = restaurants.filter(r => r.status === "para-conhecer").length;
  const visited = restaurants.filter(r => r.status === "ja-fui").length;
  const favs = restaurants.filter(r => r.favorite).length;
  const rated = restaurants.filter(r => r.rating);
  const avg = rated.length ? (rated.reduce((s,r) => s + r.rating.average, 0) / rated.length).toFixed(2) : "—";

  // Top categoria
  const catCount = {};
  restaurants.forEach(r => { catCount[r.categoria] = (catCount[r.categoria]||0) + 1; });
  const topCat = Object.entries(catCount).sort((a,b)=>b[1]-a[1])[0];

  const baiCount = {};
  restaurants.forEach(r => { baiCount[r.bairro] = (baiCount[r.bairro]||0) + 1; });
  const topBai = Object.entries(baiCount).sort((a,b)=>b[1]-a[1])[0];

  const top3 = [...rated].sort((a,b)=>b.rating.average - a.rating.average).slice(0, 3);
  const top3Html = top3.length ? top3.map((r,i) => `<div class="stats-row">${i+1}. ${escapeHtml(r.name)} <span>${r.rating.average}⭐</span></div>`).join("") : '<p style="color:var(--text-muted);font-size:13px;">Avalie lugares para ver seu ranking.</p>';

  document.getElementById("stats-content").innerHTML = `
    <div class="stats-block">
      <h4>Resumo Geral</h4>
      <div class="stats-row">Total de lugares <span>${total}</span></div>
      <div class="stats-row">Para conhecer <span>${todo}</span></div>
      <div class="stats-row">Já visitados <span>${visited}</span></div>
      <div class="stats-row">Favoritos <span>${favs}</span></div>
      <div class="stats-row">Nota média geral <span>${avg}</span></div>
    </div>
    <div class="stats-block">
      <h4>Preferências</h4>
      <div class="stats-row">Categoria favorita <span>${topCat ? `${topCat[0]} (${topCat[1]})` : '—'}</span></div>
      <div class="stats-row">Bairro mais explorado <span>${topBai ? `${topBai[0]} (${topBai[1]})` : '—'}</span></div>
    </div>
    <div class="stats-block">
      <h4>🏆 Top 3 Avaliados</h4>
      ${top3Html}
    </div>`;
  document.getElementById("modal-stats").classList.add("active");
}
function closeStats() { document.getElementById("modal-stats").classList.remove("active"); }

// ===== CONFIRM MODAL =====
function showConfirm({ title, message, okLabel = "Confirmar", cancelLabel = "Cancelar", okDanger = false, onOk, onCancel }) {
  document.getElementById("confirm-title").innerText = title;
  document.getElementById("confirm-message").innerText = message;
  const okBtn = document.getElementById("confirm-ok");
  const cancelBtn = document.getElementById("confirm-cancel");
  okBtn.innerText = okLabel;
  cancelBtn.innerText = cancelLabel;
  okBtn.className = "btn-primary" + (okDanger ? " danger" : "");
  const modal = document.getElementById("modal-confirm");
  modal.classList.add("active");

  const close = () => modal.classList.remove("active");
  okBtn.onclick = () => { close(); onOk?.(); };
  cancelBtn.onclick = () => { close(); onCancel?.(); };
}

// ===== TOAST =====
function toast(msg, type = "info") {
  const container = document.getElementById("toast-container");
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "💬";
  t.innerHTML = `<span>${icon}</span><span>${escapeHtml(msg)}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function showErrorNotification(message, duration = 5000) {
  const id = "error-" + Date.now();
  const el = document.createElement("div");
  el.id = id;
  el.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #e53935;
    color: #fff;
    padding: 14px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 9999;
    font-size: 14px;
    max-width: 90%;
    word-wrap: break-word;
  `;
  el.innerText = "❌ " + message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration);
}

// ===== UTILS =====
function escapeHtml(str) {
  if (str == null) return "";
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(str) { return escapeHtml(str).replace(/`/g, '&#96;'); }
function formatDateBR(iso) {
  if (!iso) return "";
  const [y,m,d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
