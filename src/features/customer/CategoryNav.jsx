import React, { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import useMenuStore from '../../store/menuStore';
import useLanguageStore from '../../store/languageStore';
import { getLocalizedCategory } from '../../data/menu';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const categories = useMenuStore((s) => s.categories);
  const products = useMenuStore((s) => s.products);
  const language = useLanguageStore((s) => s.language);
  const activeBtnRef = useRef(null);

  const getItemCount = (catId) => {
    return products.filter((p) => p.category === catId).length;
  };

  // Auto-scroll active category pill into center view smoothly
  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategory]);

  return (
    <nav className="customer-category-nav flex items-center relative overflow-hidden" aria-label="Category Navigation">
      
      {/* Right Edge Scroll Hint Gradient Indicator */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF8F5] to-transparent pointer-events-none z-10 flex items-center justify-end pr-1">
        <ChevronRight className="w-4 h-4 text-[#4A1525]/40" />
      </div>

      <div className="app-max-width w-full">
        <div className="flex items-center gap-2 sm:gap-2.5 category-scroll-container no-scrollbar py-1.5 px-0.5">
          {categories.map((cat) => {
            const locCat = getLocalizedCategory(cat, language);
            const count = getItemCount(cat.id);
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                ref={isActive ? activeBtnRef : null}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 h-10 sm:h-11 px-3.5 sm:px-4 rounded-2xl transition-all duration-150 shrink-0 press-trigger cursor-pointer select-none font-heading font-bold text-xs sm:text-sm border ${
                  isActive
                    ? 'bg-[#4A1525] text-white border-[#4A1525] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200/90 hover:border-stone-300 hover:text-stone-950 hover:bg-stone-50/80 shadow-2xs'
                }`}
                style={isActive ? { color: '#FFFFFF' } : {}}
              >
                <span className="text-base sm:text-lg leading-none">{locCat.icon}</span>
                <span className="whitespace-nowrap font-bold tracking-tight">{locCat.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                    isActive
                      ? 'bg-white text-[#4A1525]'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
