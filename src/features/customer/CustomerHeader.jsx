import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, Languages, ShoppingBag } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import useCartStore from '../../store/cartStore';

// ─────────────────────────────────────────────────────────────
// CustomerHeader — Sticky top shell bar
//
// Responsibilities:
//   • Brand logo (scroll-to-top)
//   • Cart trigger with animated item count badge
//   • Language switcher (TR ↔ EN)
//   • Concierge / Room Service shortcut
//
// Does NOT manage: search (Step 2), navigation (Step 3)
// Does NOT contain: any admin UI
// ─────────────────────────────────────────────────────────────

export default function CustomerHeader({ onOpenConcierge }) {
  const language   = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const openCart  = useCartStore((s) => s.openCart);
  const items     = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Track previous count to trigger badge animation only on increase
  const prevCountRef = useRef(cartCount);
  const badgeKey = useRef(0);

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      badgeKey.current += 1;
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <header className="customer-header" aria-label="AIO Coffee navigation">
      <div className="app-max-width h-full flex items-center justify-between gap-3">

        {/* ── Brand Logo ─────────────────────────────── */}
        <div className="flex items-center shrink-0 select-none py-1">
          <motion.img
            src="/images/logo.png"
            alt="AIO Coffee"
            className="h-9 sm:h-11 w-auto object-contain cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            draggable={false}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        </div>

        {/* ── Right Controls (Clear Hierarchy: Secondary utilities + Primary Cart CTA) ── */}
        <div className="flex items-center gap-2 sm:gap-2.5">

          {/* Hotel Room Service Button (Secondary) */}
          <motion.button
            id="btn-concierge"
            onClick={onOpenConcierge}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="
              flex items-center justify-center gap-1.5 sm:gap-2
              h-11 min-w-[44px] px-3 sm:px-3.5
              bg-white hover:bg-[#F8F2F4]
              text-stone-700 hover:text-[#4A1525]
              rounded-2xl
              text-xs sm:text-sm font-bold font-heading
              border border-stone-200/90 shadow-2xs
              transition-colors duration-150
              cursor-pointer select-none shrink-0
            "
            aria-label={language === 'tr' ? 'Oda Servisi' : 'Room Service'}
          >
            <BellRing className="w-4 h-4 text-[#4A1525] shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap font-bold">
              {language === 'tr' ? 'Oda Servisi' : 'Room Service'}
            </span>
          </motion.button>

          {/* Language Toggle (Utility / Tertiary) */}
          <motion.button
            id="btn-language-toggle"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="
              flex items-center justify-center gap-1.5
              h-11 min-w-[44px] px-3
              bg-stone-100 hover:bg-stone-200 active:bg-stone-300
              text-stone-800
              rounded-2xl
              text-xs sm:text-sm font-bold font-heading
              border border-stone-200/80
              transition-colors duration-150
              cursor-pointer select-none shrink-0
            "
            title="Switch Language / Dili Değiştir"
            aria-label="Switch language"
          >
            <Languages className="w-4 h-4 text-stone-600 shrink-0" />
            <span className="font-bold">{language === 'tr' ? 'TR' : 'EN'}</span>
          </motion.button>

          {/* Cart Trigger (Primary Hero Action) */}
          <motion.button
            id="btn-open-cart"
            onClick={openCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="
              relative flex items-center justify-center gap-2 sm:gap-2.5
              h-11 sm:h-12 min-w-[44px] px-4 sm:px-5
              bg-[#4A1525] hover:bg-[#360F1B] active:bg-[#2C0D16]
              text-white
              rounded-2xl
              text-sm sm:text-base font-bold font-heading
              shadow-sm hover:shadow-md shadow-[#4A1525]/25
              border border-white/15
              transition-all duration-150
              cursor-pointer select-none shrink-0
            "
            aria-label={language === 'tr' ? 'Sepeti Aç' : 'Open Cart'}
            style={{ color: '#FFFFFF' }}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2] shrink-0" />

            <span className="font-bold text-white text-xs sm:text-sm whitespace-nowrap">
              {language === 'tr' ? 'Sepet' : 'Cart'}
            </span>

            {/* Animated count badge */}
            <AnimatePresence mode="wait" initial={false}>
              {cartCount > 0 ? (
                <motion.span
                  key={`cart-count-${badgeKey.current}`}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 22 }}
                  className="
                    inline-flex items-center justify-center
                    min-w-[1.35rem] h-[1.35rem]
                    bg-white text-[#4A1525]
                    rounded-full
                    text-[11px] sm:text-xs font-black leading-none
                    px-1.5 shadow-2xs
                  "
                  aria-live="polite"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>

        </div>
      </div>
    </header>
  );
}
