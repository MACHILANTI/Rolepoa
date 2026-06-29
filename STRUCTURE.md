# 📁 Estrutura do Projeto RolêPOA — v2.0 (Profissional)

## 🎯 Visão Geral

Estrutura **limpa, profissional e escalável** com separação clara entre código, configuração, testes, cache e documentação.

---

## 📂 Organização Detalhada

### 🔧 `src/` — Código-fonte
```
src/
├── app.js          # 🚀 Inicializa a aplicação
├── api.js          # 🌐 Integração com Supabase
├── rendering.js    # 🎨 Renderização de componentes
├── ratings.js      # ⭐ Gerenciamento de avaliações
├── ui.js           # 🖱️  Lógica de UI/interações
├── state.js        # 📦 Estado global
├── sw.js           # 🔄 Service Worker (PWA)
├── utils.js        # 🛠️  Utilitários gerais
├── utils/          # Funções específicas
├── core/           # Core business logic
└── [novos módulos]
```

### 📄 `public/` — Assets estáticos
```
public/
├── index.html             # Página principal HTML
├── style.css              # Estilos globais CSS
├── manifest.json          # Configuração PWA
└── assets/
    ├── icons/             # Icons do app
    │  ├── icon-192.png
    │  └── icon-512.png
    ├── images/            # Imagens de conteúdo
    └── backgrounds/       # Fundos e texturas
        └── welcome_bg.png
```

### 🧪 `tests/` — Testes automatizados
```
tests/
├── e2e/                   # Testes End-to-End (Playwright)
├── unit/                  # Testes unitários
├── fixtures/              # Dados de teste
└── test-notifications.html
```

### ⚙️ `config/` — Configurações
```
config/
├── .serve.js              # Servidor local (porta 5500)
├── playwright.config.js   # Config Playwright E2E
├── netlify.toml           # Deploy (Netlify)
└── skills-lock.json       # Claude Code skills
```

### 📚 `docs/` — Documentação
```
docs/
├── audits/                # Audits de design/performance
│  └── DESIGN_AUDIT_CHANGES.md
└── screenshots/           # Capturas de tela & mockups
   ├── screenshot.mjs
   ├── screenshot-desktop.png
   ├── screenshot-welcome.mjs
   └── screenshot-welcome.png
```

### 🗑️ `.cache/` — Cache & temporários (não commitado)
```
.cache/
├── playwright-report/     # Relatórios dos testes
├── test-results/          # Resultados dos testes
└── server.log             # Log do servidor local
```

### 📱 `mobile/` — App mobile
```
mobile/
├── app.json
├── package.json
├── src/
└── [estrutura Expo]
```

### 🔄 `.github/` — CI/CD
```
.github/
├── workflows/
│  ├── test.yml
│  └── deploy.yml
└── [outras configs]
```

---

## 🔄 Migrations Executadas

| Anterior | Novo Caminho | Tipo |
|----------|--------------|------|
| `app.js` | `src/app.js` | Código |
| `api.js` | `src/api.js` | Código |
| `rendering.js` | `src/rendering.js` | Código |
| `ratings.js` | `src/ratings.js` | Código |
| `ui.js` | `src/ui.js` | Código |
| `state.js` | `src/state.js` | Código |
| `sw.js` | `src/sw.js` | Código |
| `utils.js` | `src/utils.js` | Código |
| `index.html` | `public/index.html` | Asset |
| `style.css` | `public/style.css` | Asset |
| `manifest.json` | `public/manifest.json` | Asset |
| `icon-192.png` | `public/assets/icons/icon-192.png` | Asset |
| `icon-512.png` | `public/assets/icons/icon-512.png` | Asset |
| `welcome_bg.png` | `public/assets/backgrounds/welcome_bg.png` | Asset |
| `playwright.config.js` | `config/playwright.config.js` | Config |
| `.serve.js` | `config/.serve.js` | Config |
| `netlify.toml` | `config/netlify.toml` | Config |
| `skills-lock.json` | `.config/skills-lock.json` | Config |
| `DESIGN_AUDIT_CHANGES.md` | `docs/audits/DESIGN_AUDIT_CHANGES.md` | Docs |
| `screenshot-*.png` | `docs/screenshots/` | Docs |
| `screenshot-*.mjs` | `docs/screenshots/` | Docs |
| `test-notifications.html` | `tests/test-notifications.html` | Test |
| `playwright-report/` | `.cache/playwright-report/` | Temp |
| `test-results/` | `.cache/test-results/` | Temp |
| `server.log` | `.cache/server.log` | Temp |

---

## ⚙️ Configurações Atualizadas

### `package.json`
```json
{
  "main": "src/app.js"
}
```

### `config/.serve.js`
```javascript
const root = path.join(__dirname, "..", "public");
```

### `public/index.html`
```html
<script src="../src/app.js"></script>
<link rel="apple-touch-icon" href="assets/icons/icon-192.png">
```

### `.gitignore` (atualizado)
```
# Pastas ignoradas
mobile/
.ui-backup/
.cache/
node_modules/

# Configurações locais
.config/netlify.toml
.config/skills-lock.json

# Claude Code
.agents/
.superpowers/

# Logs
*.log
```

---

## 🚀 Como Executar

```bash
# 1️⃣ Instalar dependências
npm install

# 2️⃣ Rodar servidor local (porta 5500)
node config/.serve.js

# 3️⃣ Abrir no navegador
# http://127.0.0.1:5500

# 4️⃣ Rodar testes
npm run test:e2e                # Headless
npm run test:e2e:headed         # Com navegador
npm run test:e2e:ui             # Interface interativa
```

---

## 📋 Checklist de Qualidade

✅ **Pastas organizadas por responsabilidade**
- `src/` = Código
- `public/` = Assets
- `tests/` = Testes
- `config/` = Configurações
- `docs/` = Documentação
- `.cache/` = Temporários

✅ **Raiz limpa** (apenas package.json, .gitignore, README, etc)

✅ **Referências atualizadas** (HTML, imports, paths)

✅ **Documentação completa** (README.md + STRUCTURE.md)

✅ **Cache separado** (`.cache/` no .gitignore)

---

## 🎯 Próximas Melhorias

- [ ] Adicionar scripts em `scripts/`
- [ ] Criar testes em `tests/e2e/` e `tests/unit/`
- [ ] Expandir `src/utils/` conforme necessário
- [ ] Adicionar CI/CD em `.github/workflows/`
- [ ] Documentação de componentes em `docs/`

---

## 💡 Dicas

1. **Novos arquivos JS?** → Coloque em `src/`
2. **Novos assets?** → Coloque em `public/assets/[tipo]/`
3. **Documentação?** → Coloque em `docs/`
4. **Testes?** → Coloque em `tests/`
5. **Logs/cache?** → Serão em `.cache/` automaticamente

**Mantenha a raiz limpa! 🧹**
