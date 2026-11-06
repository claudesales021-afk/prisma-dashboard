"use client";
import { useRef, useState } from "react";
import { HelpCircle, Lock, LogOut, Plus, Minus, User, ChevronRight } from "lucide-react";
import { SectionTitle, Card } from "../ui";

const FAQ = [
  {
    q: "Como faço meu primeiro investimento?",
    a: "Acesse a aba Carteira e toque em Novo investimento. Informe o nome do ativo e o valor, e confirme.",
  },
  {
    q: "Como deposito dinheiro na minha conta?",
    a: "Na tela Início, toque em Depositar, digite o valor e confirme. O saldo é atualizado na hora.",
  },
  {
    q: "Como faço um saque?",
    a: "Na tela Início, toque em Sacar e informe o valor. O saque não pode ser maior que o saldo disponível.",
  },
  {
    q: "Qual o prazo de resgate do CDB?",
    a: "Depende do CDB contratado: alguns têm liquidez diária e outros só permitem resgate no vencimento. Confira as condições do título na Carteira.",
  },
  {
    q: "Como altero meus dados cadastrais e senha?",
    a: "A senha pode ser alterada aqui mesmo, em Alterar senha. Para outros dados cadastrais, fale com o suporte.",
  },
];

export default function Ajustes({ onToast, onLogout }) {
  const faqRef = useRef(null);
  const senhaRef = useRef(null);
  const ir = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted -mt-1">Central de ajuda, conta e segurança</p>

      {/* Perfil */}
      <Card className="p-4 flex items-center gap-3">
        <span className="w-12 h-12 rounded-full bg-mist border border-sky/60 flex items-center justify-center">
          <User size={20} className="text-prisma" strokeWidth={1.8} />
        </span>
        <div className="flex-1">
          <div className="font-semibold text-ink">Vini</div>
          <div className="text-xs text-muted">Conta Prisma Investments</div>
        </div>
      </Card>

      {/* Atalhos */}
      <div className="grid grid-cols-2 gap-3">
        <Atalho icon={HelpCircle} label="FAQ" onClick={() => ir(faqRef)} />
        <Atalho icon={Lock} label="Segurança" onClick={() => ir(senhaRef)} />
      </div>

      <div ref={faqRef} className="scroll-mt-4">
        <SectionTitle>Dúvidas frequentes</SectionTitle>
        <Card className="mt-3 px-4">
          <ul className="divide-y divide-border">
            {FAQ.map((item, i) => <FaqItem key={i} {...item} />)}
          </ul>
        </Card>
      </div>

      <div ref={senhaRef} className="scroll-mt-4">
        <SectionTitle>Alterar senha</SectionTitle>
        <Card className="mt-3 p-4">
          <FormSenha onToast={onToast} />
        </Card>
      </div>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 bg-card border border-border text-danger rounded-2xl py-3.5 text-sm font-semibold shadow-soft active:scale-[0.98] transition"
      >
        <LogOut size={16} /> Sair da conta
      </button>

      <p className="text-center text-[11px] text-muted">v1.0 · Trabalho acadêmico</p>
    </div>
  );
}

function Atalho({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="bg-card border border-border rounded-3xl shadow-soft p-4 flex flex-col items-center gap-2 active:scale-[0.98] transition">
      <span className="w-11 h-11 rounded-2xl bg-mist text-prisma flex items-center justify-center">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span className="text-sm font-medium text-ink flex items-center gap-0.5">
        {label} <ChevronRight size={14} className="text-silver" />
      </span>
    </button>
  );
}

function FaqItem({ q, a }) {
  const [aberto, setAberto] = useState(false);
  return (
    <li>
      <button
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        className="w-full flex items-center gap-3 py-3.5 text-left"
      >
        <span className="flex-1 text-sm font-medium text-ink">{q}</span>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${aberto ? "bg-prisma text-white" : "bg-bg text-muted"}`}>
          {aberto ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      {aberto && <p className="text-sm text-muted pb-4 -mt-1 pr-8 animate-fade-in">{a}</p>}
    </li>
  );
}

// Formulário apenas de front-end: valida e mostra o aviso; não há back-end de autenticação.
function FormSenha({ onToast }) {
  const [atual, setAtual] = useState("");
  const [nova, setNova] = useState("");
  const [confirma, setConfirma] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    if (!atual) return onToast?.({ kind: "error", msg: "Digite sua senha atual." });
    if (nova.length < 6) return onToast?.({ kind: "error", msg: "A nova senha precisa ter no mínimo 6 caracteres." });
    if (nova !== confirma) return onToast?.({ kind: "error", msg: "As senhas não coincidem." });
    if (nova === atual) return onToast?.({ kind: "error", msg: "A nova senha deve ser diferente da atual." });
    setAtual(""); setNova(""); setConfirma("");
    onToast?.({ kind: "success", msg: "Senha atualizada com sucesso." });
  };

  const input = "w-full bg-bg border border-border rounded-2xl px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-sky focus:bg-card focus:outline-none transition";
  const label = "block text-xs font-semibold text-muted mb-1.5 ml-1";

  return (
    <form onSubmit={enviar} className="space-y-3">
      <div>
        <label className={label} htmlFor="senha-atual">Senha atual</label>
        <input id="senha-atual" type="password" autoComplete="current-password" value={atual} onChange={(e) => setAtual(e.target.value)} placeholder="Digite sua senha atual" className={input} />
      </div>
      <div>
        <label className={label} htmlFor="senha-nova">Nova senha</label>
        <input id="senha-nova" type="password" autoComplete="new-password" value={nova} onChange={(e) => setNova(e.target.value)} placeholder="Mínimo 6 caracteres" className={input} />
      </div>
      <div>
        <label className={label} htmlFor="senha-confirma">Confirmar nova senha</label>
        <input id="senha-confirma" type="password" autoComplete="new-password" value={confirma} onChange={(e) => setConfirma(e.target.value)} placeholder="Repita a nova senha" className={input} />
      </div>
      <button type="submit" className="w-full bg-prisma hover:bg-prismaHover text-white rounded-2xl py-3.5 text-sm font-semibold active:scale-[0.98] transition mt-1">
        Atualizar senha
      </button>
    </form>
  );
}
