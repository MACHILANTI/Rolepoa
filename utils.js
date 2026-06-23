// ===== UTILS MODULE =====
// Funções auxiliares: formatting, escaping, helpers

export function escapeHtml(s) {
  if (!s) return "";
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

export function escapeAttr(s) {
  if (!s) return "";
  return (s + "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatDateBR(timestamp) {
  if (!timestamp) return "";
  const d = new Date(timestamp);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function toast(message, type = "info") {
  const box = document.getElementById("toast-box");
  if (!box) return;
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.textContent = message;
  box.appendChild(el);
  setTimeout(() => {
    el.classList.add("show");
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }, 10);
}

export function showErrorNotification(message) {
  toast(message, "error");
}

export function showConfirm(opts) {
  const modal = document.getElementById("modal-confirm");
  if (!modal) return;
  document.getElementById("confirm-title").innerHTML = escapeHtml(opts.title || "Confirmar");
  document.getElementById("confirm-message").innerHTML = escapeHtml(opts.message || "Tem certeza?");
  document.getElementById("confirm-ok").textContent = opts.okLabel || "OK";
  document.getElementById("confirm-cancel").textContent = opts.cancelLabel || "Cancelar";
  document.getElementById("confirm-ok").onclick = () => { modal.classList.remove("active"); opts.onOk?.(); };
  document.getElementById("confirm-cancel").onclick = () => { modal.classList.remove("active"); opts.onCancel?.(); };
  modal.classList.add("active");
}

export function normalize(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function saveLocal() {
  try {
    localStorage.setItem("role_poa_restaurants", JSON.stringify(restaurants));
    return true;
  } catch (e) {
    console.error("Falha ao salvar local (cota cheia?):", e);
    return false;
  }
}

export function saveToStorage() {
  const ok = saveLocal();
  updateStats();
  schedulePush();
  return ok;
}

export function updateStats() {
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

export function animateCount(el, target, decimals = 0, duration = 900) {
  if (!el) return;
  const isNum = typeof target === "number" && isFinite(target);
  if (!isNum) { el.innerText = target; return; }
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.innerText = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
    else el.innerText = target.toFixed(decimals);
  }
  requestAnimationFrame(tick);
}

export function animateStats() {
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

export function getFilteredRestaurants() {
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

export function populateFilters() {
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

export function instagramProfileUrl(r) {
  return r.instagram ? `https://www.instagram.com/${r.instagram}/` : "";
}

export function placeLogoUrl(r) {
  if (r.logo) return r.logo;
  return r.instagram ? instagramAvatarUrl(r.instagram) : "";
}

export function instagramAvatarUrl(handle) {
  const h = (handle || "").replace(/^@/, "").toLowerCase();
  return h ? `https://unavatar.io/instagram/${h}` : "";
}

export function titleLogoHTML(r) {
  const logoUrl = placeLogoUrl(r);
  const emoji = CATEGORIA_EMOJI[r.categoria] || "🍽️";
  const img = logoUrl ? `<img src="${escapeAttr(logoUrl)}" alt="" onerror="this.style.display='none'">` : "";
  return `<span class="title-logo"><span class="title-logo-emoji">${emoji}</span>${img}</span>`;
}

export function coverBg(r) {
  const cat = CATEGORY_IMAGES[r.categoria] || CATEGORY_IMAGES["Outro"];
  return r.photo
    ? `url('${escapeAttr(r.photo)}'), url('${escapeAttr(cat)}')`
    : `url('${escapeAttr(cat)}')`;
}

export function extractInstagramHandle(raw) {
  const s = (raw || "").trim();
  if (!s) return "";
  const m = s.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
  if (m && !/^(reel|reels|p|tv|explore)$/i.test(m[1])) return m[1];
  return s.replace(/^@/, "").replace(/[^A-Za-z0-9._]/g, "");
}
