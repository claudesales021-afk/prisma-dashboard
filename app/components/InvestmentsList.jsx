"use client";
import { TrendingUp } from "lucide-react";

const brl = (n) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InvestmentsList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li
          key={it.id}
          className="flex items-center justify-between bg-bg/40 border border-border/60 rounded-xl px-4 py-3"
        >
          <div>
            <div className="font-bold text-sm">{it.nome}</div>
            <div className="text-xs text-muted">{it.categoria}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-prisma">{brl(it.valor)}</div>
            <div className="text-xs text-success flex items-center gap-1 justify-end">
              <TrendingUp size={12} /> {it.variacao}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
