// AIO Coffee — FranchisePage
// Editorial franchise & partnership model based on official brand partnership standards
// Fully integrated with Watermelon UI, Motion Primitives, and Haikei design system
// STRICT POLICY: ZERO NUMBERS / ZERO PRICES / NO SPECIFIC COSTS

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useLangStore from '../../store/langStore';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';

// Motion & UI Design System
import TextReveal from '../../components/motion/TextReveal';
import InView from '../../components/motion/InView';
import Magnetic from '../../components/motion/Magnetic';
import SpotlightCard from '../../components/motion/SpotlightCard';
import InfiniteMarquee from '../../components/motion/InfiniteMarquee';
import { HaikeiTopography, HaikeiOrganicBlob } from '../../components/ui/HaikeiDecor';

// Marquee Items for Franchise
const FRANCHISE_MARQUEE = [
  'MİMARİ KONSEPT STANDARDI',
  'MERKEZİ TEDARİK GÜVENCESİ',
  'AIO BARİSTA AKADEMİSİ',
  'BÖLGE KORUMASI VE FİZİBİLİTE',
  'ÖZEL İMZA REÇETELER',
  'MERKEZİ PAZARLAMA VE PR DESTEĞİ',
  'DUYUSAL MARKA DENEYİMİ',
  'SÜREKLİ KALİTE DENETİMİ',
  'TESCİLLİ KNOW-HOW',
];

