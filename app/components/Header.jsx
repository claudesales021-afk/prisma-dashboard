"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Menu } from "lucide-react";

export default function Header({ search, setSearch, onToggleMobileMenu, onToast }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const [notifs, setNotifs] = useState([
    { id: 1, text: "Depósito de R$ 1.000 confirmado", read: false },
    { id: 2, text: "Tesouro IPCA+ valorizou 0,4%",  read: false },
    { id: 3, text: "Senha alterada com sucesso",    read: true  },
  ]);
  const unread = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target))  setUserOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    onToast?.({ kind: "success", msg: "Notificações marcadas como lidas" });
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center gap-3 px-4 md:px-6 sticky top-0 z-30">
      <button
        className="md:hidden text-muted hover:text-light p-1"
        onClick={onToggleMobileMenu}
        aria-label="Abrir menu"
      >
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar transação, investimento…"
          className="w-full bg-bg border border-border rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-muted focus:border-prisma focus:outline-none transition"
        />
      </div>

      {/* Notificações */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 rounded-lg text-muted hover:text-light hover:bg-border transition"
          aria-label="Notificações"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          )}
        </button>
        {notifOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <span className="text-sm font-bold">Notificações</span>
              <button onClick={markAllRead} className="text-xs text-prisma hover:underline">
                Marcar como lidas
              </button>
            </div>
            <ul className="max-h-72 overflow-y-auto">
              {notifs.map((n) => (
                <li
                  key={n.id}
                  className={`px-3 py-2.5 text-sm border-b border-border last:border-0 ${n.read ? "text-muted" : "text-light"}`}
                >
                  {n.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Usuário */}
      <div className="relative" ref={userRef}>
        <button
          onClick={() => setUserOpen(!userOpen)}
          className="flex items-center gap-2 p-1 pr-2 rounded-lg hover:bg-border transition"
        >
          <div className="w-8 h-8 rounded-full bg-prisma flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="text-sm hidden sm:inline">Vini</span>
        </button>
        {userOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => { setUserOpen(false); onToast?.({ kind: "info", msg: "Abrindo perfil…" }); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-border transition"
            >
              Meu perfil
            </button>
            <button
              onClick={() => { setUserOpen(false); onToast?.({ kind: "info", msg: "Abrindo configurações…" }); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-border transition"
            >
              Configurações
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
