import React from 'react';

export default function Input({
  label,
  error,
  icon: Icon,
  rightAction,
  className = '',
  containerClassName = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-meta text-stone-700 font-semibold flex items-center justify-between">
          <span>{label}</span>
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-stone-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={`w-full h-12 min-h-[48px] bg-white border border-stone-300 text-stone-900 rounded-2xl ${
            Icon ? 'pl-11' : 'pl-4'
          } ${
            rightAction ? 'pr-11' : 'pr-4'
          } text-sm sm:text-base placeholder:text-stone-400 focus:outline-none focus:border-[#4A1525] focus:ring-2 focus:ring-[#4A1525]/15 transition-all duration-150 shadow-2xs ${
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/15' : 'hover:border-stone-400'
          } ${className}`}
          {...props}
        />
        {rightAction && (
          <div className="absolute right-3.5">
            {rightAction}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs font-semibold text-rose-600 mt-1">{error}</p>
      )}
    </div>
  );
}
