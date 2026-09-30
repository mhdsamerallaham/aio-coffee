// AIO Coffee — ContactPage
// Premium contact page with both store locations

import React from 'react';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { useReveal } from '../../lib/useReveal';

export default function ContactPage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.contact;
  const stores = content.stores?.locations || [];

  const ref = useReveal();
  const storesRef = useReveal();

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      <SiteNav theme="light" />

      {/* ── Header ── */}
      <section
        className="section-padding"
        style={{ paddingTop: 'calc(72px + clamp(3rem, 6vw, 5rem))', borderBottom: '1px solid #E6DFD6' }}
      >
        <div className="container">
          <p className="type-label text-[#4A1525] mb-4">{t.overline}</p>
          <h1
            className="type-display-lg text-[#0C0A09]"
            style={{ fontWeight: 300, fontStyle: 'italic', maxWidth: '600px' }}
          >
            {t.headline}
          </h1>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section ref={ref} className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — contact items */}
            <div className="flex flex-col gap-10">

              {/* Email */}
              <div className="reveal" style={{ borderTop: '1px solid #E6DFD6', paddingTop: '2rem' }}>
                <p className="type-label text-[#A09690] mb-3">Email</p>
                <a
                  href="mailto:info@aiocoffee.com"
                  className="type-display-sm text-[#0C0A09] hover:text-[#4A1525] transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  info@aiocoffee.com
                </a>
              </div>

              {/* Instagram */}
              <div className="reveal reveal-delay-1" style={{ borderTop: '1px solid #E6DFD6', paddingTop: '2rem' }}>
                <p className="type-label text-[#A09690] mb-3">Instagram</p>
                <a
                  href="https://www.instagram.com/aio.allinonecoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-display-sm text-[#0C0A09] hover:text-[#4A1525] transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  @aio.allinonecoffee
                </a>
              </div>

              {/* Locations */}
              <div className="reveal reveal-delay-2" style={{ borderTop: '1px solid #E6DFD6', paddingTop: '2rem' }}>
                <p className="type-label text-[#A09690] mb-6">
                  {lang === 'tr' ? 'Lokasyonlar' : 'Locations'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Istanbul */}
                  <div>
                    <p className="type-label text-[#4A1525] mb-3">
                      {lang === 'tr' ? 'İstanbul' : 'Istanbul'}
                    </p>
                    <address className="not-italic type-body text-[#2C2723]" style={{ lineHeight: 1.8 }}>
                      Cumhuriyet Mahallesi,<br />
                      Rumeli Caddesi No: 94A<br />
                      <span className="type-label text-[#A09690]">Şişli / {lang === 'tr' ? 'İstanbul' : 'Istanbul'}</span>
                    </address>
                    <a
                      href="https://maps.google.com/?q=Cumhuriyet+Mahallesi+Rumeli+Caddesi+No+94A+Şişli+İstanbul"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 type-label text-[#4A1525] hover:underline"
                    >
                      {lang === 'tr' ? 'Haritada Aç' : 'Open in Maps'} →
                    </a>
                  </div>

                  {/* Izmir */}
                  <div>
                    <p className="type-label text-[#4A1525] mb-3">
                      {lang === 'tr' ? 'İzmir' : 'Izmir'}
                    </p>
                    <address className="not-italic type-body text-[#2C2723]" style={{ lineHeight: 1.8 }}>
                      Gül Sokak (1382. Sk.)<br />
                      Alsancak<br />
                      <span className="type-label text-[#A09690]">Konak / {lang === 'tr' ? 'İzmir' : 'Izmir'}</span>
                    </address>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=AIO+COFFEE+Alsancak+İzmir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 type-label text-[#4A1525] hover:underline"
                    >
                      {lang === 'tr' ? 'Haritada Aç' : 'Open in Maps'} →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — large editorial text + CTAs */}
            <div className="reveal reveal-delay-1 flex flex-col justify-center">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#E6DFD6',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  marginBottom: '3rem',
                }}
                aria-hidden="true"
              >
                All<br />in<br />One.
              </h2>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:info@aiocoffee.com"
                  className="btn-primary"
                  style={{ width: 'fit-content' }}
                >
                  {lang === 'tr' ? 'Bize Yaz' : 'Send Email'}
                </a>
                <a
                  href="https://www.instagram.com/aio.allinonecoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-[#0C0A09]"
                  style={{ width: 'fit-content' }}
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
