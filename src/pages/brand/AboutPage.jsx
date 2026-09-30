// AIO Coffee — AboutPage

import React from 'react';
import { Link } from 'react-router-dom';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { useReveal } from '../../lib/useReveal';

export default function AboutPage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.about;
  const prefix = lang === 'tr' ? '/tr' : '/en';

  const heroRef = useReveal();
  const storyRef = useReveal();
  const valuesRef = useReveal();

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      <SiteNav theme="dark" />

      {/* ── Hero ── */}
      <section
        style={{
          background: '#0C0A09',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0" style={{ opacity: 0.2 }}>
          <img
            src="/images/menu/brew-rituals/chemex.png"
            alt=""
            className="img-cover"
            loading="eager"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0C0A09 40%, rgba(12,10,9,0.5) 100%)' }}
        />

        <div ref={heroRef} className="relative z-10 container pb-20 md:pb-28 pt-36">
          <p className="reveal type-label text-[#4A1525] mb-6">{t.hero.overline}</p>
          <h1
            className="reveal reveal-delay-1 type-display-lg text-white"
            style={{ whiteSpace: 'pre-line', fontWeight: 300, fontStyle: 'italic' }}
          >
            {t.hero.headline}
          </h1>
        </div>
      </section>

      {/* ── Story ── */}
      <section ref={storyRef} className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — text */}
            <div>
              <p className="reveal type-label text-[#4A1525] mb-4">{t.story.overline}</p>
              <h2 className="reveal reveal-delay-1 type-display-sm text-[#0C0A09] mb-10" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                {t.story.headline}
              </h2>
              <div className="flex flex-col gap-5">
                {t.story.paragraphs.map((p, i) => (
                  <p key={i} className="reveal type-body-lg text-[#5C5349]" style={{ transitionDelay: `${0.1 + i * 0.08}s` }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div className="reveal reveal-delay-2">
              <div
                style={{ aspectRatio: '3/4', background: '#E6DFD6', overflow: 'hidden' }}
                className="img-hover-scale"
              >
                <img
                  src="/images/menu/coffee-rituals/espresso.png"
                  alt="AIO Coffee — espresso ritual"
                  className="img-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section ref={valuesRef} className="section-padding-sm" style={{ background: '#F0EDE8' }}>
        <div className="container">
          <p className="reveal type-label text-[#4A1525] mb-10">{t.values.overline}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.items.map((item, i) => (
              <div
                key={i}
                className="reveal py-8 border-t border-[#D4CBBC]"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="type-label text-[#A09690] mb-4 block">{String(i + 1).padStart(2, '0')}</span>
                <h3
                  className="type-heading-lg text-[#0C0A09] mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  {item.title}
                </h3>
                <p className="type-body text-[#7A6E65]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA to Menu ── */}
      <section className="section-padding-sm" style={{ background: '#4A1525' }}>
        <div className="container text-center">
          <h3 className="type-display-sm text-white mb-6" style={{ fontStyle: 'italic', fontWeight: 300 }}>
            {lang === 'tr' ? 'Ritüellerimizi keşfet.' : 'Discover our rituals.'}
          </h3>
          <Link
            to={`${prefix}/menu`}
            className="btn-primary"
            style={{ background: '#fff', color: '#4A1525' }}
          >
            {lang === 'tr' ? 'Menüyü Gör' : 'See the Menu'}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
