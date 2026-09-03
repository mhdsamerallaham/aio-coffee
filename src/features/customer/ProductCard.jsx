import React from 'react';
import { Plus } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import { getLocalizedProduct } from '../../data/menu';
import { getTranslation } from '../../data/translations';

export default function ProductCard({ product, onClick }) {
  const language = useLanguageStore((s) => s.language);
  const localized = getLocalizedProduct(product, language);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 flex flex-col justify-between hover:border-[#4A1525]/35 hover:shadow-md transition-all duration-200 cursor-pointer group select-none relative h-full"
    >
      <div className="flex-1 flex flex-col">
        {/* Balanced 4:3 Aspect Ratio Imagery */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-stone-100 border border-stone-200/50">
          <img
            src={localized.image}
            alt={localized.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />

          {product.popular && (
            <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-[#4A1525] text-white rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs border border-white/20">
              ⭐ {getTranslation(language, 'popularTag')}
            </span>
          )}
        </div>

        {/* Details with consistent typography hierarchy */}
        <div className="space-y-1 px-0.5 flex-1">
          <h3 className="text-sm sm:text-base font-bold font-heading text-stone-900 group-hover:text-[#4A1525] transition-colors leading-snug line-clamp-1">
            {localized.name}
          </h3>
          <p className="text-xs text-stone-500 font-medium line-clamp-2 leading-relaxed min-h-[2rem]">
            {localized.description}
          </p>
        </div>
      </div>

      {/* Footer Pricing & Aligned 44px Add Button */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-col gap-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[10px] sm:text-xs font-semibold text-stone-400 uppercase tracking-wider">
            {getTranslation(language, 'total')}
          </span>
          <span className="text-base sm:text-lg font-black font-heading text-[#4A1525]">
            ₺{product.basePrice}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full h-11 min-h-[44px] bg-[#4A1525] hover:bg-[#360F1B] active:bg-[#2C0D16] text-white font-bold font-heading rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs shadow-[#4A1525]/15 press-trigger cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>{getTranslation(language, 'add')}</span>
        </button>
      </div>
    </div>
  );
}

