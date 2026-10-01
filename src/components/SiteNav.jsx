// AIO Coffee — SiteNav
// Premium brand navigation with Watermelon UI / Motion Primitives floating island architecture

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useLangStore from '../store/langStore';
import { getContent } from '../content/siteContent';
import Magnetic from './motion/Magnetic';

const routeMap = {
  '/tr': '/en',
  '/tr/biz-kimiz': '/en/about',
  '/tr/magazalar': '/en/stores',
  '/tr/menu': '/en/menu',
  '/tr/franchise': '/en/franchise',
  '/tr/blog': '/en/blog',
  '/tr/kariyer': '/en/careers',
  '/tr/iletisim': '/en/contact',
  '/tr/gizlilik-politikasi': '/en/privacy-policy',
  '/tr/gizlilik-ilkesi': '/en/privacy-policy',
  '/en': '/tr',
  '/en/about': '/tr/biz-kimiz',
  '/en/stores': '/tr/magazalar',
  '/en/menu': '/tr/menu',
  '/en/franchise': '/tr/franchise',
  '/en/blog': '/tr/blog',
  '/en/careers': '/tr/kariyer',
  '/en/contact': '/tr/iletisim',
  '/en/privacy-policy': '/tr/gizlilik-politikasi',
  '/en/privacy': '/tr/gizlilik-politikasi',
};

