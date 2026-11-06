"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Plus, Download, ArrowDownToLine, ArrowUpFromLine, Eye, EyeOff, TrendingUp, PiggyBank, Receipt } from "lucide-react";
import DashboardLayout from "./components/DashboardLayout";
import StatCard from "./components/StatCard";
import TransactionsTable from "./components/TransactionsTable";
import InvestmentsList from "./components/InvestmentsList";
import Modal from "./components/Modal";
import Carteira from "./components/screens/Carteira";
import Transacoes from "./components/screens/Transacoes";
import Relatorios from "./components/screens/Relatorios";
import Ajustes from "./components/screens/Ajustes";
import Login, { AppFrame, PrismaLogo } from "./components/screens/Login";

const SESSAO = "prisma-sessao";
const lerSessao = () => { try { return JSON.parse(localStorage.getItem(SESSAO)) || null; } catch { return null; } };
const salvarSessao = (u) => { try { u ? localStorage.setItem(SESSAO, JSON.stringify(u)) : localStorage.removeItem(SESSAO); } catch {} };

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
  // undefined = ainda lendo a sessão salva; null = deslogado.
  const [user, setUser] = useState(undefined);
  useEffect(() => { setUser(lerSessao()); }, []);

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
    dashboard: "Início", carteira: "Carteira", transacoes: "Transações",
    relatorios: "Relatórios", config: "Ajustes",
  };

  const entrar = (u) => { salvarSessao(u); setUser(u); setActiveTab("dashboard"); };
  const sair = () => { salvarSessao(null); setUser(null); setSearch(""); setModal(null); setHideBalance(false); };

  if (user === undefined) {
    return (
      <AppFrame>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-fade-in">
          <PrismaLogo size={72} />
          <span className="text-xs text-muted">Carregando…</span>
        </div>
      </AppFrame>
    );
  }
  if (!user) return <Login onLogin={entrar} />;

  return (
    <DashboardLayout
      userName={user.nome}
      onLogout={sair}
      activeTab={activeTab} setActiveTab={setActiveTab}
      title={TITULOS[activeTab]}
      search={search} setSearch={setSearch}
      onToastRef={toastRef}
    >
      {activeTab === "dashboard" && (<>
      {/* Saldo em destaque */}
      <section className="rounded-[28px] p-5 bg-gradient-to-br from-mist via-card to-silver/60 border border-card shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">Saldo total</span>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="w-8 h-8 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted active:scale-95 transition"
            aria-label={hideBalance ? "Mostrar valores" : "Ocultar valores"}
          >
            {hideBalance ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <div className="text-[38px] leading-tight font-light tracking-tight text-ink mt-2">
          {hideBalance ? "R$ ••••••" : brl(data.saldo)}
        </div>
        <div className="inline-flex items-center gap-1 mt-3 rounded-full bg-prisma px-3 py-1 text-[11px] font-semibold text-white">
          <TrendingUp size={12} />
          {hideBalance ? "•••" : `+${brl(data.variacaoMes)} este mês`}
        </div>
      </section>

      {/* Ações rápidas */}
      <div className="grid grid-cols-4 gap-2 mt-5">
        <QuickAction icon={ArrowDownToLine} label="Depositar" onClick={() => setModal("deposito")} />
        <QuickAction icon={ArrowUpFromLine} label="Sacar" onClick={() => setModal("saque")} />
        <QuickAction icon={Plus} label="Investir" destaque onClick={() => setModal("novoInvestimento")} />
        <QuickAction icon={Download} label="Exportar" onClick={exportar} />
      </div>

      {/* Indicadores (carrossel) */}
      <div className="flex gap-3 overflow-x-auto snap-x scroll-px-4 no-scrollbar -mx-4 px-4 py-1 mt-5">
        <StatCard icon={PiggyBank} label="Investido" value={brl(data.investido)} delta="+1.8% este mês" hidden={hideBalance} />
        <StatCard icon={TrendingUp} label="Rentab." value="+3,6%" delta="últimos 30 dias" />
        <StatCard icon={Receipt} label="Transações" value={String(data.transacoesMes)} delta="este mês" />
      </div>

      {/* Transações */}
      <section className="mt-5 bg-card border border-border rounded-3xl px-4 pt-4 pb-1 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink">Transações recentes</h2>
          <span className="text-xs text-muted">{transacoesFiltradas.length} resultado(s)</span>
        </div>
        <div className="grid grid-cols-4 bg-bg rounded-full p-1 mt-3">
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriodo(p.id)}
              className={`py-1.5 text-xs font-semibold rounded-full transition
                ${periodo === p.id ? "bg-card text-prisma shadow-soft" : "text-muted"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <TransactionsTable rows={transacoesFiltradas} onDelete={excluirTransacao} />
      </section>

      {/* Investimentos */}
      <section className="mt-4 bg-card border border-border rounded-3xl px-4 pt-4 pb-1 shadow-soft">
        <h2 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink">Seus investimentos</h2>
        <InvestmentsList items={data.investimentos} />
      </section>
      </>)}

      {activeTab === "carteira" && (
        <Carteira data={data} hidden={hideBalance} onToast={toast} onNovoInvestimento={() => setModal("novoInvestimento")} />
      )}
      {activeTab === "transacoes" && (
        <Transacoes transacoes={data.transacoes} search={search} hidden={hideBalance} onDelete={excluirTransacao} />
      )}
      {activeTab === "relatorios" && (
        <Relatorios data={data} hidden={hideBalance} onToast={toast} />
      )}
      {activeTab === "config" && (
        <Ajustes user={user} onToast={toast} onLogout={sair} />
      )}

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

function QuickAction({ icon: Icon, label, destaque = false, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 active:scale-95 transition">
      <span className={`w-14 h-14 rounded-2xl flex items-center justify-center
        ${destaque ? "bg-prisma text-white shadow-soft" : "bg-card text-ink border border-border shadow-soft"}`}>
        <Icon size={21} strokeWidth={1.8} />
      </span>
      <span className="text-[11px] font-medium text-muted">{label}</span>
    </button>
  );
}

function FormValor({ valor, setValor, descricao, setDescricao, onSubmit, onCancel, cor, nomeLabel = "Descrição", nomePlaceholder = "Opcional" }) {
  // Minimalista: o botão de confirmar é sempre azul; só o saque usa um tom de alerta suave.
  const corClasse = cor === "danger" ? "bg-ink hover:bg-ink/90" : "bg-prisma hover:bg-prismaHover";
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-muted mb-1.5 ml-1">{nomeLabel}</label>
        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder={nomePlaceholder}
          className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-sky focus:bg-card focus:outline-none transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted mb-1.5 ml-1">Valor (R$)</label>
        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
          inputMode="decimal"
          className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-sky focus:bg-card focus:outline-none transition"
        />
      </div>
      <div className="flex gap-3 pt-3">
        <button type="button" onClick={onCancel} className="flex-1 bg-bg border border-border rounded-2xl py-3.5 text-sm font-semibold text-muted active:scale-[0.98] transition">
          Cancelar
        </button>
        <button type="submit" className={`flex-1 ${corClasse} text-white rounded-2xl py-3.5 text-sm font-semibold active:scale-[0.98] transition`}>
          Confirmar
        </button>
      </div>
    </form>
  );
}
