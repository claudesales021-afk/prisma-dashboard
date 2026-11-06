"use client";
import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react";

const brl = (n) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Lista no estilo de extrato de app bancário.
export default function TransactionsTable({ rows, onDelete }) {
  if (!rows.length) {
    return (
      <div className="text-center text-muted text-sm py-10">
        Nenhuma transação encontrada.
      </div>
    );
  }
  return (
    <ul className="divide-y divide-border">
      {rows.map((t) => {
        const isIn = t.tipo === "entrada";
        return (
          <li key={t.id} className="flex items-center gap-3 py-3">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
              ${isIn ? "bg-mist text-prisma" : "bg-bg text-muted"}`}>
              {isIn ? <ArrowDownLeft size={18} strokeWidth={1.8} /> : <ArrowUpRight size={18} strokeWidth={1.8} />}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-ink truncate">{t.descricao}</div>
              <div className="text-xs text-muted">{t.data}</div>
            </div>
            <div className={`text-sm font-semibold whitespace-nowrap ${isIn ? "text-success" : "text-ink"}`}>
              {isIn ? "+" : "-"} {brl(t.valor)}
            </div>
            <button
              onClick={() => onDelete(t.id)}
              className="w-8 h-8 -mr-1 rounded-full flex items-center justify-center text-silver hover:text-muted active:text-danger active:bg-danger/10 transition"
              aria-label={`Excluir ${t.descricao}`}
            >
              <Trash2 size={15} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
