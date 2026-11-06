"use client";
import { X } from "lucide-react";

// Bottom sheet: sobe da parte de baixo da tela, como em apps nativos.
export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="absolute inset-0 z-40 bg-ink/25 backdrop-blur-[2px] flex items-end animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full bg-card rounded-t-[28px] px-5 pt-3 pb-[max(env(safe-area-inset-bottom),24px)] shadow-phone animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-silver" />
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-muted active:scale-95 transition"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
