"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import BottomNav from "./BottomNav";
import Header from "./Header";
import Toast from "./Toast";

export default function DashboardLayout({ activeTab, setActiveTab, title, search, setSearch, children, onToastRef, userName, onLogout }) {
  const [toast, setToast] = useState(null);
  const mainRef = useRef(null);

  // Ao trocar de aba, volta para o topo (como em apps nativos).
  useEffect(() => { mainRef.current?.scrollTo({ top: 0 }); }, [activeTab]);

  const showToast = useCallback((t) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  }, []);

  if (onToastRef) onToastRef.current = showToast;


  return (
    // No celular ocupa a tela toda; no desktop vira uma "moldura" de telefone centralizada.
    <div className="min-h-[100dvh] bg-bg md:bg-deep flex items-center justify-center md:p-6">
      <div className="relative w-full max-w-[430px] h-[100dvh] md:h-[min(880px,calc(100dvh-48px))] bg-bg text-ink flex flex-col overflow-hidden md:rounded-[44px] md:border-[6px] md:border-card md:shadow-phone">
        <Header
          title={title}
          search={search}
          setSearch={setSearch}
          onToast={showToast}
          userName={userName}
          onLogout={onLogout}
          onNavigate={setActiveTab}
        />
        <main ref={mainRef} className="flex-1 overflow-y-auto overscroll-contain no-scrollbar px-4 pt-2 pb-28">
          {children}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  );
}
