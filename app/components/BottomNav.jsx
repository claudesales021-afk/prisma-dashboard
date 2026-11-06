"use client";
import { Home, Wallet, ArrowLeftRight, PieChart, Settings } from "lucide-react";

const ITEMS = [
  { id: "dashboard",  label: "Início",     icon: Home },
  { id: "carteira",   label: "Carteira",   icon: Wallet },
  { id: "transacoes", label: "Transações", icon: ArrowLeftRight },
  { id: "relatorios", label: "Relatórios", icon: PieChart },
  { id: "config",     label: "Ajustes",    icon: Settings },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 bg-card/90 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <li key={id}>
              <button
                onClick={() => setActiveTab(id)}
                aria-current={active ? "page" : undefined}
                className={`w-full flex flex-col items-center gap-1 pt-2.5 pb-2 text-[10px] font-medium transition active:scale-95
                  ${active ? "text-prisma" : "text-muted"}`}
              >
                <span className={`flex items-center justify-center w-12 h-7 rounded-full transition ${active ? "bg-mist" : ""}`}>
                  <Icon size={20} strokeWidth={active ? 2 : 1.6} />
                </span>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
