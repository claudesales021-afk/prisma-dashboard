"use client";
import { TrendingUp, Landmark, BarChart3, Shapes } from "lucide-react";

const brl = (n) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ICONE = { "Fundos": BarChart3, "Renda Fixa": Landmark };

export default function InvestmentsList({ items }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((it) => {
        const Icon = ICONE[it.categoria] ?? Shapes;
        return (
          <li key={it.id} className="flex items-center gap-3 py-3">
            <span className="w-10 h-10 rounded-xl bg-mist text-prisma flex items-center justify-center shrink-0">
              <Icon size={18} strokeWidth={1.8} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-ink truncate">{it.nome}</div>
              <div className="text-xs text-muted">{it.categoria}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-ink">{brl(it.valor)}</div>
              <div className="text-[11px] text-success font-medium flex items-center gap-1 justify-end">
                <TrendingUp size={11} /> {it.variacao}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
