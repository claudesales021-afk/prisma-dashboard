"use client";

export function SectionTitle({ children, right }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink">{children}</h2>
      {right}
    </div>
  );
}

export function Card({ className = "", children, ...props }) {
  return (
    <section className={`bg-card border border-border rounded-3xl shadow-soft ${className}`} {...props}>
      {children}
    </section>
  );
}

// Cartão de destaque (mesmo estilo do "Saldo total" do Início).
export function HeroCard({ label, value, hidden, chip, children }) {
  return (
    <section className="rounded-[28px] p-5 bg-gradient-to-br from-mist via-card to-silver/60 border border-card shadow-soft">
      <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">{label}</span>
      <div className="text-[34px] leading-tight font-light tracking-tight text-ink mt-2">
        {hidden ? "R$ ••••••" : value}
      </div>
      {chip && (
        <div className="inline-flex items-center gap-1 mt-3 rounded-full bg-prisma px-3 py-1 text-[11px] font-semibold text-white">
          {hidden ? "•••" : chip}
        </div>
      )}
      {children}
    </section>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="grid bg-bg rounded-full p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`py-1.5 text-xs font-semibold rounded-full transition
            ${value === o.id ? "bg-card text-prisma shadow-soft" : "text-muted"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Gráfico de rosca em SVG puro (sem bibliotecas).
export function Donut({ fatias, size = 168, espessura = 22, centro }) {
  const r = (size - espessura) / 2;
  const c = 2 * Math.PI * r;
  const total = fatias.reduce((s, f) => s + f.valor, 0) || 1;
  let acumulado = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F3F4F7" strokeWidth={espessura} />
        {fatias.map((f) => {
          const len = (f.valor / total) * c;
          const el = (
            <circle
              key={f.id}
              cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={f.cor} strokeWidth={espessura}
              strokeDasharray={`${Math.max(len - 2, 0)} ${c}`}
              strokeDashoffset={-acumulado}
            >
              <title>{f.titulo}</title>
            </circle>
          );
          acumulado += len;
          return el;
        })}
      </svg>
      {centro && <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{centro}</div>}
    </div>
  );
}
