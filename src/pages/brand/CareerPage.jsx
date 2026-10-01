// AIO Coffee — CareerPage
// Editorial career page with "Why AIO" section and application CTA

import React, { useState } from 'react';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import SeoHead from '../../components/seo/SeoHead';
import { getSeoMetadata } from '../../content/seoContent';
import { useReveal } from '../../lib/useReveal';

const WHY_ITEMS = {
  tr: [
    {
      icon: '☕',
      title: 'Specialty Kahve Kültürü',
      desc: 'Her gün öğreneceğiniz yeni bir şey var. Dünyanın en iyi çiftliklerinden tedarik edilen çekirdeklerle çalışırsınız.',
    },
    {
      icon: '☕',
      title: 'Anlamlı Bir İş',
      desc: 'İnsanlara güzel anlar yaşatmak. Her fincan birinin gününü değiştirir.',
    },
    {
      icon: '↑',
      title: 'Büyüyen Bir Ekip',
      desc: 'Küçük ama güçlü. AIO ile birlikte büyüyorsunuz — İstanbul\'dan İzmir\'e ve ötesine.',
    },
    {
      icon: '◈',
      title: 'Tasarım Odaklı Ortam',
      desc: 'Çalıştığınız mekan güzel olmalı. AIO\'nun her lokasyonu, estetik ve işlevselliğin buluşma noktasıdır.',
    },
  ],
  en: [
    {
      icon: '☕',
      title: 'Specialty Coffee Culture',
      desc: 'There\'s always something new to learn. You work with beans sourced from the world\'s finest farms.',
    },
    {
      icon: '☕',
      title: 'Meaningful Work',
      desc: 'Creating beautiful moments for people. Every cup changes someone\'s day.',
    },
    {
      icon: '↑',
      title: 'Growing Team',
      desc: 'Small but mighty. You grow with AIO — from Istanbul to Izmir and beyond.',
    },
    {
      icon: '◈',
      title: 'Design-Led Environment',
      desc: 'Your workspace should be beautiful. Every AIO location is where aesthetics meet function.',
    },
  ],
};

