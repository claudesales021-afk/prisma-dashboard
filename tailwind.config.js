/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta suave: prata + azul claro
        deep:    "#C9CCD4",  // prata — fundo atrás da moldura (desktop)
        bg:      "#F3F4F7",  // fundo da tela do app
        card:    "#FFFFFF",  // superfícies
        border:  "#E3E6EC",  // bordas e divisores
        silver:  "#D6DAE1",  // prata médio (detalhes, gradiente)
        mist:    "#E7F3FB",  // azul bem claro (tons de fundo)
        sky:     "#9ED3F2",  // azul claro
        prisma:  "#2B96D3",  // azul de destaque (botões, aba ativa)
        prismaHover: "#2083BC",
        ink:     "#2A2F3A",  // texto principal
        muted:   "#737A88",  // texto secundário
        success: "#2F9E73",
        danger:  "#D95C5C",
      },
      keyframes: {
        "slide-up":   { from: { transform: "translateY(100%)" }, to: { transform: "translateY(0)" } },
        "slide-down": { from: { transform: "translateY(-120%)", opacity: 0 }, to: { transform: "translateY(0)", opacity: 1 } },
        "fade-in":    { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        "slide-up":   "slide-up 260ms cubic-bezier(0.32, 0.72, 0, 1)",
        "slide-down": "slide-down 260ms cubic-bezier(0.32, 0.72, 0, 1)",
        "fade-in":    "fade-in 160ms ease-out",
      },
      boxShadow: {
        soft:  "0 1px 2px rgba(42,47,58,0.04), 0 4px 16px -4px rgba(42,47,58,0.08)",
        phone: "0 30px 70px -20px rgba(42,47,58,0.35)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
