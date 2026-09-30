// AIO Coffee — AboutPage
// High-End Editorial Brand Manifesto: "ALL IN ONE"

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import SpotlightCard from '../../components/motion/SpotlightCard';
import Magnetic from '../../components/motion/Magnetic';
import InView from '../../components/motion/InView';
import InfiniteMarquee from '../../components/motion/InfiniteMarquee';
import { HaikeiOrganicBlob } from '../../components/ui/HaikeiDecor';

export default function AboutPage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.about;
  const prefix = lang === 'tr' ? '/tr' : '/en';
  const menuHref = `${prefix}/menu`;
  const storesHref = lang === 'tr' ? '/tr/magazalar' : '/en/stores';

  const marqueeItems = [
    'ALL IN ONE',
    'COFFEE',
    'FOOD',
    'WELLNESS',
    'MUSIC',
    'PEOPLE',
    'MAKE IT A RITUAL',
    'ESTABLISHED 2025',
    'ISTANBUL & IZMIR',
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0C0A09] selection:bg-[#4A1525] selection:text-white">
      {/* ── Fixed Navigation Header ── */}
      <SiteNav theme="dark" />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO SECTION — Cinematic Editorial Manifesto Opening
          ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-[#0A0807] text-white pt-32 pb-20 md:pb-28"
        aria-label="Manifesto Hero"
      >
        {/* Organic Background Lighting */}
        <HaikeiOrganicBlob
          className="w-[550px] h-[550px] -top-24 -left-28 pointer-events-none"
          color1="#4A1525"
          color2="#1F080F"
          opacity={0.3}
        />
        <HaikeiOrganicBlob
          className="w-[450px] h-[450px] top-1/3 -right-20 pointer-events-none"
          color1="#C59B63"
          color2="#2E1C0A"
          opacity={0.15}
        />

        {/* Ambient Subtle Background Texture / Photo */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity pointer-events-none">
          <img
            src="/images/menu/brew-rituals/chemex.png"
            alt="AIO Coffee Ritual"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-[#0A0807]/80 to-[#0A0807]/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          {/* Overline & Brand Concept Pill */}
          <InView direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.25em] bg-white/10 text-stone-300 border border-white/15 backdrop-blur-md">
                {t.hero.overline}
              </span>
              <span className="text-xs font-mono tracking-[0.3em] text-[#C59B63]">
                {t.hero.taglineTop}
              </span>
            </div>
          </InView>

          {/* Main Headline */}
          <InView direction="up" delay={0.2}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.12] tracking-tight max-w-4xl text-white mb-8">
              {t.hero.headline.split('\n').map((line, idx) => (
                <span key={idx} className="block">
                  {idx === 0 ? (
                    <span className="italic text-[#E8DFD8]">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              ))}
            </h1>
          </InView>

          {/* Manifesto Intro Paragraph */}
          <InView direction="up" delay={0.3}>
            <p className="text-lg sm:text-xl md:text-2xl text-stone-300 font-light leading-relaxed max-w-2xl border-l-2 border-[#C59B63]/60 pl-6 my-4">
              {t.hero.intro}
            </p>
          </InView>
        </div>

        {/* Bottom Editorial Accent Line */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono tracking-widest text-stone-400">
          <span>AIO COFFEE · EST. 2025</span>
          <span>ISTANBUL & IZMIR</span>
          <span>MAKE IT A RITUAL</span>
        </div>
      </section>

      {/* ── Continuous Marquee Ticker ── */}
      <div className="bg-[#14100E] border-y border-stone-800 text-stone-300">
        <InfiniteMarquee
          items={marqueeItems}
          speed={24}
          itemClassName="text-xs font-mono tracking-[0.3em] uppercase text-stone-300"
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. RHYTHM OF MOMENTS — Küçük Anların Değeri
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 relative overflow-hidden bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              <InView direction="up" delay={0.1}>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A1525] block mb-4">
                  01 · {t.moments.overline}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 leading-tight mb-8">
                  {t.moments.headline}
                </h2>
              </InView>

              <InView direction="up" delay={0.2}>
                <div className="relative pl-6 sm:pl-8 border-l-2 border-[#4A1525]/30 space-y-6">
                  <p className="text-xl sm:text-2xl text-stone-800 font-serif italic leading-relaxed">
                    "{t.moments.quote}"
                  </p>
                  <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed font-light">
                    {t.moments.subquote}
                  </p>
                </div>
              </InView>
            </div>

            {/* Right Visual Mood Plate */}
            <div className="lg:col-span-5">
              <InView direction="left" delay={0.25}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-900 aspect-[4/5] border border-stone-200">
                  <img
                    src="/images/menu/coffee-rituals/espresso.png"
                    alt="AIO Coffee Ritual"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Photo Caption Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                    <p className="text-[11px] font-mono tracking-widest text-[#C59B63] uppercase mb-1">
                      ALL IN ONE MOMENTS
                    </p>
                    <p className="text-xs text-stone-300 font-light">
                      {lang === 'tr'
                        ? 'Sessizlik, sohbet, mola ve paylaşılan o tek an.'
                        : 'Silence, conversation, pause, and that single shared breath.'}
                    </p>
                  </div>
                </div>
              </InView>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. CORE PHILOSOPHY — "ALL IN ONE" & "İYİ HİSSETTİREN ŞEYLER"
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#F3EFEA] border-y border-[#E2DBD1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          
          <InView direction="up" delay={0.1}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.25em] bg-[#4A1525]/10 text-[#4A1525] border border-[#4A1525]/15 mb-6">
              02 · {t.philosophy.overline}
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#4A1525] tracking-tight mb-8">
              {t.philosophy.headline}
            </h2>
          </InView>

          <InView direction="up" delay={0.2}>
            <p className="text-2xl sm:text-3xl md:text-4xl text-stone-900 font-serif font-light leading-snug max-w-4xl mx-auto mb-10">
              "{t.philosophy.statement}"
            </p>
          </InView>

          <InView direction="up" delay={0.3}>
            <div className="max-w-3xl mx-auto space-y-6 text-stone-600 font-light text-base sm:text-lg leading-relaxed">
              <p>{t.philosophy.description}</p>
              
              {/* Highlight Banner */}
              <div className="inline-block p-6 sm:p-8 rounded-3xl bg-white shadow-lg shadow-stone-300/40 border border-[#E2DBD1] text-stone-900">
                <span className="block text-xl sm:text-2xl font-serif italic text-[#4A1525]">
                  "{t.philosophy.highlight}"
                </span>
              </div>
            </div>
          </InView>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. THE 5 PILLARS OF AIO — COFFEE · FOOD · WELLNESS · MUSIC · PEOPLE
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 bg-[#0E0B0A] text-white relative overflow-hidden">
        {/* Glow Element */}
        <HaikeiOrganicBlob
          className="w-[600px] h-[600px] top-1/2 -translate-y-1/2 -right-40 pointer-events-none"
          color1="#4A1525"
          color2="#18070C"
          opacity={0.35}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          
          <InView direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-stone-800 pb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C59B63] block mb-2">
                  03 · PILLARS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                  {t.pillars.title}
                </h2>
              </div>
              <p className="text-xs font-mono tracking-widest text-stone-400">
                AIO LIFESTYLE ECOSYSTEM
              </p>
            </div>
          </InView>

          {/* 5 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.pillars.items.map((item, idx) => (
              <InView key={item.key} direction="up" delay={0.1 + idx * 0.08}>
                <SpotlightCard
                  spotlightColor="rgba(197, 155, 99, 0.18)"
                  className="h-full bg-stone-900/60 border-stone-800/80 p-6 flex flex-col justify-between hover:border-[#C59B63]/40 transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-stone-500 block mb-6">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-white mb-3 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-stone-300 text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono tracking-wider text-stone-400">
                    <span>AIO · {item.key}</span>
                    <span className="text-[#C59B63]">●</span>
                  </div>
                </SpotlightCard>
              </InView>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. LIVING SPACE & NEW SOCIALIZATION — Morning Party & Gece
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="bg-[#1C1715] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-stone-800 relative overflow-hidden shadow-2xl">
            {/* Background Blob */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#4A1525]/30 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl">
              <InView direction="up" delay={0.1}>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C59B63] block mb-4">
                  04 · {t.livingSpace.overline}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-white mb-8">
                  {t.livingSpace.headline}
                </h2>
              </InView>

              <InView direction="up" delay={0.2}>
                <div className="space-y-6 text-stone-300 font-light text-base sm:text-lg leading-relaxed mb-10">
                  <p>{t.livingSpace.paragraph1}</p>
                  <p className="text-white font-normal text-lg sm:text-xl border-l-2 border-[#C59B63] pl-6 my-6">
                    {t.livingSpace.paragraph2}
                  </p>
                </div>
              </InView>

              <InView direction="up" delay={0.3}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md inline-block">
                  <p className="font-serif text-xl sm:text-2xl italic text-[#E8DFD8]">
                    "{t.livingSpace.credo}"
                  </p>
                </div>
              </InView>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          6. SPIRIT & CHARACTER — Şehirli, Özgür, Sade ve Meraklı
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#F5EFEB] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <InView direction="up" delay={0.1}>
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A1525] block mb-3">
                05 · {t.character.overline}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 leading-tight">
                {t.character.headline}
              </h2>
            </div>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {t.character.traits.map((trait, idx) => (
              <InView key={trait.number} direction="up" delay={0.15 + idx * 0.1}>
                <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-serif text-[#C59B63] block mb-4">
                      {trait.number}
                    </span>
                    <h3 className="font-serif text-2xl text-stone-900 font-light mb-3">
                      {trait.title}
                    </h3>
                    <p className="text-stone-600 font-light leading-relaxed">
                      {trait.body}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-100 text-[11px] font-mono tracking-widest text-stone-400 uppercase">
                    AIO CHARACTER
                  </div>
                </div>
              </InView>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. GLOBAL VISION — "HAYALİMİZ KAHVEDEN ÇOK DAHA BÜYÜK"
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 bg-[#0A0807] text-white relative overflow-hidden">
        <HaikeiOrganicBlob
          className="w-[500px] h-[500px] -bottom-20 -left-20 pointer-events-none"
          color1="#4A1525"
          color2="#1C0910"
          opacity={0.4}
        />

        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          
          <InView direction="up" delay={0.1}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.25em] bg-white/10 text-stone-300 border border-white/15 mb-6">
              06 · {t.vision.overline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
              {t.vision.headline}
            </h2>
          </InView>

          <InView direction="up" delay={0.2}>
            <p className="text-lg sm:text-xl text-stone-300 font-light leading-relaxed max-w-3xl mx-auto mb-12">
              {t.vision.body}
            </p>
          </InView>

          <InView direction="up" delay={0.25}>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C59B63] mb-8">
              {t.vision.closingNote}
            </p>
          </InView>

          {/* 4 Pillars of Familiar Connection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {t.vision.manifestoList.map((item, idx) => (
              <InView key={idx} direction="up" delay={0.3 + idx * 0.08}>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                  <span className="font-serif text-lg sm:text-xl text-stone-100 font-light">
                    {item}
                  </span>
                </div>
              </InView>
            ))}
          </div>

          {/* Final Brand Signature */}
          <InView direction="up" delay={0.5}>
            <div className="pt-10 border-t border-white/10">
              <p className="font-serif text-3xl sm:text-4xl text-white tracking-widest uppercase mb-2">
                {t.vision.signature}
              </p>
              <p className="text-sm font-mono tracking-[0.3em] text-[#C59B63] uppercase">
                {t.vision.subSignature}
              </p>
            </div>
          </InView>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          8. CALL TO ACTION — Menü & Mağazalarımız
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#4A1525] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <InView direction="up" delay={0.1}>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E8DFD8] block mb-4">
              AIO COFFEE · RITUALS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-8">
              {lang === 'tr' ? 'Ritüelinizi Seçin.' : 'Choose Your Ritual.'}
            </h3>
            <p className="text-stone-200 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto">
              {lang === 'tr'
                ? 'İstanbul ve İzmir mağazalarımızda veya dijital seçkilerimizde AIO dünyasını deneyimleyin.'
                : 'Experience the world of AIO across our stores in Istanbul & Izmir or in our digital menu.'}
            </p>
          </InView>

          <InView direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.2}>
                <Link
                  to={menuHref}
                  className="px-8 py-4 rounded-full bg-white text-[#4A1525] text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FAF8F5] hover:shadow-xl hover:scale-105 inline-block"
                >
                  {t.cta.menu} →
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  to={storesHref}
                  className="px-8 py-4 rounded-full bg-transparent text-white border border-white/40 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white/10 hover:border-white inline-block"
                >
                  {t.cta.stores}
                </Link>
              </Magnetic>
            </div>
          </InView>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />
    </div>
  );
}