function MenuIcon({ open }) {
  return (
    <div className="flex flex-col justify-center items-end w-6 h-6 gap-[5px]">
      <span
        style={{
          display: 'block',
          width: '100%',
          height: '1.5px',
          backgroundColor: 'currentColor',
          transformOrigin: 'center',
          transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <span
        style={{
          display: 'block',
          width: open ? '100%' : '70%',
          height: '1.5px',
          backgroundColor: 'currentColor',
          opacity: open ? 0 : 1,
          transition: 'opacity 0.2s ease, width 0.3s ease',
        }}
      />
      <span
        style={{
          display: 'block',
          width: '100%',
          height: '1.5px',
          backgroundColor: 'currentColor',
          transformOrigin: 'center',
          transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}

export default function SiteNav({ theme = 'dark' }) {
  const { lang, setLang } = useLangStore();
  const content = getContent(lang);
  const t = content.nav;
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const discoverRef = useRef(null);

  // Sync language store with URL pathname
  useEffect(() => {
    if (location.pathname.startsWith('/en') && lang !== 'en') {
      setLang('en');
    } else if (location.pathname.startsWith('/tr') && lang !== 'tr') {
      setLang('tr');
    }
  }, [location.pathname, lang, setLang]);

  const handleSelectLang = (targetLang) => {
    if (lang === targetLang) return;
    setLang(targetLang);
    const targetRoute = routeMap[location.pathname];
    if (targetRoute) {
      navigate(targetRoute);
    } else {
      navigate(targetLang === 'tr' ? '/tr' : '/en');
    }
  };

  // Detect page scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
    setDiscoverOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!discoverOpen) return;
    const handler = (e) => {
      if (discoverRef.current && !discoverRef.current.contains(e.target)) {
        setDiscoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [discoverOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const isLightPage = theme === 'light' && !scrolled;
  const prefix = lang === 'tr' ? '/tr' : '/en';

  const links = lang === 'tr'
    ? [
        { href: `${prefix}/biz-kimiz`, label: t.about },
        { href: `${prefix}/magazalar`, label: t.stores },
        { href: `${prefix}/franchise`, label: t.franchise || 'Franchise' },
      ]
    : [
        { href: `${prefix}/about`, label: t.about },
        { href: `${prefix}/stores`, label: t.stores },
        { href: `${prefix}/franchise`, label: t.franchise || 'Franchise' },
      ];

  const discoverLinks = lang === 'tr'
    ? [
        { href: `${prefix}/menu`, label: t.menu, desc: 'Tüm kahve ritüelleri ve yemekler' },
        { href: `${prefix}/blog`, label: t.blog, desc: 'Specialty kahve kültürü ve hikayeler' },
        { href: `${prefix}/kariyer`, label: t.career, desc: 'AIO ekibine katılın' },
        { href: `${prefix}/iletisim`, label: t.contact, desc: 'Lokasyonlar ve rezervasyon' },
      ]
    : [
        { href: `${prefix}/menu`, label: t.menu, desc: 'Coffee rituals & all-day brunch' },
        { href: `${prefix}/blog`, label: t.blog, desc: 'Specialty coffee journal & origins' },
        { href: `${prefix}/careers`, label: t.career, desc: 'Join the AIO roastery team' },
        { href: `${prefix}/contact`, label: t.contact, desc: 'Stores, inquiry & contact' },
      ];

  const menuHref = `${prefix}/menu`;
  const storesHref = lang === 'tr' ? `${prefix}/magazalar` : `${prefix}/stores`;

  return (
    <>
      {/* ── Fixed Island Wrapper ───────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 ${
          scrolled ? 'pt-3 pb-3' : 'pt-5 pb-4'
        }`}
        role="banner"
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full px-5 md:px-7 py-3 ${
            scrolled
              ? 'bg-[#0E0C0B]/90 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white'
              : isLightPage
              ? 'bg-white/80 backdrop-blur-xl border border-stone-200/80 shadow-sm text-[#0C0A09]'
              : 'bg-[#0E0C0B]/40 backdrop-blur-md border border-white/10 text-white'
          }`}
        >
          {/* ── Left: Brand Identity ───────────────────────────── */}
          <Link
            to={`/${lang}`}
            aria-label="AIO Coffee — Ana Sayfa"
            className="flex items-center gap-3 shrink-0 group select-none"
          >
            <div className="relative overflow-hidden">
              <img
                src="/images/logo.png"
                alt="AIO Coffee"
                width="84"
                height="44"
                className={`h-8 md:h-9 w-auto object-contain transition-all duration-300 ${
                  isLightPage ? '' : 'brightness-0 invert'
                }`}
                loading="eager"
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-current/20 pl-3 leading-none">
              <span className="font-serif tracking-wider text-[11px] uppercase font-semibold">
                ALL IN ONE
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase opacity-60 mt-0.5">
                COFFEE AS RITUAL
              </span>
            </div>
          </Link>

          {/* ── Center: Desktop Navigation Links ───────────────── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Desktop menu">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium transition-colors duration-200 rounded-full ${
                    isActive
                      ? 'text-[#C59B63]'
                      : 'opacity-85 hover:opacity-100 hover:text-[#C59B63]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C59B63]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Discover Menu Dropdown */}
            <div className="relative" ref={discoverRef}>
              <button
                type="button"
                onClick={() => setDiscoverOpen(!discoverOpen)}
                className="relative px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium opacity-85 hover:opacity-100 hover:text-[#C59B63] transition-colors flex items-center gap-1.5 rounded-full"
                aria-expanded={discoverOpen}
                aria-haspopup="true"
              >
                <span>{t.discover}</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className={`transition-transform duration-300 ${discoverOpen ? 'rotate-180 text-[#C59B63]' : ''}`}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {discoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl p-2 bg-[#120F0D]/95 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 text-white"
                  >
                    <div className="flex flex-col gap-1">
                      {discoverLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setDiscoverOpen(false)}
                          className="group/item flex flex-col p-3 rounded-xl hover:bg-white/8 transition-colors duration-200"
                        >
                          <span className="text-xs uppercase tracking-wider font-semibold group-hover/item:text-[#C59B63] transition-colors flex items-center justify-between">
                            {link.label}
                            <span className="text-[10px] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all text-[#C59B63]">
                              ↗
                            </span>
                          </span>
                          <span className="text-[11px] text-stone-400 mt-0.5 font-light">
                            {link.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* ── Right: Language Pill & Magnetic CTA ────────────── */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Switcher Pill */}
            <div className={`hidden sm:flex items-center p-1 rounded-full text-[11px] font-semibold tracking-wider ${
              isLightPage ? 'bg-stone-200/80 text-stone-800' : 'bg-white/10 text-white'
            }`}>
              <button
                type="button"
                onClick={() => handleSelectLang('tr')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'tr'
                    ? 'bg-[#4A1525] text-white shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => handleSelectLang('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-[#4A1525] text-white shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button: Mağazalarımız (Stores) */}
            <Magnetic strength={0.2}>
              <Link
                to={storesHref}
                className="btn-luxury-primary text-xs py-2 px-3.5 sm:px-5 md:px-6 shadow-lg shadow-[#4A1525]/30 group"
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <span>{lang === 'tr' ? 'Mağazalarımız' : 'Our Stores'}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </Magnetic>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={drawerOpen}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isLightPage ? 'hover:bg-stone-200/70 text-[#0C0A09]' : 'hover:bg-white/10 text-white'
              }`}
            >
              <MenuIcon open={false} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Slide Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0E0C0B] border-l border-white/10 p-6 md:p-8 flex flex-col z-50 lg:hidden text-white overflow-y-auto"
            aria-label="Mobile navigation"
          >
            {/* Drawer Top */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link to={`/${lang}`} onClick={() => setDrawerOpen(false)} className="flex items-center gap-2">
                <img
                  src="/images/logo.png"
                  alt="AIO Coffee"
                  className="h-8 w-auto brightness-0 invert"
                />
                <span className="font-serif text-sm tracking-wider text-white">ALL IN ONE</span>
              </Link>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-white/80 hover:text-white"
                aria-label="Menüyü kapat"
              >
                <MenuIcon open={true} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 py-8 flex flex-col gap-2">
              {[...links, ...discoverLinks].map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-3 border-b border-white/8 text-lg font-serif font-light text-stone-200 hover:text-[#C59B63] transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-stone-500">↗</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <Link
                to={menuHref}
                onClick={() => setDrawerOpen(false)}
                className="btn-luxury-primary w-full text-center py-3 text-sm justify-center"
              >
                {t.menuCta} — Ritüelleri Gör
              </Link>

              {/* Language Switch */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider">Dil / Language:</span>
                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full text-xs">
                  <button
                    type="button"
                    onClick={() => handleSelectLang('tr')}
                    className={`px-3 py-1 rounded-full ${lang === 'tr' ? 'bg-[#4A1525] text-white' : 'text-stone-400'}`}
                  >
                    Türkçe
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectLang('en')}
                    className={`px-3 py-1 rounded-full ${lang === 'en' ? 'bg-[#4A1525] text-white' : 'text-stone-400'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-stone-500 tracking-wider">
                  Şişli / Nişantaşı • Alsancak / İzmir
                </p>
                <p className="text-[11px] text-[#C59B63] mt-1">
                  info@aiocoffee.com
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
