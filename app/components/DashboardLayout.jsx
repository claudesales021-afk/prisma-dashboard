"use client";
import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toast from "./Toast";

export default function DashboardLayout({ activeTab, setActiveTab, search, setSearch, children, onToastRef }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((t) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  }, []);

  if (onToastRef) onToastRef.current = showToast;

  const handleLogout = () => {
    showToast({ kind: "info", msg: "Saindo da conta…" });
  };

  return (
    <div className="min-h-screen flex bg-bg text-light">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Drawer mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="w-64 h-full bg-card border-r border-border" onClick={(e) => e.stopPropagation()}>
            <Sidebar
              collapsed={false}
              setCollapsed={() => setMobileOpen(false)}
              activeTab={activeTab}
              setActiveTab={(id) => { setActiveTab(id); setMobileOpen(false); }}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          search={search}
          setSearch={setSearch}
          onToggleMobileMenu={() => setMobileOpen(true)}
          onToast={showToast}
        />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