// 6 Core Partnership Pillars Extracted from Brand Agreement Draft
const PARTNERSHIP_PILLARS = [
  {
    id: 'architecture',
    number: '01',
    badge: { tr: 'Mimari Standart', en: 'Architectural Standard' },
    title: { tr: 'Mimari Kimlik ve Projelendirme', en: 'Architectural Concept & Design' },
    summary: {
      tr: 'Mağazanın cephe tasarımından özel bar ünitesine, malzeme ve renk kararlarından 3D görselleştirme ve elektrik-mekanik uygulama projelerine kadar tüm mimari süreç AIO standartlarıyla yönetilir.',
      en: 'From facade design to custom coffee bar layouts, material palettes, 3D renderings, and complete electrical-mechanical execution projects, all architecture follows AIO signature guidelines.',
    },
    bullets: [
      { tr: 'Özel tasarım barista barı ve ergonomik servis adası', en: 'Custom designer barista bar & ergonomic service island' },
      { tr: 'Doğal taş, sıcak keten dokuları ve özel üretim mobilyalar', en: 'Natural stone, warm linen textures & bespoke furniture' },
      { tr: 'Eksiksiz mimari uygulama ve anahtar teslim kurulum rehberliği', en: 'Turnkey architectural supervision & execution guidelines' },
    ],
  },
  {
    id: 'supply-chain',
    number: '02',
    badge: { tr: 'Merkezi Tedarik', en: 'Centralized Supply' },
    title: { tr: 'Merkezi Ürün ve Tedarik Sistemi', en: 'Centralized Supply Chain System' },
    summary: {
      tr: 'Marka standardı açısından kritik olan specialty kahve çekirdekleri, Uji seremoniyel matcha, özel içecek bazları, imza soslar ve logolu ambalajlar yalnızca AIO onaylı merkezi tedarikten sağlanır.',
      en: 'Core specialty coffee beans, Japanese ceremonial matcha from Uji, house drink bases, artisanal sauces, and branded packaging are exclusively supplied via AIO verified central logistics.',
    },
    bullets: [
      { tr: 'Doğrudan çiftliklerden temin edilen taze kavrum specialty çekirdekler', en: 'Freshly roasted specialty beans sourced directly from estates' },
      { tr: 'Töresel Japon matcha ve özel içecek reçete bazları', en: 'Ceremonial Japanese matcha & house beverage bases' },
      { tr: 'Özel logolu ambalaj, bardak ve sarf malzemesi güvencesi', en: 'Custom branded packaging, glassware, and paper goods' },
    ],
  },
  {
    id: 'recipes',
    number: '03',
    badge: { tr: 'Gastronomi', en: 'Gastronomy Standard' },
    title: { tr: 'Reçete, Menü ve Sunum Standartları', en: 'Recipe, Menu & Presentation Standard' },
    summary: {
      tr: 'AIO menüsündeki tüm ürünlerin reçeteleri, gramajları, hazırlık yöntemleri ve sunum ritüelleri standardize edilmiştir. Her fincanda aynı mükemmel lezzet ve görsel zarafet garanti edilir.',
      en: 'Recipes, gram allocations, extraction parameters, and aesthetic presentation rituals across the entire AIO menu are strictly standardized for 100% consistent guest experiences.',
    },
    bullets: [
      { tr: 'Gramaj ve sıcaklık parametreleri tescilli kahve ritüelleri', en: 'Precision gram and temperature calibrated coffee rituals' },
      { tr: 'All-day gourmet brunch ve artizan fırın reçeteleri', en: 'All-day gourmet brunch and artisanal bakery preparations' },
      { tr: 'Şubeler arası tam lezzet ve servis tutarlılığı', en: 'Flawless taste and presentation uniformity across all stores' },
    ],
  },
  {
    id: 'academy',
    number: '04',
    badge: { tr: 'Eğitim & Akademi', en: 'Training Academy' },
    title: { tr: 'Personel ve Barista Akademisi', en: 'Staff & Barista Academy' },
    summary: {
      tr: 'Açılış öncesi ve sonrasında tüm ekipler AIO Barista Akademisi kapsamında kahve zanaatı, demleme teknikleri, servis dili, misafir deneyimi, hijyen ve marka kültürü eğitimlerinden geçirilir.',
      en: 'Before and throughout store operations, teams undergo rigorous AIO Barista Academy training covering coffee craftsmanship, brew science, service etiquette, hygiene, and hospitality culture.',
    },
    bullets: [
      { tr: 'Espresso kalibrasyonu, latte art ve pour-over uzmanlık eğitimi', en: 'Espresso calibration, latte art & pour-over masterclasses' },
      { tr: 'Zarif servis dili, karşılama ve üst düzey misafir deneyimi', en: 'Refined hospitality etiquette, guest care & atmosphere' },
      { tr: 'Sürekli tazeleme ve mevsimsel menü adaptasyon eğitimleri', en: 'Ongoing refresher courses and seasonal menu onboardings' },
    ],
  },
  {
    id: 'opening-support',
    number: '05',
    badge: { tr: 'Operasyonel Destek', en: 'Operational Support' },
    title: { tr: 'Açılış ve Saha Süpervizyonu Desteği', en: 'Grand Opening & Field Supervision' },
    summary: {
      tr: 'Açılış öncesi hazırlık kontrolleri, ekipman kalibrasyonları ve açılış döneminde merkez süpervizyon ekibinin sahada birebir rehberliğiyle kusursuz bir başlangıç sağlanır.',
      en: 'Pre-opening readiness audits, equipment calibrations, and on-site expert headquarters supervision ensure a flawless launch and smooth initial operational phase.',
    },
    bullets: [
      { tr: 'Açılış haftasında merkez uzman ekip saha desteği', en: 'Hands-on headquarters team presence during opening week' },
      { tr: 'Entegre POS, stok takibi ve operasyonel iş akışı kurulumu', en: 'Integrated POS, inventory management & workflow setup' },
      { tr: 'Düzenli operasyonel rehberlik ve denetim geri bildirimleri', en: 'Continuous operational mentorship & quality assurance' },
    ],
  },
  {
    id: 'territory',
    number: '06',
    badge: { tr: 'Lokasyon & Koruma', en: 'Territory Protection' },
    title: { tr: 'Bölge Koruması ve Lokasyon Analizi', en: 'Territory Protection & Location Feasibility' },
    summary: {
      tr: 'İş ortaklarımızın sürdürülebilir ticari başarısı adına hedef lokasyonun yaya trafiği, mimari uygunluğu ve potansiyeli analiz edilir; tanımlanmış koruma alanı yaklaşımı uygulanır.',
      en: 'To safeguard sustainable partner success, pedestrian traffic, architectural suitability, and commercial density are scrutinized, backed by defined territory protection principles.',
    },
    bullets: [
      { tr: 'Detaylı cadde, çevre profili ve yaya trafiği fizibilitesi', en: 'In-depth street assessment, foot traffic & demographic review' },
      { tr: 'Yatırımcının başarısını koruyan tanımlanmış bölge koruması', en: 'Designated territory protection safeguarding store reach' },
      { tr: 'Kapalı ve açık alan dengesini gözeten mekan onayı', en: 'Approval for balanced indoor and open-air guest atmospheres' },
    ],
  },
];

