import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'admin'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  icon: Icon,
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-bold rounded-2xl transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1525]/30 press-trigger disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none';

  const sizeStyles = {
    sm: 'min-h-[44px] px-3.5 py-2 text-xs sm:text-sm gap-2 rounded-xl',
    md: 'min-h-[44px] px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base gap-2.5 rounded-2xl',
    lg: 'min-h-[48px] sm:min-h-[52px] px-6 py-3.5 sm:px-7 sm:py-4 text-base sm:text-lg gap-3 rounded-2xl',
  };

  const variantStyles = {
    primary: 'bg-[#4A1525] hover:bg-[#360F1B] active:bg-[#2C0D16] text-white shadow-sm hover:shadow-md shadow-[#4A1525]/20 border border-transparent',
    secondary: 'bg-stone-900 hover:bg-black active:bg-stone-950 text-white shadow-xs border border-transparent',
    outline: 'border border-stone-300 hover:border-[#4A1525] hover:text-[#4A1525] text-stone-800 bg-white hover:bg-[#F8F2F4]/50 shadow-xs',
    ghost: 'text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-transparent',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 border border-transparent',
    admin: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold shadow-sm shadow-sky-500/20 border border-transparent',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-5 h-5'} />}
      <span>{children}</span>
    </button>
  );
}
