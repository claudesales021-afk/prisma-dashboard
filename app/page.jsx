"use client";
import { useRef, useMemo, useState } from "react";
import { Plus, Download, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import DashboardLayout from "./components/DashboardLayout";
import StatCard from "./components/StatCard";
import TransactionsTable from "./components/TransactionsTable";
import InvestmentsList from "./components/InvestmentsList";
import Modal from "./components/Modal";

const PERIODOS = [
  { id: "7d",  label: "7D"  },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
  { id: "1a",  label: "1A"  },
];

const DADOS_INICIAIS = {
  saldo: 12450.0,
  investido: 14250.0,
  variacaoMes: 448.2,
  transacoesMes: 18,
  transacoes: [
    { id: 1, tipo: "entrada", descricao: "Depósito",      valor: 1000,    data: "03/11/2026" },
    { id: 2, tipo: "saida",   descricao: "Saque",         valor: 250,     data: "02/11/2026" },
    { id: 3, tipo: "entrada", descricao: "Rendimento CDB",valor: 38.2,    data: "28/10/2026" },
    { id: 4, tipo: "entrada", descricao: "Depósito",      valor: 5000,    data: "22/10/2026" },
    { id: 5, tipo: "saida",   descricao: "Transferência", valor: 187.5,   data: "15/10/2026" },
  ],
  investimentos: [
    { id: 1, nome: "Fundo Prisma FIA", categoria: "Fundos",     valor: 1250,  variacao: "+2.5%" },
    { id: 2, nome: "CDB Banco Inter",  categoria: "Renda Fixa", valor: 5000,  variacao: "+0.9%" },
    { id: 3, nome: "Tesouro IPCA+",    categoria: "Renda Fixa", valor: 8000,  variacao: "+1.4%" },
  ],
};

const brl = (n) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch]       = useState("");
  const [periodo, setPeriodo]     = useState("30d");
  const [hideBalance, setHideBalance] = useState(false);

  const [data, setData] = useState(DADOS_INICIAIS);

  const [modal, setModal] = useState(null);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const toastRef = useRef(null);
  const toast = (t) => toastRef.current?.(t);

  const limites = { "7d": 2, "30d": 5, "90d": 5, "1a": 5 };

  const transacoesFiltradas = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = data.transacoes.slice(0, limites[periodo]);
    if (q) rows = rows.filter((t) => t.descricao.toLowerCase().includes(q));
    return rows;
  }, [data.transacoes, search, periodo]);

  const resetModal = () => { setModal(null); setValor(""); setDescricao(""); };

  const submitTransacao = (tipo) => {
    const v = parseFloat(String(valor).replace(".", "").replace(",", "."));
    if (isNaN(v) || v <= 0) {
      toast({ kind: "error", msg: "Digite um valor válido." });
      return;
    }
    if (tipo === "saida" && v > data.saldo) {
      toast({ kind: "error", msg: "Saldo insuficiente." });
      return;
    }
    const nova = {
      id: Date.now(),
      tipo,
      descricao: descricao.trim() || (tipo === "entrada" ? "Depósito" : "Saque"),
      valor: v,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    setData((d) => ({
      ...d,
      saldo: tipo === "entrada" ? d.saldo + v : d.saldo - v,
      transacoesMes: d.transacoesMes + 1,
      transacoes: [nova, ...d.transacoes],
    }));
    toast({ kind: "success", msg: `${tipo === "entrada" ? "Depósito" : "Saque"} de ${brl(v)} registrado.` });
    resetModal();
  };

  const submitInvestimento = () => {
    const v = parseFloat(String(valor).replace(".", "").replace(",", "."));
    if (!descricao.trim() || isNaN(v) || v <= 0) {
      toast({ kind: "error", msg: "Preencha nome e valor válidos." });
      return;
    }
    setData((d) => ({
      ...d,
      investido: d.investido + v,
      investimentos: [
        { id: Date.now(), nome: descricao.trim(), categoria: "Outros", valor: v, variacao: "+0.0%" },
        ...d.investimentos,
      ],
    }));
    toast({ kind: "success", msg: `Investimento ${descricao} adicionado.` });
    resetModal();
  };

  const excluirTransacao = (id) => {
    const alvo = data.transacoes.find((t) => t.id === id);
    if (!alvo) return;
    setData((d) => ({
      ...d,
      saldo: alvo.tipo === "entrada" ? d.saldo - alvo.valor : d.saldo + alvo.valor,
      transacoesMes: Math.max(0, d.transacoesMes - 1),
      transacoes: d.transacoes.filter((t) => t.id !== id),
    }));
    toast({ kind: "info", msg: "Transação excluída." });
  };

  const exportar = () => {
    toast({ kind: "success", msg: "Extrato exportado em CSV." });
  };

  const TITULOS = {
    dashboard: "Dashboard", carteira: "Carteira", transacoes: "Transações",
    relatorios: "Relatórios", suporte: "Suporte", config: "Configurações",
  };

  return (
    <DashboardLayout
      activeTab={activeTab} setActiveTab={setActiveTab}
      search={search} setSearch={setSearch}
      onToastRef={toastRef}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{TITULOS[activeTab]}</h1>
          <p className="text-muted text-sm">Olá, Vini! Aqui está um resumo da sua conta.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-card border border-border rounded-lg p-1">
            {PERIODOS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriodo(p.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition
                  ${periodo === p.id ? "bg-prisma text-white" : "text-muted hover:text-light"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={exportar}
            className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 text-xs font-bold text-muted hover:text-light hover:border-prisma transition"
          >
            <Download size={14} /> Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Saldo Total"
          value={brl(data.saldo)}
          delta={`+${brl(data.variacaoMes)} este mês`}
          hidden={hideBalance}
          onToggleHide={() => setHideBalance(!hideBalance)}
          accent
        />
        <StatCard
          label="Investido"
          value={brl(data.investido)}
          delta="+1.8% este mês"
          hidden={hideBalance}
          onToggleHide={() => setHideBalance(!hideBalance)}
        />
        <StatCard
          label="Rentabilidade"
          value="+3,6%"
          delta="últimos 30 dias"
        />
        <StatCard
          label="Transações"
          value={String(data.transacoesMes)}
          delta="este mês"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => setModal("deposito")}
          className="flex items-center justify-center gap-2 bg-success/90 hover:bg-success text-white rounded-xl py-3 font-bold transition"
        >
          <ArrowDownToLine size={18} /> Depositar
        </button>
        <button
          onClick={() => setModal("saque")}
          className="flex items-center justify-center gap-2 bg-danger/90 hover:bg-danger text-white rounded-xl py-3 font-bold transition"
        >
          <ArrowUpFromLine size={18} /> Sacar
        </button>
        <button
          onClick={() => setModal("novoInvestimento")}
          className="flex items-center justify-center gap-2 bg-prisma hover:bg-prismaHover text-white rounded-xl py-3 font-bold transition"
        >
          <Plus size={18} /> Novo investimento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">Transações recentes</h2>
            <span className="text-xs text-muted">{transacoesFiltradas.length} resultado(s)</span>
          </div>
          <TransactionsTable rows={transacoesFiltradas} onDelete={excluirTransacao} />
        </section>

        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-3">Seus investimentos</h2>
          <InvestmentsList items={data.investimentos} />
        </section>
      </div>

      <Modal open={modal === "deposito"} title="Novo depósito" onClose={resetModal}>
        <FormValor
          valor={valor} setValor={setValor}
          descricao={descricao} setDescricao={setDescricao}
          onSubmit={() => submitTransacao("entrada")}
          onCancel={resetModal}
          cor="success"
        />
      </Modal>

      <Modal open={modal === "saque"} title="Novo saque" onClose={resetModal}>
        <FormValor
          valor={valor} setValor={setValor}
          descricao={descricao} setDescricao={setDescricao}
          onSubmit={() => submitTransacao("saida")}
          onCancel={resetModal}
          cor="danger"
        />
      </Modal>

      <Modal open={modal === "novoInvestimento"} title="Novo investimento" onClose={resetModal}>
        <FormValor
          valor={valor} setValor={setValor}
          descricao={descricao} setDescricao={setDescricao}
          onSubmit={submitInvestimento}
          onCancel={resetModal}
          cor="prisma"
          nomeLabel="Nome do ativo"
          nomePlaceholder="Ex: Ações PETR4"
        />
      </Modal>
    </DashboardLayout>
  );
}

function FormValor({ valor, setValor, descricao, setDescricao, onSubmit, onCancel, cor, nomeLabel = "Descrição", nomePlaceholder = "Opcional" }) {
  const corClasse = cor === "success" ? "bg-success hover:bg-success/80"
                  : cor === "danger"  ? "bg-danger hover:bg-danger/80"
                  :                     "bg-prisma hover:bg-prismaHover";
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-3">
      <div>
        <label className="block text-xs text-muted mb-1">{nomeLabel}</label>
        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder={nomePlaceholder}
          className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm focus:border-prisma focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs text-muted mb-1">Valor (R$)</label>
        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
          inputMode="decimal"
          className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm focus:border-prisma focus:outline-none"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 bg-bg border border-border rounded-lg py-2 text-sm font-bold text-muted hover:text-light transition">
          Cancelar
        </button>
        <button type="submit" className={`flex-1 ${corClasse} text-white rounded-lg py-2 text-sm font-bold transition`}>
          Confirmar
        </button>
      </div>
    </form>
  );
}