// Brand Experience Pillars
const EXPERIENCE_PILLARS = [
  {
    icon: '◇',
    title: { tr: 'Duyusal Mağaza Kimliği', en: 'Sensory Brand Identity' },
    desc: {
      tr: 'AIO imza ortam kokusu, küratörlü müzik listeleri, mimari ışık tasarımı ve çalışan giyim zarafeti ile çok duyulu bir atmosfer.',
      en: 'A multisensory ambiance comprising AIO signature room aroma, curated playlists, architectural lighting, and bespoke staff apparel.',
    },
  },
  {
    icon: '◈',
    title: { tr: 'Merkezi Pazarlama ve PR', en: 'Centralized Marketing & PR' },
    desc: {
      tr: 'Ulusal ve yerel reklam kampanyaları, influencer iş birlikleri, profesyonel fotoğraf/video prodüksiyonları ve marka itibar yönetimi.',
      en: 'National and regional campaigns, high-impact influencer collaborations, studio photography productions, and brand prestige management.',
    },
  },
  {
    icon: '❖',
    title: { tr: 'Düzenli Kalite Denetimi', en: 'Continuous Quality Audits' },
    desc: {
      tr: 'Ürün kalitesi, reçete uyumu, servis hızı, hijyen ve mimari estetiği kapsayan periyodik denetimlerle sürdürülebilir mükemmellik.',
      en: 'Scheduled inspections covering extraction quality, recipe compliance, hygiene, and architectural upkeep to guarantee lasting excellence.',
    },
  },
  {
    icon: '◇',
    title: { tr: 'Tescilli Know-How ve Gizlilik', en: 'Proprietary Know-How' },
    desc: {
      tr: 'Kapsamlı operasyon el kitapları, reçete kılavuzları ve kurumsal standartlarla korunan güvenilir ticari ortaklık temeli.',
      en: 'Comprehensive operational manuals, confidential recipe guides, and institutional standards anchoring a trusted partnership foundation.',
    },
  },
];

// 4-Step Partnership Journey
const PARTNERSHIP_STEPS = [
  {
    step: '01',
    title: { tr: 'Ön Başvuru & Görüşme', en: 'Application & Discovery' },
    desc: {
      tr: 'Web formumuz üzerinden iletilen ön başvuru incelenir; vizyon ve beklentilerin değerlendirildiği ilk toplantı gerçekleştirilir.',
      en: 'The online application is reviewed, followed by an introductory meeting to align on vision, standards, and commercial aspirations.',
    },
  },
  {
    step: '02',
    title: { tr: 'Lokasyon Analizi & Onay', en: 'Location Analysis & Approval' },
    desc: {
      tr: 'Hedeflenen cadde veya bölgenin yaya trafiği, mimari uygunluğu ve potansiyeli uzman ekibimizce yerinde analiz edilir.',
      en: 'The candidate premises undergo comprehensive on-site analysis for pedestrian traffic, frontage, and spatial layout viability.',
    },
  },
  {
    step: '03',
    title: { tr: 'Mimari Proje & Kurulum', en: 'Architectural Build & Setup' },
    desc: {
      tr: 'AIO konseptine uygun 3D görselleştirme, bar tasarımı ve uygulama projeleri hazırlanır; anahtar teslim kurulum süreci başlar.',
      en: 'Custom 3D layouts, bar engineering, and architectural construction drawings are produced, launching the turnkey execution phase.',
    },
  },
  {
    step: '04',
    title: { tr: 'Akademi Eğitimi & Açılış', en: 'Academy Training & Launch' },
    desc: {
      tr: 'Barista ve servis ekibi AIO Akademisi’nde eğitilir, açılış hazırlıkları tamamlanır ve merkez ekip desteğiyle kapılar açılır.',
      en: 'Baristas and front-of-house teams complete extensive AIO Academy programs, culminating in a supported grand opening ritual.',
    },
  },
];

