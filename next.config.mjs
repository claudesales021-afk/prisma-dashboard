// No GitHub Pages o site fica em /prisma-dashboard; localmente continua em "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // gera HTML estático em out/ (necessário para o GitHub Pages)
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
