// ===== RENDERING MODULE =====
// Renderização de cards, modais e mapa

export function render() {
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

export function renderCard(r) {
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
    <div class="restaurant-card" data-cat="${escapeAttr(r.categoria)}" onclick="cardClick(event, '${r.id}')">
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

export function renderMapMarkers(list) {
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

  renderMapList(withCoords);

  if (withCoords.length) {
    const bounds = L.latLngBounds(withCoords.map(r => [r.lat, r.lon]));
    _map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
  }
}

export function renderMapList(list) {
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
