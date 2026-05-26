import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const base =
  'inline-flex items-center justify-center font-button font-bold tracking-[0.18em] text-[0.62rem] uppercase ' +
  'rounded-[2px] cursor-pointer select-none ' +
  'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'hover:-translate-y-[1px] active:scale-[0.97]';

const sizes = {
  md: 'px-7 py-3',
  sm: 'px-5 py-2',
};

const variants = {
  primary:
    'bg-brand-blue text-white border border-brand-blue ' +
    'hover:bg-[#3a72a0] hover:border-[#3a72a0]',
  ghost:
    'bg-transparent text-white border border-white/35 ' +
    'hover:bg-white hover:text-navy hover:border-white',
  outline:
    'bg-transparent text-ink border border-border-m ' +
    'hover:border-ink hover:bg-ink/5',
};

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  size = 'md',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
