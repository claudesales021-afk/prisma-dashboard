"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, X, LogOut, HelpCircle, Settings } from "lucide-react";

export default function Header({ title, search, setSearch, onToast, onLogout, onNavigate, userName = "Vini" }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(Boolean(search));
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const [notifs, setNotifs] = useState([
    { id: 1, text: "Depósito de R$ 1.000 confirmado", read: false },
    { id: 2, text: "Tesouro IPCA+ valorizou 0,4%",  read: false },
    { id: 3, text: "Senha alterada com sucesso",    read: true  },
  ]);
  const unread = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    const onDown = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target))  setUserOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    onToast?.({ kind: "success", msg: "Notificações marcadas como lidas" });
  };

  const closeSearch = () => { setSearch(""); setSearchOpen(false); };

  const iconBtn = "relative w-10 h-10 rounded-full bg-card border border-border shadow-soft flex items-center justify-center text-ink active:scale-95 transition";

  return (
    <header className="relative z-30 shrink-0 px-4 pt-[max(env(safe-area-inset-top),16px)] pb-3 bg-bg">
      <div className="flex items-center gap-3">
        {/* Usuário */}
        <div ref={userRef}>
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="w-10 h-10 rounded-full bg-mist border border-sky/60 flex items-center justify-center active:scale-95 transition"
            aria-label="Menu do usuário"
          >
            <User size={18} className="text-prisma" strokeWidth={1.8} />
          </button>
          {userOpen && (
            <div className="absolute left-4 top-full mt-1 w-56 bg-card border border-border rounded-2xl shadow-soft overflow-hidden animate-fade-in">
              <MenuItem icon={User} onClick={() => { setUserOpen(false); onToast?.({ kind: "info", msg: "Abrindo perfil…" }); }}>Meu perfil</MenuItem>
              <MenuItem icon={Settings} onClick={() => { setUserOpen(false); onNavigate?.("config"); }}>Configurações</MenuItem>
              <MenuItem icon={HelpCircle} onClick={() => { setUserOpen(false); onNavigate?.("config"); }}>Suporte</MenuItem>
              <MenuItem icon={LogOut} danger onClick={() => { setUserOpen(false); onLogout?.(); }}>Sair</MenuItem>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 leading-tight">
          <div className="text-xs text-muted truncate">Olá, {userName}</div>
          <div className="text-lg font-semibold tracking-tight truncate text-ink">{title}</div>
        </div>

        <button
          onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
          className={iconBtn}
          aria-label={searchOpen ? "Fechar busca" : "Buscar"}
        >
          {searchOpen ? <X size={18} /> : <Search size={18} />}
        </button>

        {/* Notificações */}
        <div ref={notifRef}>
          <button onClick={() => setNotifOpen(!notifOpen)} className={iconBtn} aria-label="Notificações">
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-prisma text-[10px] font-semibold flex items-center justify-center text-white ring-2 ring-bg">
                {unread}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute left-4 right-4 top-full mt-1 bg-card border border-border rounded-2xl shadow-soft overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-semibold text-ink">Notificações</span>
                <button onClick={markAllRead} className="text-xs font-semibold text-prisma">
                  Marcar como lidas
                </button>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {notifs.map((n) => (
                  <li key={n.id} className="flex items-center gap-3 px-4 py-3 text-sm border-b border-border last:border-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${n.read ? "bg-transparent" : "bg-prisma"}`} />
                    <span className={n.read ? "text-muted" : "text-ink"}>{n.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {searchOpen && (
        <div className="relative mt-3 animate-fade-in">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            autoFocus
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar transação…"
            className="w-full bg-card border border-border shadow-soft rounded-full pl-10 pr-4 py-2.5 text-base text-ink placeholder:text-muted/70 focus:border-prisma focus:outline-none transition"
          />
        </div>
      )}
    </header>
  );
}

function MenuItem({ icon: Icon, children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm active:bg-bg border-b border-border last:border-0 ${danger ? "text-danger" : "text-ink"}`}
    >
      <Icon size={16} /> {children}
    </button>
  );
}
