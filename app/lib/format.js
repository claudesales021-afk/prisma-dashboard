export const brl = (n) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const pct = (n) =>
  n.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";

// Cores das categorias nos gráficos (azul, azul claro, grafite, prata).
export const CORES_CATEGORIA = ["#2B96D3", "#9ED3F2", "#2A2F3A", "#D6DAE1"];

// Agrupa os investimentos por categoria, do maior para o menor total.
export function agruparPorCategoria(investimentos) {
  const mapa = new Map();
  for (const it of investimentos) {
    const g = mapa.get(it.categoria) ?? { categoria: it.categoria, ativos: [], total: 0 };
    g.ativos.push(it);
    g.total += it.valor;
    mapa.set(it.categoria, g);
  }
  return [...mapa.values()]
    .sort((a, b) => b.total - a.total)
    .map((g, i) => ({ ...g, cor: CORES_CATEGORIA[i % CORES_CATEGORIA.length] }));
}
