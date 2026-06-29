// ===== STATE MODULE =====
// Variáveis globais, constantes e inicialização

// DADOS INICIAIS
export const DEFAULT_RESTAURANTS = [];
export const DEMO_IDS = ["demo-1", "demo-2", "demo-3"];

export const CATEGORY_IMAGES = {
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

export const POA_CATALOG = [
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

export const CATEGORIA_EMOJI = {
  "Hambúrguer":"🍔","Pizza":"🍕","Italiano":"🍝","Japonês":"🍣","Café":"☕",
  "Pub":"🍺","Carnes":"🥩","Brasileiro":"🇧🇷","Vegetariano":"🥗","Doceria":"🍰","Outro":"🍽️"
};

// CONSTANTES
export const DELAY_MAP_RENDER = 60;
export const DELAY_CLOUD_SYNC = 800;
export const INTERVAL_FIREWORKS = 2400;

export const MODAL_IDS = {
  detail: "modal-detail",
  add: "modal-add",
  menu: "modal-menu",
  stats: "modal-stats",
  confirm: "modal-confirm"
};

export const CSS_CLASSES = {
  modalActive: "active",
  modalOpen: "modal-open"
};

// ESTADO GLOBAL
export let restaurants = [];
export let currentFilter = "todos";
export let currentSearch = "";
export let currentSort = "recent";
export let currentCategoria = "";
export let currentBairro = "";
export let currentView = "list";
export let _modalObserver = null;
export let _introDone = false;
export let _map = null;
export let _markers = {};
export let _markerLayer = null;
export let _modalCloseListener = null;
export let _pushTimer = null;
export let _nominatimTimer = null;
export let _nominatimToken = 0;
export let _mapTimer = null;
export let _gmapsLoader = null;
export let _smartExtra = null;
export let _sb = null;

// Setters para atualizar estado
export function setRestaurants(data) { restaurants = data; }
export function setCurrentFilter(val) { currentFilter = val; }
export function setCurrentSearch(val) { currentSearch = val; }
export function setCurrentView(val) { currentView = val; }
