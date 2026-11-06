# Prisma Investments — Dashboard

Dashboard web em Next.js 14 (App Router) + Tailwind CSS para o aplicativo Prisma Investments.
Paleta Ocean Blue, componentes com estado real (sem botão decorativo).

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

- `npm run dev` — modo desenvolvimento
- `npm run build` — build de produção
- `npm start` — servir o build
- `npm run lint` — ESLint

## Deploy na Vercel (CI/CD)

1. Suba o código para o GitHub (ver passo a passo abaixo).
2. Acesse https://vercel.com/new
3. Clique em **Import Git Repository** e selecione `prisma-dashboard`
4. Vercel detecta Next.js automaticamente — deixe os campos padrão:
   - Framework Preset: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Clique em **Deploy**. Cada `git push` na branch `main` gera um deploy novo automaticamente.

## Enviar para o GitHub

```bash
git init
git add .
git commit -m "feat: dashboard inicial do Prisma Investments"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/prisma-dashboard.git
git push -u origin main
```

## Estrutura

```
app/
  layout.jsx           # layout raiz (html/body)
  page.jsx             # Dashboard Home (estado global, modais, handlers)
  globals.css          # Tailwind + Inter
  components/
    DashboardLayout.jsx
    Sidebar.jsx
    Header.jsx
    StatCard.jsx
    TransactionsTable.jsx
    InvestmentsList.jsx
    Modal.jsx
    Toast.jsx
```

## Paleta Ocean Blue

| Token          | Hex        | Uso                            |
|----------------|------------|--------------------------------|
| `bg`           | `#03045E`  | Fundo da página                |
| `card`         | `#023E8A`  | Superfície elevada             |
| `border`       | `#0077B6`  | Bordas e separadores           |
| `prisma`       | `#00B4D8`  | Accent principal (CTA, ativo)  |
| `prismaHover`  | `#0096C7`  | Hover do accent                |
| `info`         | `#48CAE4`  | Informações                    |
| `muted`        | `#90E0EF`  | Texto secundário               |
| `light`        | `#CAF0F8`  | Texto principal                |
| `success`      | `#10B981`  | Depósitos, confirmações        |
| `danger`       | `#EF4444`  | Saques, erros                  |
