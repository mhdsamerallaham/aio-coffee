// AIO Coffee — PrivacyPage
// Premium editorial Privacy Policy & KVKK / GDPR Data Protection page

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  EyeOff,
  FileText,
  UserCheck,
  CheckCircle2,
  Mail,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Building2,
  Sparkles,
} from 'lucide-react';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import SeoHead from '../../components/seo/SeoHead';
import { getSeoMetadata } from '../../content/seoContent';

const iconMap = {
  ShieldCheck: ShieldCheck,
  EyeOff: EyeOff,
  FileText: FileText,
  UserCheck: UserCheck,
};

export default function PrivacyPage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.privacy;
  const seo = getSeoMetadata('privacy', lang);
  const [activeSection, setActiveSection] = useState(t.sections?.[0]?.id || 'veri-sorumlusu');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = t.sections || [];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t.sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0C0A09] selection:bg-[#4A1525] selection:text-white">
      {/* ── Dynamic SEO & GEO Meta Tags ── */}
      <SeoHead {...seo} lang={lang} />

      {/* ── Navigation ── */}
      <SiteNav theme="light" />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO HEADER — Editorial Typography & Security Badge
          ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24 border-b border-[#E6DFD6]"
        style={{
          background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F0EA 100%)',
        }}
      >
        {/* Subtle ambient luxury backdrop glow */}
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(74,21,37,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Overline & Compliance Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="type-label px-3 py-1.5 rounded-full bg-[#4A1525]/10 text-[#4A1525] border border-[#4A1525]/15 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.badge}
              </span>
              <span className="text-[#A09690] text-xs">•</span>
              <span className="type-label text-[#A09690] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {t.lastUpdated}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="type-display-lg text-[#0C0A09] mb-6"
              style={{ fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em' }}
            >
              {t.headline}
            </motion.h1>

            {/* Subtitle / Intro text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="type-body text-[#423B35] leading-relaxed text-base md:text-lg max-w-2xl font-light"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. HIGHLIGHTS GRID — Trust & Security Pillars
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 border-b border-[#E6DFD6] bg-white/60">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.highlights?.map((item, idx) => {
              const IconComp = iconMap[item.icon] || ShieldCheck;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-[#E6DFD6] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#4A1525]/30 hover:shadow-[0_10px_30px_rgba(74,21,37,0.06)] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E6DFD6] flex items-center justify-center text-[#4A1525] group-hover:bg-[#4A1525] group-hover:text-white transition-colors mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-[#0C0A09] mb-2">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A6E65] leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. MAIN CONTENT WITH STICKY TABLE OF CONTENTS
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── Left Column: Sticky Table of Contents (4 cols) ── */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#E6DFD6] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#E6DFD6]">
                  <Sparkles className="w-4 h-4 text-[#4A1525]" />
                  <p className="type-label text-[#4A1525] tracking-widest">
                    {t.quickNavTitle}
                  </p>
                </div>

                <nav aria-label="Privacy sections navigation" className="space-y-1">
                  {t.sections?.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs md:text-sm transition-all flex items-center justify-between group ${
                          isActive
                            ? 'bg-[#4A1525] text-white font-medium shadow-sm'
                            : 'text-[#5C5349] hover:bg-[#FAF8F5] hover:text-[#0C0A09]'
                        }`}
                      >
                        <span className="truncate pr-2">
                          {sec.title}
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                            isActive
                              ? 'text-white translate-x-0.5'
                              : 'text-[#A09690] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Contact Help Pill inside sidebar */}
                <div className="mt-8 pt-6 border-t border-[#E6DFD6] space-y-3">
                  <p className="type-label text-[#A09690] text-[10px]">
                    {lang === 'tr' ? 'Veri Sorumlusu İletişim' : 'Data Privacy Officer'}
                  </p>
                  <a
                    href="mailto:info@aiocoffee.com"
                    className="inline-flex items-center gap-2 text-xs text-[#4A1525] font-medium hover:underline group"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#4A1525]" />
                    <span>info@aiocoffee.com</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Stores badge widget */}
              <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E6DFD6] text-xs text-[#7A6E65] space-y-2">
                <div className="flex items-center gap-2 text-[#0C0A09] font-medium">
                  <Building2 className="w-4 h-4 text-[#4A1525]" />
                  <span>AIO Coffee — Retail & Digital</span>
                </div>
                <p className="font-light">
                  {lang === 'tr'
                    ? 'İstanbul (Şişli / Rumeli) & İzmir (Alsancak / Gül Sokak)'
                    : 'Istanbul (Şişli / Rumeli) & Izmir (Alsancak / Gül Street)'}
                </p>
              </div>
            </aside>

            {/* ── Right Column: Policy Sections (8 cols) ── */}
            <main className="lg:col-span-8 space-y-10" id="privacy-content">
              {t.sections?.map((section, sIdx) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 p-7 md:p-10 rounded-3xl bg-white border border-[#E6DFD6] shadow-[0_6px_25px_rgba(0,0,0,0.02)] transition-all hover:border-[#4A1525]/20"
                >
                  {/* Section Title */}
                  <div className="flex items-start gap-3 pb-5 mb-6 border-b border-[#E6DFD6]">
                    <span className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E6DFD6] text-[#4A1525] font-serif text-sm font-semibold flex items-center justify-center shrink-0">
                      {String(sIdx + 1).padStart(2, '0')}
                    </span>
                    <h2 className="type-heading-lg text-[#0C0A09] font-normal leading-snug">
                      {section.title}
                    </h2>
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-4 text-sm md:text-base text-[#423B35] font-light leading-relaxed font-sans">
                    {section.paragraphs?.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Bullet Points */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3 pt-4 border-t border-[#FAF8F5]">
                      {section.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-sm md:text-base text-[#2C2723] font-light leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#4A1525] shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Contact / Official Response Card for Section 8 */}
                  {section.contactInfo && (
                    <div className="mt-8 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD6] space-y-4">
                      <div>
                        <p className="type-label text-[#A09690] mb-1">
                          {lang === 'tr' ? 'Şirket Ünvanı' : 'Company Name'}
                        </p>
                        <p className="font-serif text-base text-[#0C0A09] font-medium">
                          {section.contactInfo.company}
                        </p>
                      </div>

                      <div>
                        <p className="type-label text-[#A09690] mb-1">
                          {lang === 'tr' ? 'Resmi Başvuru E-Postası' : 'Official Application Email'}
                        </p>
                        <a
                          href={`mailto:${section.contactInfo.email}`}
                          className="text-[#4A1525] font-medium underline underline-offset-4 hover:text-[#0C0A09] transition-colors"
                        >
                          {section.contactInfo.email}
                        </a>
                      </div>

                      <div>
                        <p className="type-label text-[#A09690] mb-2">
                          {lang === 'tr' ? 'Lokasyonlar & Posta Adresleri' : 'Locations & Postal Addresses'}
                        </p>
                        <ul className="space-y-1.5 text-xs md:text-sm text-[#5C5349]">
                          {section.contactInfo.stores?.map((st, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4A1525]" />
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-[#E6DFD6]">
                        <p className="text-xs text-[#7A6E65] italic font-sans">
                          {section.contactInfo.note}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))}

              {/* ── Bottom Reassurance Card ── */}
              <div
                className="p-8 md:p-10 rounded-3xl text-white relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2C0D16 0%, #0C0A09 100%)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-80 h-80 bg-[#4A1525]/30 rounded-full blur-3xl pointer-events-none"
                />
                <div className="relative z-10 max-w-xl space-y-4">
                  <span className="type-label text-[#A85470] tracking-widest">
                    {lang === 'tr' ? 'Şeffaflık & Güven' : 'Transparency & Trust'}
                  </span>
                  <h3 className="type-heading-lg text-white font-light">
                    {lang === 'tr'
                      ? 'Kişisel verilerinizle ilgili her türlü sorunuz için buradayız.'
                      : 'We are here for any questions regarding your personal data.'}
                  </h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {lang === 'tr'
                      ? 'Veri koruma ekibimiz tüm taleplerinizi yasal süre içerisinde titizlikle inceleyip yanıtlamaktadır.'
                      : 'Our data protection officer reviews and responds to all inquiries within legal statutory timelines.'}
                  </p>
                  <div className="pt-2">
                    <a
                      href="mailto:info@aiocoffee.com"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0C0A09] font-medium text-xs sm:text-sm hover:bg-rose-50 transition-colors shadow-lg"
                    >
                      <Mail className="w-4 h-4 text-[#4A1525]" />
                      <span>{lang === 'tr' ? 'Veri Sorumlusuna Yazın' : 'Write to Data Controller'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </main>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />
    </div>
  );
}
