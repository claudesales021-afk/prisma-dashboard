// Manifesto PWA: permite "Adicionar à tela de início" e abrir em tela cheia como app.
export default function manifest() {
  return {
    name: "Prisma Investments",
    short_name: "Prisma",
    description: "Gestão de gastos e investimentos",
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F3F4F7",
    theme_color: "#F3F4F7",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
