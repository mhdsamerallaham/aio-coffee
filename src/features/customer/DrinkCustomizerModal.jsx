import React, { useState, useEffect, useMemo } from 'react';
import { X, Check, Plus, Minus, Sparkles, Coffee, Milk, Droplets, Zap, ShoppingBag, Receipt, MessageSquare } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useLanguageStore from '../../store/languageStore';
import { getLocalizedProduct } from '../../data/menu';
import { getTranslation } from '../../data/translations';

// Universal bilingual label resolver for options, milks, syrups, shots
const getLocalizedLabel = (item, lang) => {
  if (!item) return '';

  // Handle nested object { name: { tr, en } }
  if (item.name && typeof item.name === 'object') {
    return item.name[lang] || item.name.en || item.name.tr || '';
  }
  // Handle nested string { name: 'Vanilla Syrup' }
  if (item.name && typeof item.name === 'string') {
    return item.name;
  }
  // Handle direct properties { tr: '...', en: '...' }
  if (lang === 'en') {
    return item.en || item.tr || '';
  }
  return item.tr || item.en || '';
};

export default function DrinkCustomizerModal({ product, isOpen, onClose }) {
  const language = useLanguageStore((s) => s.language);
  const addToCart = useCartStore((s) => s.addToCart);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Group extras into distinct categories (Milks, Syrups, Shots, Other Extras)
  const optionGroups = useMemo(() => {
    if (!product) return { milks: [], syrups: [], shots: [], others: [] };

    const allExtras = product.extras || [];

    // Check if product defines explicit milks, syrups, shots arrays
    const explicitMilks = product.milks || [];
    const explicitSyrups = product.syrups || [];
    const explicitShots = product.shots || [];

    if (explicitMilks.length > 0 || explicitSyrups.length > 0 || explicitShots.length > 0) {
      return {
        milks: explicitMilks,
        syrups: explicitSyrups,
        shots: explicitShots,
        others: allExtras,
      };
    }

    // Otherwise automatically categorize allExtras
    const milks = [];
    const syrups = [];
    const shots = [];
    const others = [];

    allExtras.forEach((item) => {
      const nameTr = typeof item.name === 'object' ? item.name.tr : (item.tr || String(item.name || ''));
      const nameEn = typeof item.name === 'object' ? item.name.en : (item.en || nameTr);
      const lower = (nameTr + ' ' + nameEn).toLowerCase();

      if (lower.includes('süt') || lower.includes('milk')) {
        milks.push(item);
      } else if (lower.includes('şurup') || lower.includes('syrup')) {
        syrups.push(item);
      } else if (lower.includes('shot') || lower.includes('espresso')) {
        shots.push(item);
      } else {
        others.push(item);
      }
    });

    // Default milk option if none exists in coffee products
    if (milks.length === 0 && (product.category === 'coffee-rituals' || product.category === 'iced-coffee' || product.category === 'matcha-lounge')) {
      milks.push(
        { name: { tr: 'Standart Süt', en: 'Standard Milk' }, price: 0 },
        { name: { tr: 'Yulaf Sütü', en: 'Oat Milk' }, price: 20 },
        { name: { tr: 'Badem Sütü', en: 'Almond Milk' }, price: 20 },
        { name: { tr: 'Laktozsuz Süt', en: 'Lactose-Free Milk' }, price: 15 }
      );
    }

    return { milks, syrups, shots, others };
  }, [product]);

  // Unique key extractor for milk options
  const getMilkKey = (m) => {
    if (!m) return '';
    return getLocalizedLabel(m, 'tr') + '|' + getLocalizedLabel(m, 'en');
  };

  useEffect(() => {
    if (product) {
      const defaultSizes = product.sizes || [];
      setSelectedSize(defaultSizes.length > 0 ? defaultSizes[0] : null);

      // Default single-choice milk initialized once on product open
      const milksList = optionGroups.milks || [];
      if (milksList.length > 0) {
        setSelectedMilk(milksList[0]);
      } else {
        setSelectedMilk(null);
      }

      setSelectedExtras([]);
      setNotes('');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product?.id]);

  const localized = useMemo(() => {
    if (!product) return null;
    return getLocalizedProduct(product, language);
  }, [product, language]);

  if (!isOpen || !product || !localized) return null;

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) => {
      const exKey = getLocalizedLabel(extra, 'tr');
      const exists = prev.some((e) => getLocalizedLabel(e, 'tr') === exKey);
      if (exists) {
        return prev.filter((e) => getLocalizedLabel(e, 'tr') !== exKey);
      } else {
        return [...prev, extra];
      }
    });
  };

  // Calculate live itemized pricing breakdown
  const basePrice = product.basePrice || 0;
  const sizePrice = selectedSize?.price || 0;
  const milkPrice = selectedMilk?.price || 0;
  const extrasTotalPrice = selectedExtras.reduce((sum, e) => sum + (e.price || 0), 0);

  const unitTotal = basePrice + sizePrice + milkPrice + extrasTotalPrice;
  const grandTotal = unitTotal * quantity;

  const handleAddToCart = () => {
    const combinedExtras = [...selectedExtras];
    if (selectedMilk) {
      combinedExtras.unshift(selectedMilk);
    }

    addToCart(product, selectedSize, combinedExtras, quantity, notes);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/80 backdrop-blur-md transition-all duration-200 overflow-y-auto">
      
      {/* ── Modal Shell (Bounded width, flex-col, overflow-hidden) ── */}
      <div className="bg-white w-full max-w-lg md:max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-stone-200/90 animate-in fade-in zoom-in-95 duration-200 relative">

        {/* ── Close Button ── */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 min-w-[40px] rounded-full bg-stone-900/70 hover:bg-stone-900 backdrop-blur-md text-white transition-all cursor-pointer flex items-center justify-center border border-white/20 shadow-md z-30 touch-target"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-white stroke-[2.2]" />
        </button>

        {/* ── TOP: Product Image (Fixed height, aspect-ratio safe, max-h-52) ── */}
        <div className="relative w-full h-44 sm:h-52 bg-stone-950 shrink-0 overflow-hidden">
          <img
            src={localized.image}
            alt={localized.name}
            className="w-full h-full object-cover"
          />

          {/* Smooth gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

          {/* Handcrafted Ritual Badge on Image */}
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4A1525]/95 backdrop-blur-sm text-white rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-white/20 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{getTranslation(language, 'handcraftedBadge')}</span>
            </span>
          </div>
        </div>

        {/* ── CENTER: Single Content Scroll Container with Unified Padding & Gap-6 ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-5 sm:px-6 sm:py-6 flex flex-col gap-6">
            
            {/* 1) Title, Base Price & Description */}
            <div className="flex flex-col gap-2 pb-4 border-b border-stone-200/80">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-stone-950 leading-tight">
                {localized.name}
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold font-mono text-[#4A1525] bg-[#F8F2F4] px-2.5 py-0.5 rounded-lg border border-[#4A1525]/20">
                  ₺{basePrice}
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {getTranslation(language, 'basePriceLabel')}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed pt-1">
                {localized.description}
              </p>
            </div>

            {/* 2) Boyut Seçimi (Radio Cards) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4.5 h-4.5 text-[#4A1525] shrink-0" />
                  <h3 className="text-xs sm:text-sm text-stone-950 font-bold uppercase tracking-wide font-heading">
                    {getTranslation(language, 'selectSize')}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold text-[#4A1525] bg-[#F8F2F4] px-2 py-0.5 rounded-full border border-[#4A1525]/20 uppercase">
                    {getTranslation(language, 'requiredBadge')}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {product.sizes.map((size) => {
                    const label = getLocalizedLabel(size, language);
                    const isSelected = selectedSize && getLocalizedLabel(selectedSize, 'tr') === getLocalizedLabel(size, 'tr');

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-full min-h-[56px] px-4 py-3 rounded-xl border flex items-center justify-between text-left gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F8F2F4] border-2 border-[#4A1525] text-stone-950 font-bold shadow-2xs'
                            : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* 20x20px Radio Indicator */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                              isSelected ? 'border-[#4A1525] bg-[#4A1525]' : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-stone-950 font-heading' : 'text-stone-800'}`}>
                            {label}
                          </span>
                        </div>

                        <span className={`text-xs font-bold font-mono shrink-0 text-right ${isSelected ? 'text-[#4A1525]' : 'text-stone-500'}`}>
                          {size.price > 0 ? `+₺${size.price}` : getTranslation(language, 'standardTag')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3) Süt Seçimi (Radio Cards) */}
            {optionGroups.milks.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Milk className="w-4.5 h-4.5 text-[#4A1525] shrink-0" />
                  <h3 className="text-xs sm:text-sm text-stone-950 font-bold uppercase tracking-wide font-heading">
                    {getTranslation(language, 'selectMilk')}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold text-[#4A1525] bg-[#F8F2F4] px-2 py-0.5 rounded-full border border-[#4A1525]/20">
                    {getTranslation(language, 'singleSelectBadge')}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {optionGroups.milks.map((milk) => {
                    const label = getLocalizedLabel(milk, language);
                    const mKey = getMilkKey(milk);
                    const selKey = getMilkKey(selectedMilk);
                    const isSelected = selKey !== '' && selKey === mKey;

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedMilk(milk)}
                        className={`w-full min-h-[56px] px-4 py-3 rounded-xl border flex items-center justify-between text-left gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F8F2F4] border-2 border-[#4A1525] text-stone-950 font-bold shadow-2xs'
                            : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* 20x20px Radio Indicator */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                              isSelected ? 'border-[#4A1525] bg-[#4A1525]' : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className={`text-xs sm:text-sm font-semibold leading-snug break-words ${isSelected ? 'text-stone-950 font-heading' : 'text-stone-800'}`}>
                            {label}
                          </span>
                        </div>
                        <span className={`text-xs font-bold font-mono shrink-0 text-right ${isSelected ? 'text-[#4A1525]' : 'text-stone-500'}`}>
                          {milk.price > 0 ? `+₺${milk.price}` : getTranslation(language, 'freeTag')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4) Şurup Seçimi (Checkbox Cards) */}
            {optionGroups.syrups.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4.5 h-4.5 text-[#4A1525] shrink-0" />
                  <h3 className="text-xs sm:text-sm text-stone-950 font-bold uppercase tracking-wide font-heading">
                    {getTranslation(language, 'selectSyrup')}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                    {getTranslation(language, 'optionalBadge')}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {optionGroups.syrups.map((syrup) => {
                    const label = getLocalizedLabel(syrup, language);
                    const isChecked = selectedExtras.some((e) => getLocalizedLabel(e, 'tr') === getLocalizedLabel(syrup, 'tr'));

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleExtra(syrup)}
                        className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border flex items-center justify-between text-left gap-3 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#F8F2F4] border-2 border-[#4A1525] text-stone-950 font-bold shadow-2xs'
                            : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* 20x20px Checkbox */}
                          <div
                            className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#4A1525] border-[#4A1525] text-white' : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug break-words">{label}</span>
                        </div>
                        <span className={`text-xs font-bold font-mono shrink-0 text-right ${isChecked ? 'text-[#4A1525]' : 'text-stone-500'}`}>
                          +₺{syrup.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5) Ekstra Shot Seçimi (Checkbox Cards) */}
            {optionGroups.shots.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4.5 h-4.5 text-[#4A1525] shrink-0" />
                  <h3 className="text-xs sm:text-sm text-stone-950 font-bold uppercase tracking-wide font-heading">
                    {getTranslation(language, 'selectShot')}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                    {getTranslation(language, 'optionalBadge')}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {optionGroups.shots.map((shot) => {
                    const label = getLocalizedLabel(shot, language);
                    const isChecked = selectedExtras.some((e) => getLocalizedLabel(e, 'tr') === getLocalizedLabel(shot, 'tr'));

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleExtra(shot)}
                        className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border flex items-center justify-between text-left gap-3 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#F8F2F4] border-2 border-[#4A1525] text-stone-950 font-bold shadow-2xs'
                            : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* 20x20px Checkbox */}
                          <div
                            className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#4A1525] border-[#4A1525] text-white' : 'border-stone-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug break-words">{label}</span>
                        </div>
                        <span className={`text-xs font-bold font-mono shrink-0 text-right ${isChecked ? 'text-[#4A1525]' : 'text-stone-500'}`}>
                          {shot.price > 0 ? `+₺${shot.price}` : getTranslation(language, 'standardTag')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6) Özel Notlar */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-[#4A1525] shrink-0" />
                <h3 className="text-xs sm:text-sm text-stone-950 font-bold uppercase tracking-wide font-heading">
                  {getTranslation(language, 'specialNotesTitle')}
                </h3>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={getTranslation(language, 'specialNotesPlaceholder')}
                rows={2}
                className="w-full p-3.5 rounded-xl bg-stone-50/80 border border-stone-200 text-stone-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#4A1525] focus:bg-white focus:ring-2 focus:ring-[#4A1525]/15 transition-all resize-none placeholder:text-stone-400"
              />
            </div>

            {/* 7) Fiyat Dökümü Özeti */}
            <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80 flex flex-col gap-2.5">
              <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#4A1525] flex items-center gap-1.5 font-heading">
                  <Receipt className="w-3.5 h-3.5 text-[#4A1525]" />
                  <span>{getTranslation(language, 'priceSummaryTitle')}</span>
                </h4>
                <span className="text-xs font-mono font-bold text-stone-600">1 x ₺{unitTotal}</span>
              </div>

              <div className="flex flex-col gap-1.5 text-xs font-medium text-stone-600">
                <div className="flex items-center justify-between">
                  <span>{getTranslation(language, 'basePriceLabel')}</span>
                  <span className="font-mono font-bold text-stone-900">₺{basePrice}</span>
                </div>

                {selectedSize && selectedSize.price > 0 && (
                  <div className="flex items-center justify-between text-[#4A1525] font-semibold">
                    <span>+ {getLocalizedLabel(selectedSize, language)}</span>
                    <span className="font-mono">+₺{selectedSize.price}</span>
                  </div>
                )}

                {selectedMilk && selectedMilk.price > 0 && (
                  <div className="flex items-center justify-between text-[#4A1525] font-semibold">
                    <span>+ {getLocalizedLabel(selectedMilk, language)}</span>
                    <span className="font-mono">+₺{selectedMilk.price}</span>
                  </div>
                )}

                {selectedExtras.map((ex) => (
                  <div key={getLocalizedLabel(ex, 'tr')} className="flex items-center justify-between text-[#4A1525] font-semibold">
                    <span>+ {getLocalizedLabel(ex, language)}</span>
                    <span className="font-mono">+₺{ex.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200/60 pt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-stone-950">
                <span>{getTranslation(language, 'total')} ({quantity} {getTranslation(language, 'quantity')})</span>
                <span className="text-base sm:text-lg font-mono text-[#4A1525] font-black">₺{grandTotal}</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM: Separate Sticky Action Bar (Normal flex sibling, px-4 py-3 sm:px-6) ── */}
        <div className="shrink-0 bg-white border-t border-stone-200 px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3 shadow-lg">
          
          {/* Miktar Stepper */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 min-w-[40px] rounded-lg bg-white text-stone-800 flex items-center justify-center font-bold shadow-2xs hover:bg-stone-50 active:scale-95 transition-all cursor-pointer touch-target"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>
            <span className="w-7 text-center text-sm sm:text-base font-bold text-stone-900 font-mono select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 min-w-[40px] rounded-lg bg-white text-stone-800 flex items-center justify-center font-bold shadow-2xs hover:bg-stone-50 active:scale-95 transition-all cursor-pointer touch-target"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Primary Action CTA Button — flex-1 with price badge inside on the right */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 h-12 sm:h-13 min-h-[48px] px-4 rounded-xl font-bold font-heading text-xs sm:text-sm md:text-base flex items-center justify-between shadow-md transition-all press-trigger cursor-pointer active:scale-[0.99] min-w-0 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-[#4A1525] hover:bg-[#360F1B] active:bg-[#2C0D16] text-white shadow-[#4A1525]/20'
            }`}
            style={{ color: '#FFFFFF' }}
          >
            <div className="flex items-center gap-2 shrink min-w-0">
              <ShoppingBag className="w-4.5 h-4.5 text-white stroke-[2.2] shrink-0" />
              <span className="font-bold tracking-tight truncate">
                {isAdded ? getTranslation(language, 'addedToCart') : getTranslation(language, 'addToCart')}
              </span>
            </div>

            <span className="font-mono text-xs sm:text-sm font-bold text-[#4A1525] bg-white px-2.5 py-1 rounded-lg shadow-2xs shrink-0 ml-2">
              ₺{grandTotal}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
