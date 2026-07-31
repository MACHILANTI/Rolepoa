// Script para regenerar URLs de fotos expiradas do Google Places
// Use no console do navegador ou chame via fetch

async function regeneratePhotos() {
  const SUPABASE_URL = "https://papakiwailmirguubanf.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcGFraXdhaWxtaXJndXViYW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NzEwNjksImV4cCI6MjA5NjQ0NzA2OX0.ffBCveRc8Snwj7TBvTEAv7K8sLEIjTNEZjlSuBwqh8M";
  const GOOGLE_KEY = "AIzaSyCVH7932duKQQ4qkRxxaq-2ICZPralu79s";

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Buscar todos os restaurantes
  const { data: places, error } = await client.from("places").select("data");
  if (error) {
    console.error("Erro ao buscar places:", error);
    return;
  }

  let updated = 0;

  for (const row of places) {
    const r = row.data;
    if (!r.name) continue;

    try {
      // Buscar no Google Places
      const res = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_KEY,
        },
        body: JSON.stringify({
          textQuery: `${r.name} Porto Alegre`,
          maxResultCount: 1,
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      if (!data.places?.[0]?.photos?.[0]) continue;

      const photoUri = data.places[0].photos[0].getURI?.({ maxWidth: 900 }) ||
                       data.places[0].photos[0].name;

      if (photoUri !== r.photo) {
        r.photo = photoUri;
        await client.from("places").update({ data: r }).eq("id", r.id);
        updated++;
        console.log(`✅ ${r.name}: foto atualizada`);
      }
    } catch (e) {
      console.warn(`⚠️ ${r.name}: erro ao atualizar`, e.message);
    }

    // Rate limit: aguarda 100ms entre requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n✅ ${updated} restaurantes atualizados!`);
}

// Chamar ao carregar a página
regeneratePhotos();
