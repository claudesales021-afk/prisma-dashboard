// Rota estática (em vez de app/manifest.js) para o link respeitar o basePath do GitHub Pages.
// Manifesto PWA: permite "Adicionar à tela de início" e abrir em tela cheia como app.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify({
    name: "Prisma Investments",
    short_name: "Prisma",
    description: "Gestão de gastos e investimentos",
    lang: "pt-BR",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#F3F4F7",
    theme_color: "#F3F4F7",
    icons: [
      { src: `${base}/icons/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${base}/icons/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${base}/icons/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }), { headers: { "Content-Type": "application/manifest+json" } });
}
