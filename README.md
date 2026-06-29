# 🍷 RolêPOA — Seu Guia Gastronômico de Porto Alegre

**Portal web responsivo** para descobrir, avaliar e compartilhar os melhores restaurantes de POA.

---

## 🚀 Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor local (porta 5500)
node config/.serve.js

# 3. Abrir no navegador
# http://127.0.0.1:5500

# 4. Rodar testes E2E
npm run test:e2e
npm run test:e2e:headed  # Com interface do navegador
npm run test:e2e:ui      # UI interativa
```

---

## 📁 Estrutura do Projeto

```
PROJETO ROLÊPOA/
│
├─ 📂 src/                    # 🔧 Código-fonte
│  ├─ app.js                 # Inicializa a aplicação
│  ├─ api.js                 # Integração com Supabase
│  ├─ rendering.js           # Renderização de componentes
│  ├─ ratings.js             # Gerenciamento de avaliações
│  ├─ ui.js                  # Lógica de UI/interação
│  ├─ state.js               # Estado global da app
│  ├─ sw.js                  # Service Worker (PWA)
│  ├─ utils.js               # Utilitários gerais
│  └─ utils/                 # Funções auxiliares específicas
│
├─ 📂 public/                 # 📄 Assets servidos
│  ├─ index.html             # Página principal
│  ├─ style.css              # Estilos globais
│  ├─ manifest.json          # Configuração PWA
│  └─ assets/
│     ├─ icons/              # Icons do app (192px, 512px)
│     ├─ images/             # Imagens de conteúdo
│     └─ backgrounds/        # Fundos e texturas
│
├─ 📂 tests/                  # 🧪 Testes automatizados
│  ├─ e2e/                   # Testes End-to-End (Playwright)
│  ├─ unit/                  # Testes unitários
│  ├─ fixtures/              # Dados de teste
│  └─ test-notifications.html
│
├─ 📂 config/                 # ⚙️ Configurações
│  ├─ .serve.js              # Servidor local
│  ├─ playwright.config.js   # Config Playwright
│  ├─ netlify.toml           # Deploy (Netlify)
│  └─ skills-lock.json       # Claude Code skills
│
├─ 📂 docs/                   # 📚 Documentação
│  ├─ audits/                # Audits de design/performance
│  └─ screenshots/           # Capturas de tela
│
├─ 📂 .cache/                 # 🗑️ Arquivos temporários (não commitados)
│  ├─ playwright-report/     # Relatório dos testes
│  ├─ test-results/          # Resultados dos testes
│  └─ server.log             # Log do servidor
│
├─ 📂 .github/                # 🔄 CI/CD Workflows
│
├─ 📂 mobile/                 # 📱 App mobile (Expo)
│
├─ 📂 .agents/                # 🤖 Claude Code skills (não commitado)
│
└─ 📄 Arquivo raiz
   ├─ package.json           # Dependências npm
   ├─ package-lock.json      # Lock de versões
   ├─ .gitignore             # Arquivos ignorados
   ├─ README.md              # Você está aqui
   └─ STRUCTURE.md           # Detalhes da estrutura
```

---

## 🛠️ Stack Tecnológico

| Categoria | Tecnologia |
|-----------|-----------|
| **Frontend** | Vanilla JS (sem frameworks) |
| **Estilo** | CSS3 (Grid, Flexbox, Animations) |
| **Backend** | Supabase (PostgreSQL + realtime) |
| **Mapa** | Leaflet.js |
| **PWA** | Service Worker |
| **Testes** | Playwright (E2E) |
| **Deploy** | Netlify |

---

## 📋 Funcionalidades

- ✅ Catálogo de restaurantes (filtro por categoria, bairro)
- ✅ Sistema de avaliações (ratings com comentários)
- ✅ Mapa interativo (Leaflet)
- ✅ Busca em tempo real
- ✅ Modo offline (PWA/Service Worker)
- ✅ Adicionar restaurante próprio
- ✅ Sincronização automática com nuvem

---

## 🧪 Testes

### Rodar testes E2E

```bash
# Headless (CI/CD)
npm run test:e2e

# Com navegador visível
npm run test:e2e:headed

# Interface interativa
npm run test:e2e:ui
```

Os relatórios são salvos em `.cache/playwright-report/`

---

## 🌐 Deploy

A app está configurada para deploy automático no Netlify.

```bash
# Build para produção
npm run build  # (se houver)

# Preview local do build
npm run preview  # (se houver)
```

---

## 📚 Documentação Adicional

- **[STRUCTURE.md](./STRUCTURE.md)** — Detalhes da estrutura de pastas
- **[docs/audits/](./docs/audits/)** — Audits de design e performance
- **[docs/screenshots/](./docs/screenshots/)** — Screenshots e mockups

---

## 👨‍💻 Desenvolvimento

### Adicionar nova funcionalidade

1. Criar branch: `git checkout -b feature/minha-feature`
2. Desenvolver em `src/`
3. Adicionar testes em `tests/`
4. Commit: `git commit -m "feat: descrição"`
5. Push e abrir PR

### Padrões de código

- Usar `const` por padrão
- Comentários apenas para WHY, não WHAT
- Nomes descritivos em português/inglês (consistente)
- Testar no navegador antes de commitar

---

## 🐛 Issues e Bugs

Encontrou um bug? Reporte em: [Issues](../../issues)

---

## 📄 Licença

MIT — Veja [LICENSE](./LICENSE) para detalhes

---

## 🙋 Contato

📧 [marcelinhu0@gmail.com](mailto:marcelinhu0@gmail.com)

**Desenvolvido com ❤️ para Porto Alegre** 🍷