export default function CareerPage() {
  const { lang } = useLangStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const content = getContent(lang);
  const t = content.career;
  const seo = getSeoMetadata(lang === 'tr' ? 'career' : 'careers', lang);

  const headerRef = useReveal();
  const whyRef = useReveal();

  const whyItems = WHY_ITEMS[lang] || WHY_ITEMS.tr;

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      {/* ── Dynamic SEO & GEO Meta Tags ── */}
      <SeoHead {...seo} lang={lang} />

      <SiteNav theme="dark" />

      {/* ── Hero ── */}
      <section
        style={{
          background: '#0C0A09',
          minHeight: '65vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0" style={{ opacity: 0.15 }}>
          <img
            src="/images/menu/coffee-rituals/latte.png"
            alt=""
            className="img-cover"
            loading="eager"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0C0A09 50%, rgba(12,10,9,0.5) 100%)' }}
        />

        <div ref={headerRef} className="relative z-10 container pb-20 md:pb-28 pt-36">
          <p className="reveal type-label text-[#A85470] mb-6">{t.overline}</p>
          <h1
            className="reveal reveal-delay-1 type-display-lg text-white"
            style={{ fontWeight: 300, fontStyle: 'italic', maxWidth: '640px' }}
          >
            {t.headline}
          </h1>
          <p className="reveal reveal-delay-2 type-body-lg text-white/50 mt-6 max-w-md">
            {t.body}
          </p>
        </div>
      </section>

      {/* ── Why AIO ── */}
      <section ref={whyRef} className="section-padding" style={{ background: '#FAF8F5' }}>
        <div className="container">
          <p className="reveal type-label text-[#4A1525] mb-3">
            {lang === 'tr' ? 'Neden AIO Coffee?' : 'Why AIO Coffee?'}
          </p>
          <h2
            className="reveal reveal-delay-1 type-display-md text-[#0C0A09] mb-14"
            style={{ fontWeight: 300, fontStyle: 'italic', maxWidth: '560px' }}
          >
            {lang === 'tr' ? 'Sadece bir iş değil, bir yaşam tarzı.' : 'Not just a job. A way of life.'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyItems.map((item, i) => (
              <div
                key={i}
                className="reveal py-8 border-t-2"
                style={{
                  borderTopColor: '#E6DFD6',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <span
                  className="block mb-5 text-[#4A1525]"
                  style={{ fontSize: '1.5rem' }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: '#0C0A09',
                  }}
                >
                  {item.title}
                </h3>
                <p className="type-body text-[#7A6E65]" style={{ lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="section-padding" style={{ background: '#F5F2EB' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="type-label text-[#A85470] mb-3">
                {t.openingsHeadline || (lang === 'tr' ? 'Açık Pozisyonlar' : 'Open Positions')}
              </p>
              <h2
                className="type-display-md text-[#0C0A09]"
                style={{ fontWeight: 300, fontStyle: 'italic', maxWidth: '580px' }}
              >
                {t.openingsSubtitle || (lang === 'tr' ? 'İstanbul & İzmir mağazalarımız için çalışma arkadaşları arıyoruz.' : 'Hiring for our Istanbul & Izmir stores.')}
              </h2>
            </div>

            {/* City Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-[#E6DFD6] rounded-full self-start md:self-auto shadow-sm">
              {[
                { id: 'all', label: lang === 'tr' ? 'Tümü (4)' : 'All (4)' },
                { id: 'istanbul', label: lang === 'tr' ? 'İstanbul (2)' : 'Istanbul (2)' },
                { id: 'izmir', label: lang === 'tr' ? 'İzmir (2)' : 'Izmir (2)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-200 ${
                    activeFilter === f.id
                      ? 'bg-[#4A1525] text-white shadow-sm'
                      : 'text-[#5C554E] hover:text-[#0C0A09]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Postings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(t.positions || [])
              .filter((pos) => activeFilter === 'all' || pos.city.toLowerCase().includes(activeFilter.toLowerCase()))
              .map((pos) => {
                const mailSubject = encodeURIComponent(
                  `AIO Coffee Kariyer Başvurusu: ${pos.role} — ${pos.city}`
                );
                const mailBody = encodeURIComponent(
                  `Merhaba AIO Coffee Ekibi,\n\n${pos.city} (${pos.location}) lokasyonunuzdaki "${pos.role}" pozisyonuna başvurmak istiyorum.\n\nAd Soyad:\nTelefon:\nÖzgeçmiş Özeti:\n\nTeşekkürler.`
                );
                return (
                  <div
                    key={pos.id}
                    className="bg-white border border-[#E6DFD6] rounded-2xl p-7 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#A85470] bg-[#FAF2F4] px-3 py-1 rounded-full border border-[#E8D1D7]">
                          📍 {pos.city} · {pos.location}
                        </span>
                        <span className="text-[11px] font-mono tracking-wider uppercase text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                          {pos.type}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3
                        className="text-2xl font-serif font-light text-[#0C0A09] mb-2 group-hover:text-[#4A1525] transition-colors"
                      >
                        {pos.role}
                      </h3>

                      <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">
                        {pos.dept}
                      </p>

                      <p className="text-sm text-[#5C554E] leading-relaxed mb-6">
                        {pos.description}
                      </p>

                      {/* Requirements List */}
                      {pos.requirements && pos.requirements.length > 0 && (
                        <div className="border-t border-[#F0EDE8] pt-4 mb-6">
                          <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-3">
                            {lang === 'tr' ? 'Beklenen Nitelikler' : 'Key Requirements'}
                          </p>
                          <ul className="space-y-2">
                            {pos.requirements.map((req, rIdx) => (
                              <li
                                key={rIdx}
                                className="flex items-start gap-2.5 text-xs text-stone-600 leading-normal"
                              >
                                <span className="text-[#A85470] shrink-0 text-sm leading-none mt-0.5">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Apply Footer CTA */}
                    <div className="border-t border-[#F0EDE8] pt-5 flex items-center justify-between gap-4 mt-2">
                      <span className="text-xs text-stone-400">
                        info@aiocoffee.com
                      </span>
                      <a
                        href={`mailto:${t.email}?subject=${mailSubject}&body=${mailBody}`}
                        className="inline-flex items-center gap-2 bg-[#0C0A09] text-white hover:bg-[#4A1525] px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors duration-200"
                      >
                        <span>{t.applyCta || (lang === 'tr' ? 'Başvur' : 'Apply')}</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Bottom Application Note */}
          <div className="mt-12 bg-white/70 border border-[#E6DFD6] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">☕</span>
              <p className="text-xs text-stone-600">
                {t.contact} <strong className="text-stone-900 font-semibold">{t.email}</strong>
              </p>
            </div>
            <a
              href={`mailto:${t.email}?subject=${encodeURIComponent('AIO Coffee Genel Başvuru')}`}
              className="text-xs uppercase tracking-widest font-semibold text-[#4A1525] hover:underline shrink-0"
            >
              {lang === 'tr' ? 'Genel Başvuru Gönder →' : 'Send General Application →'}
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section style={{ background: '#0C0A09', padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="type-label text-white/30 mb-3">
              {lang === 'tr' ? 'Kendini Tanıt' : 'Introduce Yourself'}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#fff',
              }}
            >
              {lang === 'tr' ? 'Bize yaz.' : 'Write to us.'}
            </h2>
          </div>
          <a
            href="mailto:info@aiocoffee.com"
            className="btn-primary shrink-0"
            style={{ background: '#fff', color: '#0C0A09' }}
          >
            info@aiocoffee.com
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
