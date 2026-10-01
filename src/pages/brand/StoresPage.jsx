// AIO Coffee — StoresPage
// Two branches: Rumeli (Istanbul) & Alsancak (Izmir) with split editorial layout

import React from 'react';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import SeoHead from '../../components/seo/SeoHead';
import { getSeoMetadata } from '../../content/seoContent';
import { useReveal } from '../../lib/useReveal';

function LocationBlock({ store, lang, index }) {
  const ref = useReveal();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-[#E6DFD6]"
    >
      {/* Info Panel */}
      <div
        className={`reveal flex flex-col justify-center px-8 md:px-14 py-16 lg:py-24 ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
        style={{
          background: isEven ? '#FAF8F5' : '#F4EFEB',
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="type-label text-[#4A1525]">
            {lang === 'tr' ? 'Lokasyon' : 'Location'} {String(index + 1).padStart(2, '0')}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A1525]/40" />
          <span className="type-label text-[#7A6E65]">{store.city}</span>
        </div>

        <h2
          className="type-heading-lg text-[#0C0A09] mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
        >
          {store.name}
        </h2>

        <address className="not-italic type-body-lg text-[#5C5349] mb-6" style={{ lineHeight: 1.8 }}>
          {store.address}<br />
          <span className="text-[#0C0A09] font-medium">{store.district}</span>
        </address>

        <div className="divider mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="type-label text-[#A09690] mb-1">
              {lang === 'tr' ? 'Çalışma Saatleri' : 'Opening Hours'}
            </p>
            <p className="type-body text-[#2C2723] font-medium">
              {store.hours || '08:00 – 22:00'}
            </p>
            <p className="type-label text-[#A09690] mt-0.5">
              {lang === 'tr' ? 'Her gün' : 'Every day'}
            </p>
          </div>
          <div>
            <p className="type-label text-[#A09690] mb-1">
              {lang === 'tr' ? 'E-posta' : 'Email'}
            </p>
            <a
              href="mailto:info@aiocoffee.com"
              className="type-body text-[#4A1525] hover:underline"
            >
              info@aiocoffee.com
            </a>
          </div>
          <div>
            <p className="type-label text-[#A09690] mb-1">Instagram</p>
            <a
              href="https://www.instagram.com/aio.allinonecoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="type-body text-[#4A1525] hover:underline"
            >
              @aio.allinonecoffee
            </a>
          </div>
        </div>

        <a
          href={store.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-fit text-white"
          style={{ padding: '0.75rem 1.75rem' }}
        >
          {lang === 'tr' ? 'Haritada Aç / Yol Tarifi' : 'Open in Maps / Directions'} →
        </a>
      </div>

      {/* Map Panel */}
      <div
        className={`reveal reveal-delay-1 min-h-[380px] lg:min-h-[520px] relative overflow-hidden ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
        style={{ background: '#E6DFD6' }}
      >
        <iframe
          src={store.mapEmbed}
          title={`${store.name} Google Map`}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: 'contrast(1.02)',
            minHeight: '380px',
            height: '100%',
            width: '100%',
            display: 'block',
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}

export default function StoresPage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.stores;
  const seo = getSeoMetadata('stores', lang);

  const heroRef = useReveal();

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      {/* ── Dynamic SEO & GEO Meta Tags ── */}
      <SeoHead {...seo} lang={lang} />

      <SiteNav theme="light" />

      {/* ── Page Header ── */}
      <section
        className="section-padding"
        style={{
          background: '#FAF8F5',
          paddingTop: 'calc(72px + clamp(3rem, 6vw, 5rem))',
        }}
      >
        <div ref={heroRef} className="container">
          <p className="reveal type-label text-[#4A1525] mb-4">{t.overline}</p>
          <h1
            className="reveal reveal-delay-1 type-display-lg text-[#0C0A09]"
            style={{ fontWeight: 300, fontStyle: 'italic', maxWidth: '700px' }}
          >
            {t.headline}
          </h1>
          <p className="reveal reveal-delay-2 type-body-lg text-[#7A6E65] mt-6 max-w-lg">
            {t.subtitle || (lang === 'tr'
              ? 'İstanbul ve İzmir\'deki lokasyonlarımızda sizi bekliyoruz.'
              : 'We welcome you at our locations in Istanbul and Izmir.')}
          </p>
        </div>
      </section>

      {/* ── Location Blocks ── */}
      {t.locations.map((store, i) => (
        <LocationBlock key={store.id} store={store} lang={lang} index={i} />
      ))}

      {/* ── Experience Note ── */}
      <section
        className="section-padding-sm"
        style={{ background: '#0C0A09', borderTop: '1px solid #1B1815' }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
            <div>
              <p className="type-label text-white/40 mb-2">
                AIO COFFEE
              </p>
              <h3
                className="type-heading-lg text-white"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
              >
                {lang === 'tr' ? 'Her fincan, bir ritüel.' : 'Every cup, a ritual.'}
              </h3>
            </div>
            <a
              href="mailto:info@aiocoffee.com"
              className="btn-ghost text-white shrink-0"
              style={{ borderBottomColor: 'rgba(255,255,255,0.3)' }}
            >
              info@aiocoffee.com →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
