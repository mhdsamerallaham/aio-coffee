// AIO Coffee — SiteFooter
// Premium editorial footer — massive branding, both store locations

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLangStore from '../store/langStore';
import { getContent } from '../content/siteContent';

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

export default function SiteFooter() {
  const { lang, setLang } = useLangStore();
  const content = getContent(lang);
  const t = content.footer;
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleLang = () => {
    const nextLang = lang === 'tr' ? 'en' : 'tr';
    setLang(nextLang);
    const targetRoute = routeMap[location.pathname];
    if (targetRoute) {
      navigate(targetRoute);
    } else {
      navigate(nextLang === 'tr' ? '/tr' : '/en');
    }
  };

  const prefix = lang === 'tr' ? '/tr' : '/en';

  return (
    <footer
      className="bg-[#0C0A09] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Massive AIO Wordmark Strip ───────────────── */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
          padding: 'clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3.5rem)',
          position: 'relative',
        }}
      >
        {/* Subtle ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(74,21,37,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-16">

            {/* Left — Large wordmark */}
            <div>
              <Link to={`/${lang}`} aria-label="AIO Coffee — Ana Sayfa">
                <img
                  src="/images/logo.png"
                  alt="AIO Coffee"
                  className="brightness-0 invert"
                  style={{
                    height: 'clamp(2.5rem, 5vw, 4.5rem)',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                  width="200"
                  height="72"
                />
              </Link>
              <p
                className="type-label mt-4"
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.25em',
                }}
              >
                ALL IN ONE — {lang === 'tr' ? 'Specialty Coffee' : 'Specialty Coffee'}
              </p>
            </div>

            {/* Right — Brand tagline */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.3)',
                lineHeight: 1.3,
                maxWidth: '380px',
                textAlign: 'right',
              }}
              className="hidden lg:block"
            >
              {t.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ─────────────────────────── */}
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          style={{ padding: 'clamp(3rem, 6vw, 5rem) 0 clamp(2.5rem, 5vw, 4rem)' }}
        >

          {/* Column 1 — Brand & Contact */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div>
              <p className="type-label mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {lang === 'tr' ? 'İletişim' : 'Contact'}
              </p>
              <a
                href="mailto:info@aiocoffee.com"
                className="type-label-md hover:text-[#A85470] transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem', fontFamily: 'var(--font-sans)', fontWeight: 300 }}
              >
                info@aiocoffee.com
              </a>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/aio.allinonecoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 type-label hover:text-white transition-colors group"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              aria-label="AIO Coffee Instagram"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @aio.allinonecoffee
            </a>

            {/* Language toggle */}
            <button
              onClick={handleToggleLang}
              className="type-label hover:text-white transition-colors text-left w-fit mt-2"
              style={{ color: 'rgba(255,255,255,0.25)' }}
              aria-label="Switch language"
            >
              {t.language} ↗
            </button>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-3">
            <p className="type-label mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {lang === 'tr' ? 'Sayfa' : 'Navigate'}
            </p>
            {t.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="type-label-md hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)', fontWeight: 300 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3 — Istanbul */}
          <div className="flex flex-col gap-4">
            <p className="type-label mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {lang === 'tr' ? 'İstanbul' : 'Istanbul'}
            </p>
            <address
              className="not-italic"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.75,
              }}
            >
              Cumhuriyet Mahallesi<br />
              Rumeli Caddesi No: 94A<br />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Şişli / {lang === 'tr' ? 'İstanbul' : 'Istanbul'}
              </span>
            </address>
            <a
              href="https://maps.google.com/?q=Cumhuriyet+Mahallesi+Rumeli+Caddesi+No+94A+Şişli+İstanbul"
              target="_blank"
              rel="noopener noreferrer"
              className="type-label hover:text-white transition-colors"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              {lang === 'tr' ? 'Haritada Aç' : 'Open in Maps'} →
            </a>
          </div>

          {/* Column 4 — Izmir */}
          <div className="flex flex-col gap-4">
            <p className="type-label mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {lang === 'tr' ? 'İzmir' : 'Izmir'}
            </p>
            <address
              className="not-italic"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.75,
              }}
            >
              Gül Sokak (1382. Sk.)<br />
              Alsancak<br />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Konak / {lang === 'tr' ? 'İzmir' : 'Izmir'}
              </span>
            </address>
            <a
              href="https://www.google.com/maps/search/?api=1&query=AIO+COFFEE+Alsancak+İzmir"
              target="_blank"
              rel="noopener noreferrer"
              className="type-label hover:text-white transition-colors"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              {lang === 'tr' ? 'Haritada Aç' : 'Open in Maps'} →
            </a>
          </div>

        </div>
      </div>

      {/* ── Legal Bar ────────────────────────────────── */}
      <div
        className="container"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
            <p className="type-label" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {t.legal}
            </p>
            <span style={{ color: 'rgba(255,255,255,0.15)' }} aria-hidden="true">•</span>
            <Link
              to={lang === 'tr' ? '/tr/gizlilik-politikasi' : '/en/privacy-policy'}
              className="type-label hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {lang === 'tr' ? 'Gizlilik İlkesi & KVKK' : 'Privacy Policy & KVKK'}
            </Link>
          </div>
          <p className="type-label" style={{ color: 'rgba(255,255,255,0.15)' }}>
            All in One.
          </p>
        </div>
      </div>
    </footer>
  );
}
