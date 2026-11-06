"use client";
import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { brl } from "../../lib/format";
import { SectionTitle, Card, Segmented } from "../ui";
import TransactionsTable from "../TransactionsTable";

const FILTROS = [
  { id: "todas",   label: "Todas" },
  { id: "entrada", label: "Entradas" },
  { id: "saida",   label: "Saídas" },
];

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// "03/11/2026" -> "Novembro 2026"
const mesDe = (data) => {
  const [, m, a] = data.split("/");
  return `${MESES[Number(m) - 1]} ${a}`;
};

export default function Transacoes({ transacoes, search, hidden, onDelete }) {
  const [filtro, setFiltro] = useState("todas");

  const buscadas = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? transacoes.filter((t) => t.descricao.toLowerCase().includes(q)) : transacoes;
  }, [transacoes, search]);

  const entradas = buscadas.filter((t) => t.tipo === "entrada").reduce((s, t) => s + t.valor, 0);
  const saidas   = buscadas.filter((t) => t.tipo === "saida").reduce((s, t) => s + t.valor, 0);

  const grupos = useMemo(() => {
    const rows = filtro === "todas" ? buscadas : buscadas.filter((t) => t.tipo === filtro);
    const mapa = new Map();
    for (const t of rows) {
      const k = mesDe(t.data);
      if (!mapa.has(k)) mapa.set(k, []);
      mapa.get(k).push(t);
    }
    return [...mapa.entries()];
  }, [buscadas, filtro]);

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted -mt-1">Histórico recente</p>

      <div className="grid grid-cols-2 gap-3">
        <Resumo icon={ArrowDownLeft} label="Entradas" valor={entradas} hidden={hidden} tom="text-success" />
        <Resumo icon={ArrowUpRight}  label="Saídas"   valor={saidas}   hidden={hidden} tom="text-ink" />
      </div>

      <Segmented options={FILTROS} value={filtro} onChange={setFiltro} />

      {grupos.length === 0 ? (
        <Card className="text-center text-muted text-sm py-10">Nenhuma transação encontrada.</Card>
      ) : (
        grupos.map(([mes, rows]) => (
          <Card key={mes} className="px-4 pt-4 pb-1">
            <SectionTitle right={<span className="text-xs text-muted">{rows.length} item(ns)</span>}>{mes}</SectionTitle>
            <TransactionsTable rows={rows} onDelete={onDelete} />
          </Card>
        ))
      )}
    </div>
  );
}

function Resumo({ icon: Icon, label, valor, hidden, tom }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="w-7 h-7 rounded-full bg-mist text-prisma flex items-center justify-center">
          <Icon size={14} strokeWidth={1.8} />
        </span>
        {label}
      </div>
      <div className={`text-base font-semibold mt-3 tracking-tight truncate ${tom}`}>
        {hidden ? "R$ ••••" : brl(valor)}
      </div>
    </Card>
  );
}
