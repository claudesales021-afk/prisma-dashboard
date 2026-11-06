"use client";
import { useMemo } from "react";
import { Plus, TrendingUp, ChevronRight } from "lucide-react";
import { brl, pct, agruparPorCategoria } from "../../lib/format";
import { SectionTitle, Card, HeroCard } from "../ui";

export default function Carteira({ data, hidden, onNovoInvestimento, onToast }) {
  const grupos = useMemo(() => agruparPorCategoria(data.investimentos), [data.investimentos]);
  const total = grupos.reduce((s, g) => s + g.total, 0) || 1;

  return (
    <div className="space-y-5">
      <HeroCard
        label="Patrimônio total"
        value={brl(data.investido)}
        hidden={hidden}
        chip={<><TrendingUp size={12} /> +1.8% este mês · +R$ 815,00</>}
      >
        <p className="text-xs text-muted mt-3">Total investido em todos os ativos</p>
      </HeroCard>

      {/* Alocação */}
      <Card className="p-4">
        <SectionTitle>Alocação</SectionTitle>
        <div className="flex h-2.5 rounded-full overflow-hidden bg-bg mt-4 gap-0.5">
          {grupos.map((g) => (
            <div key={g.categoria} style={{ width: `${(g.total / total) * 100}%`, background: g.cor }} />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
          {grupos.map((g) => (
            <li key={g.categoria} className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: g.cor }} />
              {g.categoria} <span className="text-ink font-medium">{pct((g.total / total) * 100)}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Investimentos por tipo */}
      <div>
        <SectionTitle>Investimentos por tipo</SectionTitle>
        <div className="space-y-3 mt-3">
          {grupos.map((g) => (
            <Card key={g.categoria} className="px-4 pt-4 pb-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.cor }} />
                    <span className="font-semibold text-ink">{g.categoria}</span>
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    {g.ativos.map((a) => a.nome).join(", ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-ink">{hidden ? "R$ ••••" : brl(g.total)}</div>
                  <div className="text-[11px] text-muted">{pct((g.total / total) * 100)} da carteira</div>
                </div>
              </div>
              <ul className="divide-y divide-border mt-3 border-t border-border">
                {g.ativos.map((a) => (
                  <li key={a.id}>
                    <button
                      onClick={() => onToast?.({ kind: "info", msg: `Detalhes de ${a.nome} em breve.` })}
                      className="w-full flex items-center gap-3 py-3 text-left active:opacity-70 transition"
                    >
                      <span className="flex-1 min-w-0 text-sm text-ink truncate">{a.nome}</span>
                      <span className="text-sm font-medium text-ink">{hidden ? "••••" : brl(a.valor)}</span>
                      <span className="text-[11px] font-medium text-success w-11 text-right">{a.variacao}</span>
                      <ChevronRight size={16} className="text-silver" />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <button
        onClick={onNovoInvestimento}
        className="w-full flex items-center justify-center gap-2 bg-prisma hover:bg-prismaHover text-white rounded-2xl py-3.5 text-sm font-semibold shadow-soft active:scale-[0.98] transition"
      >
        <Plus size={18} /> Novo investimento
      </button>
    </div>
  );
}
