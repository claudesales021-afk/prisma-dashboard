# Prisma Investments — App

Aplicativo web (PWA) em Next.js 14 (App Router) + Tailwind CSS para o Prisma Investments.
Visual de app mobile minimalista, em prata e azul claro. Pode ser instalado na tela inicial do celular.

**No ar:** https://claudesales021-afk.github.io/prisma-dashboard/

## Instalar no celular

- **iPhone:** abra o link no Safari → Compartilhar → **Adicionar à Tela de Início**
- **Android:** abra o link no Chrome → menu ⋮ → **Instalar app**

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Deploy

Cada `git push` na branch `main` publica automaticamente no GitHub Pages
(workflow em `.github/workflows/deploy.yml`). O build é um export estático (`out/`)
servido em `/prisma-dashboard`, definido pela variável `NEXT_PUBLIC_BASE_PATH`.

## Telas

Início · Carteira · Transações · Relatórios · Ajustes (FAQ, alterar senha, sair)

## Estrutura

```
app/
  layout.jsx                 # layout raiz, metadados PWA
  page.jsx                   # estado global, tela Início, modais
  manifest.webmanifest/      # manifesto PWA
  components/
    DashboardLayout.jsx      # moldura do app, cabeçalho, abas, avisos
    Header.jsx  BottomNav.jsx  Modal.jsx  Toast.jsx
    StatCard.jsx  TransactionsTable.jsx  InvestmentsList.jsx
    ui.jsx                   # Card, SectionTitle, HeroCard, Segmented, Donut
    RegisterSW.jsx           # registra o service worker
    screens/                 # Carteira, Transacoes, Relatorios, Ajustes
  lib/format.js              # formatação de valores e agrupamentos
public/
  icons/  sw.js
```

## Paleta

| Token     | Hex       | Uso                              |
|-----------|-----------|----------------------------------|
| `deep`    | `#C9CCD4` | Prata — fundo atrás da moldura   |
| `bg`      | `#F3F4F7` | Fundo da tela                    |
| `card`    | `#FFFFFF` | Superfícies                      |
| `border`  | `#E3E6EC` | Bordas e divisores               |
| `silver`  | `#D6DAE1` | Prata médio                      |
| `mist`    | `#E7F3FB` | Azul bem claro                   |
| `sky`     | `#9ED3F2` | Azul claro                       |
| `prisma`  | `#2B96D3` | Destaque (botões, aba ativa)     |
| `ink`     | `#2A2F3A` | Texto principal                  |
| `muted`   | `#737A88` | Texto secundário                 |
| `success` | `#2F9E73` | Entradas, rendimentos            |
| `danger`  | `#D95C5C` | Erros                            |
