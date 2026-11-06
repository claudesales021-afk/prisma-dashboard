"use client";
import { Eye, EyeOff } from "lucide-react";

export default function StatCard({ label, value, delta, hidden, onToggleHide, accent = false }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-prisma border-prisma text-white" : "bg-card border-border"}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/70">{label}</span>
        {onToggleHide && (
          <button
            onClick={onToggleHide}
            className="text-white/70 hover:text-white transition"
            aria-label={hidden ? "Mostrar valor" : "Ocultar valor"}
          >
            {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      <div className="text-2xl font-extrabold mt-2 tracking-tight">
        {hidden ? "R$ ••••••" : value}
      </div>
      {delta && !hidden && (
        <div className={`text-xs mt-1 font-bold ${delta.startsWith("-") ? "text-danger" : "text-success"}`}>
          {delta}
        </div>
      )}
    </div>
  );
}
