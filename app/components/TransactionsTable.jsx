"use client";
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from "lucide-react";

const brl = (n) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TransactionsTable({ rows, onDelete }) {
  if (!rows.length) {
    return (
      <div className="text-center text-muted text-sm py-10">
        Nenhuma transação encontrada.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted border-b border-border">
            <th className="py-2 px-3 font-semibold">Tipo</th>
            <th className="py-2 px-3 font-semibold">Descrição</th>
            <th className="py-2 px-3 font-semibold">Data</th>
            <th className="py-2 px-3 font-semibold text-right">Valor</th>
            <th className="py-2 px-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => {
            const isIn = t.tipo === "entrada";
            return (
              <tr key={t.id} className="border-b border-border/60 hover:bg-white/5 transition">
                <td className="py-3 px-3">
                  {isIn
                    ? <ArrowDownCircle size={18} className="text-success" />
                    : <ArrowUpCircle size={18} className="text-danger" />}
                </td>
                <td className="py-3 px-3">{t.descricao}</td>
                <td className="py-3 px-3 text-muted">{t.data}</td>
                <td className={`py-3 px-3 text-right font-bold ${isIn ? "text-success" : "text-danger"}`}>
                  {isIn ? "+" : "-"} {brl(t.valor)}
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-muted hover:text-danger p-1 rounded hover:bg-border/40 transition"
                    aria-label={`Excluir ${t.descricao}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
