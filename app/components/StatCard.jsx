"use client";

// Cartão compacto para o carrossel horizontal de indicadores.
export default function StatCard({ label, value, delta, hidden, icon: Icon }) {
  return (
    <div className="snap-start shrink-0 w-[150px] rounded-2xl p-4 bg-card border border-border shadow-soft">
      <div className="flex items-center gap-2 text-xs text-muted">
        {Icon && (
          <span className="w-7 h-7 rounded-full bg-mist text-prisma flex items-center justify-center">
            <Icon size={14} strokeWidth={1.8} />
          </span>
        )}
        {label}
      </div>
      <div className="text-lg font-semibold mt-3 tracking-tight truncate text-ink">
        {hidden ? "R$ ••••" : value}
      </div>
      {delta && (
        <div className={`text-[11px] mt-0.5 font-medium ${delta.startsWith("-") ? "text-danger" : "text-muted"}`}>
          {hidden ? "•••" : delta}
        </div>
      )}
    </div>
  );
}
