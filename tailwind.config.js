/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Ocean Blue palette
        bg:      "#03045E",  // Deep Twilight — fundo principal
        card:    "#023E8A",  // French Blue — superfície elevada
        border:  "#0077B6",  // Bright Teal Blue — bordas e dividers
        prisma:  "#00B4D8",  // accent principal (botões, aba ativa)
        prismaHover: "#0096C7",
        info:    "#48CAE4",
        muted:   "#90E0EF",  // texto secundário em fundo escuro
        light:   "#CAF0F8",
        success: "#10B981",
        danger:  "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
