import "./globals.css";

export const metadata = {
  title: "Prisma Investments — Dashboard",
  description: "Gestão de gastos e investimentos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-bg text-light antialiased">{children}</body>
    </html>
  );
}
