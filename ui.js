// ===== UI MODULE =====
// Interações: filtros, busca, favoritos, toggles

export function toggleFavorite(id) {
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

export function filterStatus(status, btnElement) {
  currentFilter = status;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btnElement.classList.add("active");
  render();
  closeSidebarOnMobile();
}

export function onSearchInput(value) {
  currentSearch = value.trim();
  document.getElementById("search-clear").style.display = currentSearch ? "block" : "none";
  render();
}

export function clearSearch() {
  document.getElementById("search-input").value = "";
  currentSearch = "";
  document.getElementById("search-clear").style.display = "none";
  render();
}

export function toggleStatus(id) {
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

export function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  const bd = document.getElementById("sidebar-backdrop");
  const open = sb.classList.toggle("open");
  bd.classList.toggle("show", open);
}

export function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-backdrop").classList.remove("show");
}

export function closeSidebarOnMobile() {
  if (window.innerWidth < 980) closeSidebar();
}

export function setView(view) {
  currentView = view;
  document.getElementById("list-view").style.display = view === "list" ? "" : "none";
  document.getElementById("map-view").style.display = view === "map" ? "" : "none";
  document.querySelectorAll(".view-toggle button").forEach(b =>
    b.classList.toggle("active", b.dataset.view === view));
  if (view === "map") {
    if (!initMap()) return;
    setTimeout(() => { _map.invalidateSize(); render(); }, DELAY_MAP_RENDER);
  }
}

export function initMap() {
  if (typeof L === "undefined") {
    toast("Mapa ainda carregando… tente de novo em 1s.", "info");
    return false;
  }
  if (_map) return true;
  _map = L.map("map", { zoomControl: true, attributionControl: true })
    .setView([-30.0346, -51.2177], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(_map);
  _markerLayer = L.layerGroup().addTo(_map);
  return true;
}

export function focusMarker(id, on) {
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

export function highlightMapItem(id, on) {
  const item = document.querySelector(`.map-list-item[data-id="${id}"]`);
  if (!item) return;
  item.classList.toggle("hl", on);
  if (on) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

export function closeMapPopupAndOpen(id) {
  if (_map) _map.closePopup();
  openDetailModal(id);
}

export function cardClick(event, id) {
  if (event.target.closest("a, button")) return;
  openDetailModal(id);
}
