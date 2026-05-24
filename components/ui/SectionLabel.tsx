interface Props {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ children, className = '', light = false }: Props) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 font-label text-[0.55rem] tracking-[0.22em] uppercase ${light ? 'text-brand-blue/60' : 'text-brand-blue'} ${className}`}
    >
      <span className="w-3 h-px bg-current opacity-60 shrink-0" />
      {children}
    </div>
  );
}