// Target WhatsApp destination (kept private and never displayed on UI)
const WA_TARGET_DEST = '905326668654';

export default function FranchisePage() {
  const { lang } = useLangStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityDistrict: '',
    propertyStatus: 'searching', // 'owned' | 'renting' | 'searching'
    experience: '',
    timeline: 'soon', // 'immediate' | 'soon' | 'within-year'
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [waLink, setWaLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const propertyLabels = {
      owned: lang === 'tr' ? 'Uygun Mülk Sahibiyim (Cadde Mağazası)' : 'Candidate location owned (Street premises)',
      renting: lang === 'tr' ? 'Kiralama / Sözleşme Aşamasındayım' : 'In lease negotiations for premises',
      searching: lang === 'tr' ? 'Henüz Lokasyon Belirlenmedi / Arayıştayım' : 'Seeking candidate location',
    };

    const timelineLabels = {
      immediate: lang === 'tr' ? 'Hemen (1 - 3 Ay İçerisinde)' : 'Immediate (Within 1-3 Months)',
      soon: lang === 'tr' ? 'Önümüzdeki 3 - 6 Ay' : 'Next 3-6 Months',
      'within-year': lang === 'tr' ? 'Bu Yıl İçerisinde' : 'Within Current Year',
    };

    const lines = lang === 'tr' ? [
      '*AIO COFFEE — FRANCHISE ÖN BAŞVURUSU*',
      '----------------------------------------',
      `*Ad Soyad:* ${formData.fullName.trim()}`,
      `*E-posta:* ${formData.email.trim()}`,
      `*Telefon:* ${formData.phone.trim()}`,
      `*Hedef Şehir / İlçe:* ${formData.cityDistrict.trim()}`,
      `*Lokasyon Durumu:* ${propertyLabels[formData.propertyStatus] || formData.propertyStatus}`,
      `*Planlanan Takvim:* ${timelineLabels[formData.timeline] || formData.timeline}`,
      `*Ticari / Sektörel Deneyim:* ${formData.experience.trim() || 'Belirtilmedi'}`,
      `*Ek Bilgi & Planlar:* ${formData.message.trim() || 'Belirtilmedi'}`,
      '----------------------------------------',
      `*Tarih:* ${new Date().toLocaleDateString('tr-TR')}`,
    ] : [
      '*AIO COFFEE — FRANCHISE INQUIRY*',
      '----------------------------------------',
      `*Full Name:* ${formData.fullName.trim()}`,
      `*Email:* ${formData.email.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
      `*Target City & District:* ${formData.cityDistrict.trim()}`,
      `*Premises Status:* ${propertyLabels[formData.propertyStatus] || formData.propertyStatus}`,
      `*Target Timeline:* ${timelineLabels[formData.timeline] || formData.timeline}`,
      `*Commercial Background:* ${formData.experience.trim() || 'Not specified'}`,
      `*Additional Notes:* ${formData.message.trim() || 'Not specified'}`,
      '----------------------------------------',
      `*Date:* ${new Date().toLocaleDateString('en-US')}`,
    ];

    const waText = lines.join('\n');
    const targetUrl = `https://wa.me/${WA_TARGET_DEST}?text=${encodeURIComponent(waText)}`;
    setWaLink(targetUrl);

    // Open WhatsApp in new tab / application
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback if blocked by browser pop-up blocker
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0C0A09] selection:bg-[#4A1525] selection:text-white">
      {/* ── Dynamic Island Navigation ── */}
      <SiteNav theme="dark" />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO — Haute Partnership & Franchise Overview
          ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-[#0A0807] text-white pt-28 pb-16 lg:py-36"
        aria-label="Franchise Hero"
      >
        {/* Haikei Background Decor */}
        <HaikeiOrganicBlob
          className="w-[500px] h-[500px] -top-32 -left-32"
          color1="#5E172E"
          color2="#3B0D1C"
          opacity={0.32}
        />
        <HaikeiOrganicBlob
          className="w-[600px] h-[600px] -bottom-32 -right-32"
          color1="#C59B63"
          color2="#4A1525"
          opacity={0.18}
        />
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <HaikeiTopography strokeColor="#C59B63" opacity={0.16} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full">
          <div className="max-w-3xl">
            
            {/* Top Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/6 border border-white/12 backdrop-blur-md mb-8"
            >
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-200">
                {lang === 'tr' ? 'AIO ALL IN ONE • FRANCHISE & İŞ ORTAKLIĞI MODELİ' : 'AIO ALL IN ONE • FRANCHISE & PARTNERSHIP MODEL'}
              </span>
            </motion.div>

            {/* Headline with TextReveal */}
            <TextReveal
              as="h1"
              delay={0.1}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white mb-6"
            >
              {lang === 'tr'
                ? 'Specialty Kahve Kültürünü Birlikte Büyütelim.'
                : 'Expanding the Specialty Coffee Ritual Together.'}
            </TextReveal>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg md:text-xl font-light text-stone-300 max-w-2xl leading-relaxed mb-10"
            >
              {lang === 'tr'
                ? 'Ödünsüz mimari kimlik, tescilli know-how, merkezi tedarik güvencesi ve kusursuz misafirperverlik standartlarıyla kurgulanan sürdürülebilir kurumsal ortaklık modeli.'
                : 'A sustainable corporate partnership framework built on uncompromising architectural identity, proprietary know-how, central supply assurance, and refined hospitality standards.'}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#application-form"
                  className="btn-luxury-primary text-xs sm:text-sm py-4 px-8 shadow-xl shadow-[#4A1525]/40 group"
                >
                  <span>{lang === 'tr' ? 'Ön Başvuru Yap' : 'Apply for Franchise'}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#partnership-standards"
                  className="btn-luxury-ghost text-xs sm:text-sm py-4 px-7 border-white/20 text-stone-200 hover:text-white"
                >
                  <span>{lang === 'tr' ? 'Ortaklık Standartları' : 'Partnership Standards'}</span>
                  <span>↓</span>
                </a>
              </Magnetic>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. MARQUEE RIBBON
          ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#120F0D] border-y border-white/10 text-stone-300 py-2 overflow-hidden" aria-hidden="true">
        <InfiniteMarquee
          items={FRANCHISE_MARQUEE}
          speed={34}
          className="text-xs tracking-[0.22em] font-medium uppercase font-sans"
          itemClassName="text-stone-300 hover:text-white transition-colors"
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. AIO YATIRIM VE ORTAKLIK STANDARTLARI (PDF'DEN 6 SÜTUN)
          ════════════════════════════════════════════════════════════════ */}
      <section id="partnership-standards" className="py-24 md:py-36 bg-[#FAF8F5] relative overflow-hidden" aria-label="Franchise Standartları">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20">
          <HaikeiTopography strokeColor="#4A1525" opacity={0.12} />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <InView variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A1525] mb-3 inline-block">
                {lang === 'tr' ? 'KURUMSAL ÇERÇEVE & YATIRIM STANDARDI' : 'CORPORATE FRAMEWORK & STANDARDS'}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#0C0A09] leading-tight">
                {lang === 'tr' ? 'AIO Ortaklık Ekosistemi' : 'The AIO Partnership Ecosystem'}
              </h2>
              <p className="text-stone-600 font-light text-base sm:text-lg mt-4 leading-relaxed">
                {lang === 'tr'
                  ? 'Sözleşme taslağımızda ve operasyon modelimizde tanımlanan, her mağazamızda aynı üst düzey kalite ve misafir deneyimini teminat altına alan kurumsal ilkelerimiz.'
                  : 'Our established operational guidelines and quality charters that ensure uniform excellence and guest satisfaction across all partner locations.'}
              </p>
            </InView>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERSHIP_PILLARS.map((pillar, idx) => (
              <InView key={pillar.id} variant="fade-up" delay={0.08 * idx}>
                <SpotlightCard
                  spotlightColor="rgba(74, 21, 37, 0.12)"
                  className="bg-white border-stone-200/90 rounded-3xl p-7 sm:p-8 h-full flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500"
                >
                  <div>
                    {/* Top Row: Number & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-3xl text-[#4A1525] font-light">
                        {pillar.number}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#FAF5F7] border border-[#EEDBE0] text-[10px] font-bold uppercase tracking-wider text-[#4A1525]">
                        {pillar.badge[lang]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-[#0C0A09] font-normal mb-3 leading-snug">
                      {pillar.title[lang]}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                      {pillar.summary[lang]}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2.5 pt-4 border-t border-stone-100">
                      {pillar.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2.5 text-xs text-stone-700 font-light">
                          <span className="text-[#C59B63] mt-0.5 font-bold">✓</span>
                          <span>{b[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] uppercase tracking-wider text-[#4A1525] font-semibold">
                    <span>AIO Standart</span>
                    <span>•</span>
                  </div>
                </SpotlightCard>
              </InView>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. MARKA DENEYİMİ VE KALİTE GÜVENCESİ (Koyu Zemin)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-[#0E0C0B] text-white overflow-hidden" aria-label="Marka Deneyimi">
        <HaikeiOrganicBlob
          className="w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          color1="#4A1525"
          color2="#C59B63"
          opacity={0.16}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <InView variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C59B63] mb-3 inline-block">
                {lang === 'tr' ? 'DUYUSAL KİMLİK & SÜREKLİ DENETİM' : 'SENSORY IDENTITY & CONTINUOUS AUDIT'}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight">
                {lang === 'tr' ? 'Kusursuz Misafir Deneyimi' : 'Uncompromising Guest Experience'}
              </h2>
              <p className="text-stone-300 font-light text-sm sm:text-base mt-4">
                {lang === 'tr'
                  ? 'AIO mağazalarında kahve bir içecekten öte; koku, müzik, servis dili ve mimari zarafetin bir araya geldiği bütünsel bir marka ritüelidir.'
                  : 'At AIO stores, coffee transcends a mere beverage; it is a holistic brand ritual blending aroma, acoustics, service etiquette, and architectural grace.'}
              </p>
            </InView>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCE_PILLARS.map((item, idx) => (
              <InView key={idx} variant="fade-up" delay={0.1 * idx}>
                <SpotlightCard
                  spotlightColor="rgba(197, 155, 99, 0.16)"
                  className="bg-white/4 border-white/10 p-6 sm:p-7 rounded-2xl h-full flex flex-col justify-between backdrop-blur-md"
                >
                  <div>
                    <span className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center text-lg text-[#C59B63] mb-5 border border-white/10">
                      {item.icon}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal mb-3">
                      {item.title[lang]}
                    </h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      {item.desc[lang]}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/8 text-[11px] uppercase tracking-wider text-[#C59B63] flex items-center justify-between">
                    <span>Kurumsal Güvence</span>
                    <span>✓</span>
                  </div>
                </SpotlightCard>
              </InView>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. ORTAKLIK YOL HARİTASI (4 ADIM)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-[#F4EFEA] border-y border-stone-300/70" aria-label="Ortaklık Süreci">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <InView variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A1525]">
                {lang === 'tr' ? 'YOL HARİTASI' : 'ROADMAP'}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#0C0A09] mt-2">
                {lang === 'tr' ? '4 Adımda AIO İş Ortaklığı' : '4-Step Partnership Journey'}
              </h2>
            </InView>
            <InView variant="fade-up" delay={0.15}>
              <p className="text-sm sm:text-base text-stone-600 font-light max-w-md">
                {lang === 'tr'
                  ? 'İlk tanışmadan açılış ritüeline kadar şeffaf, titiz ve tam koordinasyonlu bir süreç işletiyoruz.'
                  : 'From initial acquaintance to the grand opening celebration, we manage a transparent and coordinated trajectory.'}
              </p>
            </InView>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERSHIP_STEPS.map((st, i) => (
              <InView key={i} variant="fade-up" delay={0.1 * i}>
                <div className="p-7 rounded-2xl bg-white border border-stone-200/90 shadow-xs h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-[#4A1525] block mb-4">
                      {lang === 'tr' ? 'Aşama' : 'Phase'} {st.step}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#0C0A09] font-normal mb-3">
                      {st.title[lang]}
                    </h3>
                    <p className="text-xs text-stone-600 font-light leading-relaxed">
                      {st.desc[lang]}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    <span>{lang === 'tr' ? 'Koordinasyonlu Süreç' : 'Managed Process'}</span>
                    <span>→</span>
                  </div>
                </div>
              </InView>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          6. ÖN BAŞVURU FORMU (FİYAT VE RAKAM İÇERMEZ)
          ════════════════════════════════════════════════════════════════ */}
      <section id="application-form" className="py-24 md:py-36 bg-[#FAF8F5] relative overflow-hidden" aria-label="Başvuru Formu">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Contact Info & Guidelines (5 cols) */}
            <div className="lg:col-span-5">
              <InView variant="fade-up">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A1525] mb-3 inline-block">
                  {lang === 'tr' ? 'ÖN BAŞVURU & İLETİŞİM' : 'INQUIRY & CONTACT'}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#0C0A09] leading-tight mb-6">
                  {lang === 'tr' ? 'Ritüele Ortak Olun.' : 'Join the Coffee Ritual.'}
                </h2>
                <p className="text-stone-600 font-light text-base leading-relaxed mb-8">
                  {lang === 'tr'
                    ? 'AIO Coffee franchise ailesine katılmak ve lokasyon değerlendirme sürecini başlatmak için formu doldurabilirsiniz. Başvurunuz gizlilik ilkelerimiz doğrultusunda titizlikle incelenir.'
                    : 'To begin the location assessment and join the AIO Coffee family, please complete the preliminary form. All submissions are held in strict commercial confidence.'}
                </p>

                {/* Direct Card */}
                <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                    {lang === 'tr' ? 'Doğrudan İletişim Hattı' : 'Direct Inquiry Contact'}
                  </p>
                  <a
                    href="mailto:info@aiocoffee.com"
                    className="font-serif text-xl sm:text-2xl text-[#4A1525] hover:underline block mb-2"
                  >
                    info@aiocoffee.com
                  </a>
                  <p className="text-xs text-stone-500 font-light">
                    {lang === 'tr'
                      ? 'Resmi sunum dosyamız, marka rehberi ve fizibilite kriterleri hakkında detaylı bilgi almak için doğrudan yazabilirsiniz.'
                      : 'You may also contact us directly for our presentation deck, brand identity manual, and location feasibility standards.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF5F7] border border-[#EEDBE0] text-xs text-[#4A1525] flex items-center gap-3">
                  <span className="text-lg">🔒</span>
                  <span>
                    {lang === 'tr'
                      ? 'Tüm başvurular AIO gizlilik ve ticari sır koruma prensiplerine uygun olarak işlenir.'
                      : 'All franchise inquiries are governed by AIO proprietary non-disclosure protocols.'}
                  </span>
                </div>
              </InView>
            </div>

            {/* Right: Modern Application Form (7 cols) */}
            <div className="lg:col-span-7">
              <InView variant="fade-up" delay={0.15}>
                <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 shadow-sm">
                  
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#FAF5F7] text-[#4A1525] border border-[#EEDBE0] mx-auto mb-6 flex items-center justify-center text-2xl font-serif">
                        ✓
                      </div>
                      <h3 className="font-serif text-3xl text-[#0C0A09] font-normal mb-3">
                        {lang === 'tr' ? 'Başvurunuz WhatsApp İçin Hazırlandı' : 'Application Formatted for WhatsApp'}
                      </h3>
                      <p className="text-stone-600 font-light text-sm max-w-md mx-auto leading-relaxed mb-8">
                        {lang === 'tr'
                          ? 'Doldurduğunuz ön başvuru bilgileri kurumsal WhatsApp hattımıza iletilmek üzere düzenlendi. Tarayıcınızda otomatik açılmadıysa aşağıdaki butonla hemen mesaj gönderebilirsiniz.'
                          : 'Your preliminary application details have been formatted for our WhatsApp desk. If it did not open automatically, tap below to send the message.'}
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-luxury-primary text-xs py-3.5 px-7 inline-flex items-center gap-2"
                          >
                            <span>💬 {lang === 'tr' ? 'WhatsApp ile Gönder' : 'Send via WhatsApp'}</span>
                            <span>↗</span>
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="btn-luxury-ghost text-xs text-[#0C0A09] border-stone-300 py-3.5 px-6"
                        >
                          {lang === 'tr' ? 'Forma Geri Dön' : 'Back to Form'}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      
                      {/* Row 1: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="fullName">
                            {lang === 'tr' ? 'Adınız ve Soyadınız' : 'Full Name'} *
                          </label>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder={lang === 'tr' ? 'Örn. Ahmet Yılmaz' : 'e.g. John Doe'}
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="email">
                            {lang === 'tr' ? 'E-posta Adresiniz' : 'Email Address'} *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="ornek@alanadi.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone & City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="phone">
                            {lang === 'tr' ? 'Telefon Numaranız' : 'Phone Number'} *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+90 (5XX) XXX XX XX"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="cityDistrict">
                            {lang === 'tr' ? 'Hedef Şehir ve İlçe' : 'Target City & District'} *
                          </label>
                          <input
                            id="cityDistrict"
                            name="cityDistrict"
                            type="text"
                            required
                            placeholder={lang === 'tr' ? 'Örn. Ankara / Çankaya' : 'e.g. Ankara / Cankaya'}
                            value={formData.cityDistrict}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 3: Property Status & Timeline (NO NUMBERS / NO PRICES) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="propertyStatus">
                            {lang === 'tr' ? 'Lokasyon Durumu' : 'Premises Status'} *
                          </label>
                          <select
                            id="propertyStatus"
                            name="propertyStatus"
                            value={formData.propertyStatus}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all cursor-pointer"
                          >
                            <option value="owned">{lang === 'tr' ? 'Uygun Mülk Sahibiyim (Cadde Mağazası)' : 'I own a candidate location (Street premises)'}</option>
                            <option value="renting">{lang === 'tr' ? 'Kiralama / Sözleşme Aşamasındayım' : 'In lease negotiations for premises'}</option>
                            <option value="searching">{lang === 'tr' ? 'Henüz Lokasyon Belirlenmedi / Arayıştayım' : 'Seeking candidate location'}</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="timeline">
                            {lang === 'tr' ? 'Planlanan Açılış Takvimi' : 'Target Timeline'} *
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all cursor-pointer"
                          >
                            <option value="immediate">{lang === 'tr' ? 'Hemen (1 - 3 Ay İçerisinde)' : 'Immediate (Within 1-3 Months)'}</option>
                            <option value="soon">{lang === 'tr' ? 'Önümüzdeki 3 - 6 Ay' : 'Next 3-6 Months'}</option>
                            <option value="within-year">{lang === 'tr' ? 'Bu Yıl İçerisinde' : 'Within Current Year'}</option>
                          </select>
                        </div>
                      </div>

                      {/* Commercial Background */}
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="experience">
                          {lang === 'tr' ? 'Ticari ve Sektörel Geçmişiniz' : 'Commercial & Industry Background'}
                        </label>
                        <input
                          id="experience"
                          name="experience"
                          type="text"
                          placeholder={lang === 'tr' ? 'Örn. Yeme-içme, perakende veya kurumsal yöneticilik tecrübesi...' : 'e.g. F&B, retail, or executive corporate experience...'}
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all"
                        />
                      </div>

                      {/* Message / Additional Notes */}
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2" htmlFor="message">
                          {lang === 'tr' ? 'Ek Bilgi ve Planlarınız' : 'Additional Information & Objectives'}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder={lang === 'tr' ? 'Hedeflediğiniz cadde, mağaza özellikleri ve iş ortaklığı vizyonunuz hakkında kısa bilgi verebilirsiniz...' : 'Share details on your target street, retail preferences, or partnership objectives...'}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-[#4A1525] focus:bg-white focus:outline-none text-sm text-[#0C0A09] transition-all"
                        />
                      </div>

                      {/* Submit Button */}
                      <div>
                        <Magnetic strength={0.15}>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="btn-luxury-primary text-xs sm:text-sm py-4 px-8 w-full justify-center shadow-lg shadow-[#4A1525]/30 cursor-pointer disabled:opacity-60"
                          >
                            <span>
                              {submitting
                                ? (lang === 'tr' ? 'Başvuru İletiliyor...' : 'Submitting Application...')
                                : (lang === 'tr' ? 'Franchise Ön Başvurusunu Tamamla →' : 'Submit Franchise Application →')}
                            </span>
                          </button>
                        </Magnetic>
                      </div>

                    </form>
                  )}

                </div>
              </InView>
            </div>

          </div>
        </div>
      </section>

      {/* ── Site Footer ── */}
      <SiteFooter />
    </div>
  );
}
