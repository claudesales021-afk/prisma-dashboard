"use client";
import {
  LayoutDashboard, Wallet, ArrowLeftRight, PieChart,
  HelpCircle, Settings, LogOut, ChevronLeft, ChevronRight, Gem,
} from "lucide-react";

const ITEMS = [
  { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { id: "carteira",    label: "Carteira",    icon: Wallet },
  { id: "transacoes",  label: "Transações",  icon: ArrowLeftRight },
  { id: "relatorios",  label: "Relatórios",  icon: PieChart },
  { id: "suporte",     label: "Suporte",     icon: HelpCircle },
  { id: "config",      label: "Configurações", icon: Settings },
];

export default function Sidebar({ collapsed, setCollapsed, activeTab, setActiveTab, onLogout }) {
  return (
    <aside
      className={`${collapsed ? "w-[72px]" : "w-64"} shrink-0 bg-card border-r border-border flex-col transition-[width] duration-200 hidden md:flex`}
    >
      <div className="h-16 flex items-center gap-2 px-4 border-b border-border">
        <Gem className="text-prisma" size={24} />
        {!collapsed && <span className="font-extrabold">Prisma</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-muted hover:text-light p-1 rounded hover:bg-border transition"
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                ${active ? "bg-prisma text-white" : "text-muted hover:text-light hover:bg-border"}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="m-2 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-danger hover:bg-border transition"
        title={collapsed ? "Sair" : undefined}
      >
        <LogOut size={18} className="shrink-0" />
        {!collapsed && <span>Sair</span>}
      </button>
    </aside>
  );
}
