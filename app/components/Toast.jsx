"use client";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ICONS = {
  success: <CheckCircle2 size={18} className="text-success" />,
  error:   <XCircle size={18} className="text-danger" />,
  info:    <Info size={18} className="text-prisma" />,
};

export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-lg min-w-[280px]">
        {ICONS[toast.kind] ?? ICONS.info}
        <span className="text-sm">{toast.msg}</span>
        <button
          onClick={onClose}
          className="ml-auto text-muted hover:text-light transition"
          aria-label="Fechar notificação"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
