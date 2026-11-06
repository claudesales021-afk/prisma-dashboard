"use client";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ICONS = {
  success: <CheckCircle2 size={18} className="text-success shrink-0" />,
  error:   <XCircle size={18} className="text-danger shrink-0" />,
  info:    <Info size={18} className="text-prisma shrink-0" />,
};

export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="absolute top-[max(env(safe-area-inset-top),12px)] inset-x-4 z-50 animate-slide-down" role="status">
      <div className="flex items-center gap-3 bg-card/95 backdrop-blur border border-border rounded-2xl px-4 py-3 shadow-soft">
        {ICONS[toast.kind] ?? ICONS.info}
        <span className="text-sm text-ink">{toast.msg}</span>
        <button
          onClick={onClose}
          className="ml-auto text-muted transition"
          aria-label="Fechar notificação"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
