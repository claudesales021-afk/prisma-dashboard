"use client";
import { useMemo } from "react";
import { Download, Mail } from "lucide-react";
import { brl, pct, agruparPorCategoria } from "../../lib/format";
import { SectionTitle, Card, Donut } from "../ui";

export default function Relatorios({ data, hidden, onToast }) {
  const grupos = useMemo(() => agruparPorCategoria(data.investimentos), [data.investimentos]);
  const totalInvest = grupos.reduce((s, g) => s + g.total, 0);

  const entradas = data.transacoes.filter((t) => t.tipo === "entrada").reduce((s, t) => s + t.valor, 0);
  const saidas   = data.transacoes.filter((t) => t.tipo === "saida").reduce((s, t) => s + t.valor, 0);
  const liquido  = entradas - saidas;
  const maxFluxo = Math.max(entradas, saidas, 1);

  const v = (n) => (hidden ? "R$ ••••" : brl(n));

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted -mt-1">Resumo da sua carteira e movimentações</p>

      {/* Distribuição */}
      <Card className="p-4">
        <SectionTitle>Distribuição da carteira</SectionTitle>
        <div className="flex justify-center my-5">
          <Donut
            fatias={grupos.map((g) => ({ id: g.categoria, valor: g.total, cor: g.cor, titulo: `${g.categoria}: ${brl(g.total)}` }))}
            centro={
              <>
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted">Total</span>
                <span className="text-base font-semibold text-ink mt-0.5">{v(totalInvest)}</span>
              </>
            }
          />
        </div>
        <ul className="divide-y divide-border border-t border-border">
          {grupos.map((g) => (
            <li key={g.categoria} className="flex items-center gap-3 py-3">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: g.cor }} />
              <span className="flex-1 text-sm text-ink">{g.categoria}</span>
              <span className="text-sm text-muted">{v(g.total)}</span>
              <span className="text-sm font-semibold text-ink w-14 text-right">
                {pct(totalInvest ? (g.total / totalInvest) * 100 : 0)}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Fluxo */}
      <Card className="p-4">
        <SectionTitle>Entradas e saídas</SectionTitle>
        <div className="space-y-4 mt-4">
          <Barra label="Entradas" valor={entradas} max={maxFluxo} cor="bg-prisma" texto={v(entradas)} />
          <Barra label="Saídas" valor={saidas} max={maxFluxo} cor="bg-silver" texto={v(saidas)} />
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <span className="text-sm text-muted">Resultado líquido</span>
          <span className={`text-base font-semibold ${liquido >= 0 ? "text-success" : "text-danger"}`}>
            {hidden ? "R$ ••••" : `${liquido >= 0 ? "+" : "-"} ${brl(Math.abs(liquido))}`}
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onToast?.({ kind: "success", msg: "Relatório exportado em PDF." })}
          className="flex items-center justify-center gap-2 bg-card border border-border text-ink rounded-2xl py-3.5 text-sm font-semibold shadow-soft active:scale-[0.98] transition"
        >
          <Download size={16} /> Exportar
        </button>
        <button
          onClick={() => onToast?.({ kind: "success", msg: "Relatório enviado para o seu e-mail." })}
          className="flex items-center justify-center gap-2 bg-prisma hover:bg-prismaHover text-white rounded-2xl py-3.5 text-sm font-semibold shadow-soft active:scale-[0.98] transition"
        >
          <Mail size={16} /> Enviar por e-mail
        </button>
      </div>
    </div>
  );
}

function Barra({ label, valor, max, cor, texto }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-muted">{label}</span>
        <span className="font-medium text-ink">{texto}</span>
      </div>
      <div className="h-2.5 rounded-full bg-bg overflow-hidden">
        <div className={`h-full rounded-full ${cor} transition-[width] duration-500`} style={{ width: `${(valor / max) * 100}%` }} />
      </div>
    </div>
  );
}
