"use client";
import { useState } from "react";
import { Eye, EyeOff, Info, Loader2, Mail, Lock } from "lucide-react";

// Logo do prisma (mesmo desenho do ícone do app).
export function PrismaLogo({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E7F3FB" /><stop offset="0.55" stopColor="#F7F8FA" /><stop offset="1" stopColor="#D6DAE1" />
        </linearGradient>
        <linearGradient id="lg-gem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9ED3F2" /><stop offset="1" stopColor="#2B96D3" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="120" fill="url(#lg-bg)" />
      <g transform="translate(256 262)">
        <polygon points="-112,-48 -56,-112 56,-112 112,-48 0,118" fill="url(#lg-gem)" />
        <polygon points="-112,-48 112,-48 0,118" fill="#2083BC" opacity="0.55" />
        <polygon points="-56,-112 56,-112 28,-48 -28,-48" fill="#FFFFFF" opacity="0.55" />
        <polygon points="-28,-48 28,-48 0,118" fill="#FFFFFF" opacity="0.22" />
      </g>
    </svg>
  );
}

// Moldura igual à do app (tela cheia no celular, "celular" centralizado no desktop).
export function AppFrame({ children }) {
  return (
    <div className="min-h-[100dvh] bg-bg md:bg-deep flex items-center justify-center md:p-6">
      <div className="relative w-full max-w-[430px] h-[100dvh] md:h-[min(880px,calc(100dvh-48px))] bg-bg text-ink flex flex-col overflow-hidden md:rounded-[44px] md:border-[6px] md:border-card md:shadow-phone">
        {children}
      </div>
    </div>
  );
}

// "vini.sales@x.com" -> "Vini"
const nomeDe = (login) => {
  const base = login.split("@")[0].split(/[._\-\s]+/)[0] || login;
  return base.charAt(0).toUpperCase() + base.slice(1);
};

// Login de DEMONSTRAÇÃO: aceita qualquer e-mail/usuário e senha; não há back-end.
export default function Login({ onLogin }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  const enviar = (e) => {
    e.preventDefault();
    if (!login.trim()) return setErro("Digite seu e-mail.");
    if (!senha) return setErro("Digite sua senha.");
    setErro("");
    setEntrando(true);
    // Pequena espera só para simular a verificação.
    setTimeout(() => onLogin({ nome: nomeDe(login.trim()), email: login.trim() }), 700);
  };

  const campo = "w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3.5 text-base text-ink placeholder:text-muted/60 shadow-soft focus:border-sky focus:outline-none transition";

  return (
    <AppFrame>
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pt-[max(env(safe-area-inset-top),48px)] pb-[max(env(safe-area-inset-bottom),24px)] flex flex-col">
        <div className="flex flex-col items-center text-center mt-6 animate-fade-in">
          <PrismaLogo size={84} />
          <h1 className="text-2xl font-semibold tracking-tight mt-5">Prisma Investments</h1>
          <p className="text-sm text-muted mt-1">Entre na sua conta</p>
        </div>

        <form onSubmit={enviar} className="mt-10 space-y-4" noValidate>
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-muted mb-1.5 ml-1">E-mail</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/70" />
              <input
                id="login-email" type="email" inputMode="email" autoComplete="username" autoCapitalize="none"
                value={login} onChange={(e) => { setLogin(e.target.value); setErro(""); }}
                placeholder="voce@email.com" className={campo}
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-senha" className="block text-xs font-semibold text-muted mb-1.5 ml-1">Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/70" />
              <input
                id="login-senha" type={verSenha ? "text" : "password"} autoComplete="current-password"
                value={senha} onChange={(e) => { setSenha(e.target.value); setErro(""); }}
                placeholder="Sua senha" className={`${campo} pr-12`}
              />
              <button
                type="button" onClick={() => setVerSenha(!verSenha)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-muted active:bg-bg"
                aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {verSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {erro && <p className="text-sm text-danger ml-1 animate-fade-in" role="alert">{erro}</p>}

          <button
            type="submit" disabled={entrando}
            className="w-full flex items-center justify-center gap-2 bg-prisma hover:bg-prismaHover disabled:opacity-80 text-white rounded-2xl py-3.5 text-base font-semibold shadow-soft active:scale-[0.98] transition !mt-6"
          >
            {entrando ? <><Loader2 size={18} className="animate-spin" /> Entrando…</> : "Entrar"}
          </button>
        </form>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-mist border border-sky/40 px-4 py-3">
          <Info size={18} className="text-prisma shrink-0 mt-0.5" />
          <p className="text-xs text-ink/80 leading-relaxed">
            <span className="font-semibold">Modo demonstração.</span> Use qualquer e-mail e senha para entrar. Nenhum dado é enviado.
          </p>
        </div>

        <p className="mt-auto pt-8 text-center text-[11px] text-muted">v1.0 · Trabalho acadêmico</p>
      </main>
    </AppFrame>
  );
}
