import "./globals.css";
import RegisterSW from "./components/RegisterSW";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata = {
  title: "Prisma Investments — Dashboard",
  description: "Gestão de gastos e investimentos",
  applicationName: "Prisma",
  // Declarado aqui porque o Next 14 não aplica o basePath ao link automático do manifesto.
  manifest: `${base}/manifest.webmanifest`,
  appleWebApp: { capable: true, title: "Prisma", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F3F4F7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-bg md:bg-deep text-ink antialiased">
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
