// ===== RATINGS MODULE =====
// Avaliações por estrelas e gestão de notas

export function newRating() {
  const modalId = "modal-detail";
  const detailId = document.getElementById("detail-id").value;
  const person = prompt("Nome de quem avalia? (ex: Marcelo)");
  if (!person) return;
  const rest = restaurants.find(r => r.id === detailId);
  if (!rest) return;

  if (!Array.isArray(rest.ratings)) rest.ratings = [];
  const newId = "rt-" + Date.now();
  rest.ratings.push({
    id: newId,
    person: person.trim(),
    comida: 0, bebida: 0, atendimento: 0, ambiente: 0, preco: 0, instagramavel: 0, experiencia: 0,
    bebidaTipo: "agua",
    comments: "",
    prato: "",
    bebidas: "",
    pratos: [],
    photos: [],
    date: new Date().toISOString()
  });
  document.getElementById("rate-id").value = newId;
  renderDetailRatings();
}

export function editRating(ratingId) {
  document.getElementById("rate-id").value = ratingId;
  renderDetailRatings();
}

export function deleteRating(ratingId) {
  const rest = restaurants.find(r => r.id === document.getElementById("detail-id").value);
  if (!rest || !Array.isArray(rest.ratings)) return;
  rest.ratings = rest.ratings.filter(r => r.id !== ratingId);
  recomputeCombined(rest);
  saveToStorage();
  renderDetailRatings();
}

export function saveDetailRating() {
  const detailId = document.getElementById("detail-id").value;
  const ratingId = document.getElementById("rate-id").value;
  const rest = restaurants.find(r => r.id === detailId);
  if (!rest || !ratingId) return;

  const idx = (rest.ratings || []).findIndex(r => r.id === ratingId);
  if (idx < 0) return;

  const rating = rest.ratings[idx];
  rating.comida = parseInt(document.getElementById("detail-comida")?.value || 0);
  rating.bebida = parseInt(document.getElementById("detail-bebida")?.value || 0);
  rating.atendimento = parseInt(document.getElementById("detail-atendimento")?.value || 0);
  rating.ambiente = parseInt(document.getElementById("detail-ambiente")?.value || 0);
  rating.preco = parseInt(document.getElementById("detail-preco")?.value || 0);
  rating.instagramavel = parseInt(document.getElementById("detail-instagramavel")?.value || 0);
  rating.experiencia = parseInt(document.getElementById("detail-experiencia")?.value || 0);
  rating.comments = document.getElementById("detail-comments")?.value || "";
  rating.prato = document.getElementById("detail-prato")?.value || "";
  rating.bebidas = document.getElementById("detail-bebidas")?.value || "";
  rating.bebidaTipo = document.getElementById("detail-bebida-tipo")?.value || "agua";
  rating.date = new Date().toISOString();

  recomputeCombined(rest);
  saveToStorage();
  renderDetailRatings();
  toast("Avaliação salva! ✅", "success");
}

export function rateListHTML(ratings) {
  if (!Array.isArray(ratings) || !ratings.length) return "";
  return ratings.map(rt => `
    <div class="rating-entry">
      <div class="rating-entry-header">
        <strong>${escapeHtml(rt.person)}</strong>
        <div class="rating-entry-actions">
          <button class="rate-edit" onclick="editRating('${rt.id}')">✏️</button>
          <button class="rate-delete" onclick="deleteRating('${rt.id}')">🗑️</button>
        </div>
      </div>
      <div class="rating-stars">
        ${renderDetailStars(rt)}
      </div>
      ${rt.comments ? `<div class="rating-comment-text">${escapeHtml(rt.comments)}</div>` : ""}
    </div>
  `).join("");
}

export function renderDetailStars(rt) {
  const items = [
    { key: "comida", emoji: "🍔", label: "Comida" },
    { key: "bebida", emoji: "🍹", label: "Bebida" },
    { key: "atendimento", emoji: "🧑‍🍳", label: "Atendimento" },
    { key: "ambiente", emoji: "🪑", label: "Ambiente" },
    { key: "preco", emoji: "💰", label: "Preço" },
    { key: "instagramavel", emoji: "📸", label: "Instagramável" },
    { key: "experiencia", emoji: "❤️", label: "Experiência" }
  ];
  return items.map(it => {
    const val = rt[it.key] || 0;
    const stars = Array.from({ length: 5 }).map((_, i) =>
      `<span class="star ${(i + 1) <= val ? 'on' : ''}" onclick="setStarDetailValue('${it.key}', ${i + 1})">★</span>`
    ).join("");
    return `<div class="star-row"><span class="star-label">${it.emoji} ${it.label}</span><div class="stars">${stars}</div></div>`;
  }).join("");
}

export function renderDetailDishes(rt) {
  const dishes = rt.pratos || [];
  if (!dishes.length) return "";
  return `<div class="detail-dishes-list">
    ${dishes.map((d, i) => `
      <div class="dish-item">
        ${d.photo ? `<img src="${escapeAttr(d.photo)}" alt="">` : ''}
        <div><strong>${escapeHtml(d.name)}</strong>${d.notes ? `<br><small>${escapeHtml(d.notes)}</small>` : ''}</div>
        <button class="dish-remove" onclick="removeDish(${i})">✕</button>
      </div>
    `).join("")}
  </div>`;
}

export function renderDishes(r) {
  if (!r.dishes || !r.dishes.length) return "";
  return `<div class="restaurant-dishes">
    <h4>Pratos</h4>
    ${r.dishes.map((d, i) => `
      <div class="dish" style="${d.photo ? `background-image:url('${escapeAttr(d.photo)}')` : ''}">
        <div class="dish-name">${escapeHtml(d.name)}</div>
        ${d.price ? `<div class="dish-price">${escapeHtml(d.price)}</div>` : ''}
      </div>
    `).join("")}
  </div>`;
}
