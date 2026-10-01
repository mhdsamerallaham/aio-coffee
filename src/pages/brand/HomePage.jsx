// AIO Coffee — HomePage
// Premium brand home page with Watermelon UI & Motion Primitives architecture
// Luxury editorial design system with purposeful motion & Haikei organic curves

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import SeoHead from '../../components/seo/SeoHead';
import { getSeoMetadata } from '../../content/seoContent';

// Motion & UI Design System Components
import TextReveal from '../../components/motion/TextReveal';
import InView from '../../components/motion/InView';
import Magnetic from '../../components/motion/Magnetic';
import SpotlightCard from '../../components/motion/SpotlightCard';
import AnimatedTabs from '../../components/motion/AnimatedTabs';
import InfiniteMarquee from '../../components/motion/InfiniteMarquee';
import ImageReveal from '../../components/motion/ImageReveal';
import { HaikeiTopography, HaikeiOrganicBlob } from '../../components/ui/HaikeiDecor';

// ── Curated Signature Items with High-Resolution Photography & Sensory Notes
// ── Curated Signature Items with High-Resolution Photography & Sensory Notes
const SIGNATURE_ITEMS = [
  // ── Sıcak Kahveler (Coffee Rituals)
  {
    id: 'latte',
    category: 'coffee',
    categoryLabel: { tr: 'Coffee Rituals', en: 'Coffee Rituals' },
    name: { tr: 'Caffè Latte', en: 'Caffè Latte' },
    notes: { tr: 'Karamel, fındık, ipeksi kadife süt kreması', en: 'Caramel, hazelnut, silky velvety milk microfoam' },
    tag: { tr: 'Özel Seçki', en: 'House Specialty' },
    img: '/images/menu/coffee-rituals/latte.png',
  },
  {
    id: 'cappuccino',
    category: 'coffee',
    categoryLabel: { tr: 'Coffee Rituals', en: 'Coffee Rituals' },
    name: { tr: 'Artisanal Cappuccino', en: 'Artisanal Cappuccino' },
    notes: { tr: 'Dengeli çift shot espresso, yoğun süt köpüğü', en: 'Balanced double shot espresso, dense velvety foam' },
    tag: { tr: 'Klasik', en: 'Classic' },
    img: '/images/menu/coffee-rituals/cappuccino.png',
  },
  {
    id: 'espresso',
    category: 'coffee',
    categoryLabel: { tr: 'Coffee Rituals', en: 'Coffee Rituals' },
    name: { tr: 'Espresso Doppio', en: 'Espresso Doppio' },
    notes: { tr: 'Yoğun gövde, altın rengi krema, çikolata & narenciye notaları', en: 'Intense body, golden crema, cocoa & citrus notes' },
    tag: { tr: 'Saf Espresso', en: 'Pure Espresso' },
    img: '/images/menu/coffee-rituals/espresso.png',
  },
  {
    id: 'flat-white',
    category: 'coffee',
    categoryLabel: { tr: 'Coffee Rituals', en: 'Coffee Rituals' },
    name: { tr: 'Flat White Velvet', en: 'Flat White Velvet' },
    notes: { tr: 'Çift shot ristretto, mikro köpüklü buharda süt dokunuşu', en: 'Double ristretto with micro-textured velvety milk' },
    tag: { tr: 'İpeksi Doku', en: 'Silky Texture' },
    img: '/images/menu/coffee-rituals/flat-white.png',
  },

  // ── Soğuk Kahveler (Iced Coffee)
  {
    id: 'cold-brew',
    category: 'ice',
    categoryLabel: { tr: 'Soğuk Ritüeller', en: 'Cold Rituals' },
    name: { tr: '48h Nitro Cold Brew', en: '48h Nitro Cold Brew' },
    notes: { tr: 'Yavaş damıtım, düşük asidite, çikolatamsı gövde', en: 'Slow drip cold extraction, low acidity, chocolate notes' },
    tag: { tr: 'Özel Demleme', en: 'Special Extraction' },
    img: '/images/menu/ice-rituals/cold-brew.jpeg',
  },
  {
    id: 'ice-latte',
    category: 'ice',
    categoryLabel: { tr: 'Soğuk Ritüeller', en: 'Cold Rituals' },
    name: { tr: 'Iced Caffè Latte', en: 'Iced Caffè Latte' },
    notes: { tr: 'Buz küpleri, taze soğuk süt ve yoğun çift shot espresso', en: 'Chilled espresso poured over ice and fresh cold milk' },
    tag: { tr: 'Ferahlatıcı', en: 'Refreshing' },
    img: '/images/menu/ice-rituals/ice-latte.png',
  },
  {
    id: 'ice-white-mocha',
    category: 'ice',
    categoryLabel: { tr: 'Soğuk Ritüeller', en: 'Cold Rituals' },
    name: { tr: 'Iced White Mocha', en: 'Iced White Mocha' },
    notes: { tr: 'Beyaz çikolata aroması, soğuk süt ve buzlu espresso', en: 'White chocolate sauce blended with iced espresso and milk' },
    tag: { tr: 'Tatlı Denge', en: 'Sweet Balance' },
    img: '/images/menu/ice-rituals/ice-white-mocha.jpeg',
  },

  // ── Matcha Ritüelleri (Matcha)
  {
    id: 'matcha-latte',
    category: 'matcha',
    categoryLabel: { tr: 'Matcha Rituals', en: 'Matcha Rituals' },
    name: { tr: 'Ceremonial Matcha Latte', en: 'Ceremonial Matcha Latte' },
    notes: { tr: 'Japonya Uji bölgesi A-grade seremoniyel matcha', en: 'A-grade ceremonial matcha from Uji, Kyoto' },
    tag: { tr: 'Seremoni', en: 'Ceremonial' },
    img: '/images/menu/matcha-rituals/matcha-latte.jpeg',
  },
  {
    id: 'ice-strawberry-matcha',
    category: 'matcha',
    categoryLabel: { tr: 'Matcha Rituals', en: 'Matcha Rituals' },
    name: { tr: 'Ice Strawberry Matcha', en: 'Ice Strawberry Matcha' },
    notes: { tr: 'Taze çilek püresi, soğuk süt ve Uji matcha katmanları', en: 'Layered fresh strawberry puree, milk and ceremonial matcha' },
    tag: { tr: 'İmza İçecek', en: 'Signature Drink' },
    img: '/images/menu/matcha-rituals/ice-matcha-latte.jpeg',
  },
  {
    id: 'vanilla-matcha',
    category: 'matcha',
    categoryLabel: { tr: 'Matcha Rituals', en: 'Matcha Rituals' },
    name: { tr: 'Madagascar Vanilla Matcha', en: 'Madagascar Vanilla Matcha' },
    notes: { tr: 'Doğal vanilya çekirdeği aroması ve ipeksi matcha dokusu', en: 'Natural vanilla bean infusion with silky whisked matcha' },
    tag: { tr: 'Yumuşak İçim', en: 'Smooth Sip' },
    img: '/images/menu/matcha-rituals/vanilla-matcha.jpeg',
  },

  // ── Manuel Demleme (Brew Bar)
  {
    id: 'chemex',
    category: 'brew',
    categoryLabel: { tr: 'Brew Bar', en: 'Brew Bar' },
    name: { tr: 'Chemex Single Origin', en: 'Chemex Single Origin' },
    notes: { tr: 'Etiyopya Yirgacheffe, bergamot ve yasemin notaları', en: 'Ethiopia Yirgacheffe, bergamot & jasmine floral notes' },
    tag: { tr: 'Filtre Sanatı', en: 'Pour Over Craft' },
    img: '/images/menu/brew-rituals/chemex.png',
  },
  {
    id: 'v60',
    category: 'brew',
    categoryLabel: { tr: 'Brew Bar', en: 'Brew Bar' },
    name: { tr: 'V60 Hario Drip', en: 'V60 Hario Drip' },
    notes: { tr: 'Kolombiya Huila, kırmızı meyve ve karamel asiditesi', en: 'Colombia Huila, red berry sweetness and clean acidity' },
    tag: { tr: 'Hassas Demleme', en: 'Precision Brew' },
    img: '/images/menu/brew-rituals/v60.png',
  },
  {
    id: 'turk-kahvesi',
    category: 'brew',
    categoryLabel: { tr: 'Brew Bar', en: 'Brew Bar' },
    name: { tr: 'Geleneksel Türk Kahvesi', en: 'Traditional Turkish Coffee' },
    notes: { tr: 'Bakır cezvede taze çekilmiş zanaatkar Türk kahvesi', en: 'Slowly brewed in copper cezve from freshly ground beans' },
    tag: { tr: 'Gelenek', en: 'Heritage' },
    img: '/images/menu/brew-rituals/turk-kahvesi.png',
  },

  // ── Mutfak & Brunch (All Day Brunch)
  {
    id: 'avocado',
    category: 'brunch',
    categoryLabel: { tr: 'All Day Brunch', en: 'All Day Brunch' },
    name: { tr: 'Avocado Balance Tartine', en: 'Avocado Balance Tartine' },
    notes: { tr: 'Ekşi mayalı ekmek, ezme avokado, poşe yumurta & çörekotu', en: 'Artisan sourdough, smashed avocado, poached egg & herbs' },
    tag: { tr: 'Gourmet Brunch', en: 'Gourmet Brunch' },
    img: '/images/menu/all-day-brunch-rituals/avocado-balance.jpeg',
  },
  {
    id: 'ciabatta',
    category: 'brunch',
    categoryLabel: { tr: 'Artisan Mutfak', en: 'Artisan Kitchen' },
    name: { tr: 'Ciabatta Napoletana', en: 'Ciabatta Napoletana' },
    notes: { tr: 'Fesleğen pesto, taze mozzarella, kurutulmuş domates', en: 'Basil pesto, fresh mozzarella, sun-dried tomatoes' },
    tag: { tr: 'Taze Pişirim', en: 'Freshly Baked' },
    img: '/images/menu/sandvicler/ciabatta-napoletana.png',
  },
  {
    id: 'egg-bowl',
    category: 'brunch',
    categoryLabel: { tr: 'All Day Brunch', en: 'All Day Brunch' },
    name: { tr: 'Sunrise Egg Bowl', en: 'Sunrise Egg Bowl' },
    notes: { tr: 'Haşlanmış taze yumurta, kinoa, avokado ve yeşillikler', en: 'Soft boiled egg, quinoa, avocado and crisp market greens' },
    tag: { tr: 'Dengeli Enerji', en: 'Balanced Energy' },
    img: '/images/menu/all-day-brunch-rituals/egg-bowl.png',
  },

  // ── Cookies (Kurabiyeler)
  {
    id: 'lotus-cookie',
    category: 'cookies',
    categoryLabel: { tr: 'Gourmet Cookie', en: 'Gourmet Cookie' },
    name: { tr: 'Biscoff Lotus Cookie', en: 'Biscoff Lotus Cookie' },
    notes: { tr: 'Karamelize Biscoff dolgusu, çıtır bisküvi parçaları, akışkan doku', en: 'Caramelized Biscoff spread core, crunchy spiced biscuits, gooey center' },
    tag: { tr: 'Çok Satan', en: 'Best Seller' },
    img: '/images/menu/cookies/lotus-cookie.jpeg',
  },
  {
    id: 'triple-chocolate-cookie',
    category: 'cookies',
    categoryLabel: { tr: 'Gourmet Cookie', en: 'Gourmet Cookie' },
    name: { tr: 'Triple Çikolatalı Cookie', en: 'Triple Chocolate Cookie' },
    notes: { tr: 'Belçika bitter & sütlü çikolata, erimiş çikolata parçaları', en: 'Belgian dark & milk chocolate dough, molten chocolate chunks' },
    tag: { tr: 'Fırından Taze', en: 'Freshly Baked' },
    img: '/images/menu/cookies/cikolatali-cookie.png',
  },
  {
    id: 'kinder-cookie',
    category: 'cookies',
    categoryLabel: { tr: 'Gourmet Cookie', en: 'Gourmet Cookie' },
    name: { tr: 'Beyaz Çikolatalı Kinder Cookie', en: 'White Chocolate Kinder Cookie' },
    notes: { tr: 'Kinder çikolata dolgusu, fındık kreması & beyaz küvertür', en: 'Kinder chocolate center, hazelnut cream swirl & white chocolate drops' },
    tag: { tr: 'Özel Reçete', en: 'Special Recipe' },
    img: '/images/menu/cookies/kinder-cookie.jpeg',
  },
  {
    id: 'red-velvet-cookie',
    category: 'cookies',
    categoryLabel: { tr: 'Gourmet Cookie', en: 'Gourmet Cookie' },
    name: { tr: 'Red Velvet Cookie', en: 'Red Velvet Cookie' },
    notes: { tr: 'Kadifemsi kırmızı hamur, akışkan beyaz küvertür çikolata dolgusu', en: 'Velvety red dough filled with melted white chocolate center' },
    tag: { tr: 'Klasik Lezzet', en: 'Classic Taste' },
    img: '/images/menu/cookies/red-velvet-cookie.jpeg',
  },

  // ── Tatlılar (Desserts)
  {
    id: 'tiramisu',
    category: 'sweets',
    categoryLabel: { tr: 'Tatlı Ritüelleri', en: 'Sweet Rituals' },
    name: { tr: 'Antep Fıstıklı Tiramisu', en: 'Pistachio Tiramisu' },
    notes: { tr: 'Mascarpone kreması, espresso emdirilmiş savoiardi, Antep fıstığı', en: 'Rich mascarpone cream, espresso savoiardi, roasted pistachios' },
    tag: { tr: 'Şefin İmzası', en: "Chef's Signature" },
    img: '/images/menu/tatlilar/fistikli-tiramisu.jpeg',
  },
  {
    id: 'brownie',
    category: 'sweets',
    categoryLabel: { tr: 'Tatlı Ritüelleri', en: 'Sweet Rituals' },
    name: { tr: 'Brownie Intense', en: 'Brownie Intense' },
    notes: { tr: 'Yoğun Belçika çikolatası, ceviz parçacıkları ve akışkan doku', en: 'Dense Belgian chocolate, crunchy walnuts and rich fudgy crumb' },
    tag: { tr: 'Çikolata Tutkusu', en: 'Chocoholic' },
    img: '/images/menu/tatlilar/brownie.png',
  },
  {
    id: 'medovik',
    category: 'sweets',
    categoryLabel: { tr: 'Tatlı Ritüelleri', en: 'Sweet Rituals' },
    name: { tr: 'Ballı Pasta (Medovik)', en: 'Honey Cake (Medovik)' },
    notes: { tr: 'Kat kat ince bal hamuru, hafif ekşi krema ve bal kıtırları', en: 'Multi-layered caramelized honey dough with airy sour cream filling' },
    tag: { tr: 'Geleneksel', en: 'Heritage' },
    img: '/images/menu/tatlilar/balli-pasta-medovik.png',
  },
];

// Marquee Brand Ticker Items
const MARQUEE_ITEMS = [
  'SPECIALTY COFFEE RITUALS',
  'ALL-DAY GOURMET BRUNCH',
  'CEREMONIAL JAPON MATCHA',
  'SINGLE ORIGIN ETHIOPIA & COLOMBIA',
  'COLD BREW DRAFT BAR',
  'ARTISANAL BAKERY & CROISSANTS',
  'BOMONTI / ŞİŞLİ MAĞAZASI',
  'ALSANCAK / İZMİR MAĞAZASI',
  'ESTABLISHED 2025',
];

// Sensory Flavor Wheel Notes
const SENSORY_NOTES = [
  { tr: 'Yasemin & Bergamot', en: 'Jasmine & Bergamot', color: 'border-amber-200/40 text-amber-200' },
  { tr: 'Karamel & Fındık Pralin', en: 'Caramel & Hazelnut', color: 'border-orange-200/40 text-orange-200' },
  { tr: 'Yaban Mersini & Narenciye', en: 'Blueberry & Citrus', color: 'border-rose-200/40 text-rose-200' },
  { tr: 'Kadifemsi Bitter Çikolata', en: 'Velvety Dark Cocoa', color: 'border-stone-300/40 text-stone-200' },
  { tr: 'Bal & Şeftali Çiçeği', en: 'Honey & Peach Blossom', color: 'border-amber-100/40 text-amber-100' },
  { tr: 'Töresel Umami & Matcha', en: 'Ceremonial Umami Matcha', color: 'border-emerald-200/40 text-emerald-200' },
];

export default function HomePage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.hero;
  const brand = content.brand;
  const signature = content.signature;
  const experience = content.experience;
  const stores = content.stores;
  const seo = getSeoMetadata('home', lang);

  const [activeCategory, setActiveCategory] = useState('all');

  const prefix = lang === 'tr' ? '/tr' : '/en';
  const menuHref = `${prefix}/menu`;
  const aboutHref = lang === 'tr' ? '/tr/biz-kimiz' : '/en/about';
  const storesHref = lang === 'tr' ? '/tr/magazalar' : '/en/stores';

  // Category Tabs Definition
  const categoryTabs = [
    { id: 'all', label: lang === 'tr' ? 'Tüm Seçkiler' : 'All Signatures' },
    { id: 'coffee', label: lang === 'tr' ? 'Sıcak Kahveler' : 'Hot Coffee' },
    { id: 'ice', label: lang === 'tr' ? 'Soğuk Kahveler' : 'Iced Coffee' },
    { id: 'matcha', label: lang === 'tr' ? 'Matcha' : 'Matcha' },
    { id: 'brew', label: lang === 'tr' ? 'Brew Bar' : 'Brew Bar' },
    { id: 'brunch', label: lang === 'tr' ? 'Brunch & Mutfak' : 'Brunch & Food' },
    { id: 'cookies', label: lang === 'tr' ? 'Cookies' : 'Cookies' },
    { id: 'sweets', label: lang === 'tr' ? 'Tatlılar' : 'Desserts' },
  ];

  const filteredItems = activeCategory === 'all'
    ? SIGNATURE_ITEMS
    : SIGNATURE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0C0A09] selection:bg-[#4A1525] selection:text-white">
      {/* ── Dynamic SEO & GEO Meta Tags ── */}
      <SeoHead {...seo} lang={lang} />

      {/* ── Dynamic Island Header ── */}
      <SiteNav theme="dark" />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO SECTION — Haute Roastery & Coffee Rituals
          ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#0A0807] text-white pt-24 pb-16 lg:py-32"
        aria-label="Hero"
      >
        {/* Haikei Organic Background Elements */}
        <HaikeiOrganicBlob
          className="w-[500px] h-[500px] -top-32 -left-32"
          color1="#5E172E"
          color2="#3B0D1C"
          opacity={0.35}
        />
        <HaikeiOrganicBlob
          className="w-[600px] h-[600px] -bottom-32 -right-32"
          color1="#C59B63"
          color2="#4A1525"
          opacity={0.2}
        />
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <HaikeiTopography strokeColor="#C59B63" opacity={0.16} />
        </div>

        {/* Ambient Subtle Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* ── Left Column: Editorial Headline & Actions (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Badge Pill with Animated Pulsing Glow */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/6 border border-white/12 backdrop-blur-md mb-8"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-stone-200">
                  {lang === 'tr' ? 'ALL IN ONE • İSTANBUL & İZMİR' : 'ALL IN ONE • ISTANBUL & IZMIR'}
                </span>
              </motion.div>

              {/* Main Headline with TextReveal entrance — Single Semantic H1 */}
              <h1 className="mb-6 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.96] text-white">
                <TextReveal
                  as="span"
                  delay={0.1}
                  className="inline-block"
                >
                  {t.headline1}
                </TextReveal>
                <br />
                <TextReveal
                  as="span"
                  delay={0.3}
                  className="inline-block italic text-[#E2829E] mt-1"
                >
                  {t.headline2}
                </TextReveal>
              </h1>

              {/* Editorial Subline & Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="text-base sm:text-lg md:text-xl font-light text-stone-300 max-w-xl mb-10 leading-relaxed"
              >
                {t.body}
              </motion.p>

              {/* Primary & Secondary Magnetic Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10"
              >
                <Magnetic strength={0.25}>
                  <Link
                    to={menuHref}
                    className="btn-luxury-primary text-sm py-4 px-8 shadow-xl shadow-[#4A1525]/40 group"
                  >
                    <span>{t.cta}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <Link
                    to={aboutHref}
                    className="btn-luxury-ghost text-sm py-4 px-7 border-white/20 text-stone-200 hover:text-white"
                  >
                    <span>{t.ctaSecondary}</span>
                    <span className="text-xs text-[#C59B63]">↗</span>
                  </Link>
                </Magnetic>
              </motion.div>

              {/* Live Stores Status Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center gap-6 pt-6 border-t border-white/10 text-xs text-stone-400"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B63]" />
                  <span>Şişli / Rumeli Caddesi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B63]" />
                  <span>Alsancak / İzmir</span>
                </div>
                <span className="hidden sm:inline text-stone-500">|</span>
                <span className="hidden sm:inline text-stone-400">08:00 – 22:00</span>
              </motion.div>
            </div>

            {/* ── Right Column: Interactive 3D Showcase Card (5 cols) ── */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Spotlight Luxury Card */}
                <SpotlightCard
                  spotlightColor="rgba(226, 130, 158, 0.22)"
                  className="bg-gradient-to-b from-[#181412] to-[#0E0C0B] border-white/15 p-4 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.6)] rounded-3xl"
                >
                  {/* Image Presentation */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-900 group">
                    <img
                      src="/images/menu/coffee-rituals/latte.png"
                      alt="AIO Coffee Signature Latte Art"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Floating Luxury Tag: Top Left */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold tracking-widest uppercase text-[#DFB77C]">
                        Single Origin • 1950m
                      </span>
                    </div>

                    {/* Floating Luxury Tag: Top Right */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 rounded-full bg-[#4A1525]/80 backdrop-blur-md border border-white/15 text-[10px] font-semibold tracking-widest uppercase text-white">
                        Specialty Roast
                      </span>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C59B63] mb-1">
                          Signature Ritual
                        </p>
                        <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                          Caffè Latte Supreme
                        </h2>
                        <p className="text-xs text-stone-300 font-light mt-1">
                          Ethiopia Yirgacheffe & Silky Microfoam
                        </p>
                      </div>

                      <Link
                        to={menuHref}
                        className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 backdrop-blur-md shrink-0"
                        aria-label="Menüye Git"
                      >
                        ↗
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>

                {/* Decorative Floating Pill Badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-6 sm:-left-8 z-30 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#14110F]/90 backdrop-blur-xl border border-white/12 shadow-2xl text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#4A1525] flex items-center justify-center text-xs font-serif font-bold text-white tracking-widest">
                    AIO
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-wide">48 Saat Soğuk Demleme</p>
                    <p className="text-[10px] text-stone-400">Nitro Cold Brew Bar</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none opacity-40">
          <span className="text-[10px] tracking-[0.25em] uppercase font-light">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. INFINITE MARQUEE RIBBON — Motion Primitives Slider
          ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#120F0D] border-y border-white/10 text-stone-300 py-2 overflow-hidden" aria-label="Brand ticker">
        <InfiniteMarquee
          items={MARQUEE_ITEMS}
          speed={32}
          className="text-xs tracking-[0.22em] font-medium uppercase font-sans"
          itemClassName="text-stone-300 hover:text-white transition-colors"
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. BRAND STORY & PHILOSOPHY ("Biz Kimiz")
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-[#FAF8F5] overflow-hidden" aria-label="Biz Kimiz">
        {/* Subtle Terroir Topography lines */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20">
          <HaikeiTopography strokeColor="#4A1525" opacity={0.14} />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">

            {/* Left Narrative (6 cols) */}
            <div className="lg:col-span-6">
              <InView variant="fade-up">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A1525] mb-4">
                  {brand.overline} — All in One
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-[#0C0A09] mb-8">
                  {brand.headline}
                </h2>
                <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed mb-10 max-w-xl">
                  {brand.body}
                </p>

                <Magnetic strength={0.2}>
                  <Link
                    to={aboutHref}
                    className="btn-luxury-primary text-xs tracking-widest shadow-md shadow-[#4A1525]/25"
                  >
                    <span>{brand.cta}</span>
                    <span>→</span>
                  </Link>
                </Magnetic>
              </InView>
            </div>

            {/* Right: Elevated Stats & Dual Visual Composition (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: brand.stat1.value, label: brand.stat1.label, sub: 'İstanbul & İzmir' },
                  { value: brand.stat2.value, label: brand.stat2.label, sub: 'Seçkin Menü' },
                  { value: brand.stat3.value, label: brand.stat3.label, sub: 'Roastery House' },
                ].map((stat, idx) => (
                  <InView key={idx} variant="fade-up" delay={0.1 * idx}>
                    <SpotlightCard
                      spotlightColor="rgba(74, 21, 37, 0.1)"
                      className="bg-white/80 backdrop-blur-md border-stone-200/90 p-5 rounded-2xl text-center shadow-xs"
                    >
                      <p className="font-serif text-3xl sm:text-4xl text-[#4A1525] font-light">
                        {stat.value}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-800 mt-2">
                        {stat.label}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5 font-light">
                        {stat.sub}
                      </p>
                    </SpotlightCard>
                  </InView>
                ))}
              </div>

              {/* Layered Asymmetric Photography Pair */}
              <div className="grid grid-cols-2 gap-4 items-end">
                <InView variant="fade-up" delay={0.2}>
                  <ImageReveal
                    src="/images/menu/brew-rituals/chemex.png"
                    alt="AIO Coffee Chemex Ritual"
                    aspectRatio="aspect-[3/4]"
                    className="shadow-xl shadow-stone-900/5 rounded-2xl border border-stone-200/80"
                  />
                </InView>
                <InView variant="fade-up" delay={0.3}>
                  <div className="relative">
                    <ImageReveal
                      src="/images/menu/matcha-rituals/matcha-latte.jpeg"
                      alt="AIO Matcha Ritual"
                      aspectRatio="aspect-[3/4]"
                      className="shadow-xl shadow-stone-900/5 rounded-2xl border border-stone-200/80 mb-2"
                    />
                    <div className="p-3 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200 text-center shadow-xs">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4A1525]">
                        "Every cup, intentional."
                      </p>
                    </div>
                  </div>
                </InView>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. SIGNATURE RITUALS & GASTRONOMY (Interactive Tabs & Cards)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-[#F3EFEA] border-y border-stone-300/70" aria-label="Seçkiler ve Ritüeller">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <InView variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A1525]">
                {signature.overline} — All in One Collection
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#0C0A09] mt-2">
                {signature.headline}
              </h2>
            </InView>
            <InView variant="fade-up" delay={0.15}>
              <p className="text-sm sm:text-base text-stone-600 font-light max-w-md">
                {signature.subheadline}
              </p>
            </InView>
          </div>

          {/* Category Tabs (Watermelon UI sliding pill) */}
          <div className="flex justify-start md:justify-center mb-12 overflow-x-auto pb-2 no-scrollbar">
            <AnimatedTabs
              tabs={categoryTabs}
              activeTab={activeCategory}
              onChange={setActiveCategory}
              layoutId="homepage-signature-tabs"
              className="bg-stone-200/70 border-stone-300/80"
              pillClassName="bg-[#4A1525] text-white shadow-md shadow-[#4A1525]/30"
              inactiveClassName="text-stone-600 hover:text-black"
              activeTextClassName="text-white"
            />
          </div>

          {/* Product Grid with AnimatePresence */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <Link to={menuHref} className="group block h-full">
                    <SpotlightCard
                      spotlightColor="rgba(74, 21, 37, 0.12)"
                      className="bg-white border-stone-200/90 h-full p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-4">
                          <img
                            src={item.img}
                            alt={item.name[lang]}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-[#4A1525] shadow-xs">
                              {item.tag[lang]}
                            </span>
                          </div>
                        </div>

                        {/* Category Label */}
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 mb-1">
                          {item.categoryLabel[lang]}
                        </p>

                        {/* Title */}
                        <h3 className="font-serif text-xl text-[#0C0A09] group-hover:text-[#4A1525] transition-colors">
                          {item.name[lang]}
                        </h3>

                        {/* Sensory Notes */}
                        <p className="text-xs text-stone-500 font-light mt-2 line-clamp-2 leading-relaxed">
                          {item.notes[lang]}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-[#4A1525]">
                        <span className="group-hover:underline">Ritüeli Keşfet</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </SpotlightCard>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Menu Action */}
          <div className="mt-14 text-center">
            <Magnetic strength={0.2}>
              <Link
                to={menuHref}
                className="btn-luxury-ghost text-xs tracking-widest text-[#0C0A09] border-stone-400 hover:border-black"
              >
                <span>{signature.cta} — Tüm Menüyü İncele (15+ Kategori)</span>
                <span>→</span>
              </Link>
            </Magnetic>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. THE CRAFT & ROASTERY PILLARS (Sensory Experience)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-[#0E0C0B] text-white overflow-hidden" aria-label="Kahve Sanatı ve Zanaat">
        <HaikeiOrganicBlob
          className="w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          color1="#4A1525"
          color2="#C59B63"
          opacity={0.18}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <InView variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C59B63] mb-3 inline-block">
                {experience.overline} — Sensual Roastery
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight">
                {experience.headline}
              </h2>
            </InView>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {experience.items.map((item, idx) => (
              <InView key={item.id} variant="fade-up" delay={0.1 * idx}>
                <SpotlightCard
                  spotlightColor="rgba(197, 155, 99, 0.16)"
                  className="bg-white/4 border-white/10 p-6 rounded-2xl h-full flex flex-col justify-between backdrop-blur-md"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#C59B63] font-light">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal mt-4 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/8 text-[11px] uppercase tracking-wider text-[#C59B63] flex items-center justify-between">
                    <span>AIO Standart</span>
                    <span>•</span>
                  </div>
                </SpotlightCard>
              </InView>
            ))}
          </div>

          {/* Sensory Flavor Tags Bar */}
          <div className="border-t border-white/10 pt-12">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-stone-400 mb-6 font-semibold">
              Karakteristik Tadım Notaları & Terroir Profili
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SENSORY_NOTES.map((note, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-full border text-xs tracking-wider uppercase font-light backdrop-blur-sm bg-white/3 ${note.color}`}
                >
                  {note[lang]}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          6. STORES & COFFEE HOUSES (İstanbul & İzmir)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-[#FAF8F5]" aria-label="Lokasyonlarımız">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <InView variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A1525]">
                {stores.overline} — Kahve Mekânlarımız
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#0C0A09] mt-2">
                {stores.headline}
              </h2>
            </InView>
            <InView variant="fade-up" delay={0.15}>
              <p className="text-sm sm:text-base text-stone-600 font-light max-w-md">
                {stores.subtitle}
              </p>
            </InView>
          </div>

          {/* Stores Side-by-Side Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Store 1: Rumeli / Şişli */}
            <InView variant="fade-up" delay={0.1}>
              <SpotlightCard
                spotlightColor="rgba(74, 21, 37, 0.12)"
                className="bg-white border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-[#FAF5F7] border border-[#EEDBE0] text-[11px] font-bold uppercase tracking-wider text-[#4A1525]">
                      İstanbul · Şişli / Bomonti
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      Haftanın 7 Günü
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl text-[#0C0A09] font-normal mb-3">
                    Rumeli Caddesi — Şişli
                  </h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">
                    Nişantaşı / Bomonti Hattı
                  </p>
                  <p className="text-sm text-stone-600 font-light mb-6">
                    Cumhuriyet Mahallesi, Rumeli Caddesi No: 94A, 34371 Şişli / İstanbul
                  </p>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 mb-6 text-xs text-stone-700 flex justify-between">
                    <span>Çalışma Saatleri:</span>
                    <span className="font-semibold text-stone-900">08:00 – 22:00</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-stone-100">
                  <Magnetic strength={0.2}>
                    <a
                      href="https://maps.google.com/?q=Cumhuriyet+Mahallesi+Rumeli+Caddesi+No:94A+Şişli+İstanbul"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-primary text-xs py-3 px-6"
                    >
                      <span>Yol Tarifi Al ↗</span>
                    </a>
                  </Magnetic>
                  <Link
                    to={storesHref}
                    className="btn-luxury-ghost text-xs py-3 px-6 text-stone-700 border-stone-300 hover:border-black"
                  >
                    <span>Mekân Detayları</span>
                  </Link>
                </div>
              </SpotlightCard>
            </InView>

            {/* Store 2: Alsancak / İzmir */}
            <InView variant="fade-up" delay={0.2}>
              <SpotlightCard
                spotlightColor="rgba(197, 155, 99, 0.15)"
                className="bg-white border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-[#FDF9F3] border border-[#EBD4A8] text-[11px] font-bold uppercase tracking-wider text-[#996F37]">
                      İzmir · Alsancak / Kordon
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      Haftanın 7 Günü
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl text-[#0C0A09] font-normal mb-3">
                    Alsancak — Konak
                  </h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">
                    Kordon / Kültür Hattı
                  </p>
                  <p className="text-sm text-stone-600 font-light mb-6">
                    Kültür Mahallesi, Alsancak / Konak / İzmir
                  </p>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 mb-6 text-xs text-stone-700 flex justify-between">
                    <span>Çalışma Saatleri:</span>
                    <span className="font-semibold text-stone-900">08:00 – 01:00</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-stone-100">
                  <Magnetic strength={0.2}>
                    <a
                      href="https://maps.google.com/?q=Alsancak+Konak+İzmir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-primary text-xs py-3 px-6"
                    >
                      <span>Yol Tarifi Al ↗</span>
                    </a>
                  </Magnetic>
                  <Link
                    to={storesHref}
                    className="btn-luxury-ghost text-xs py-3 px-6 text-stone-700 border-stone-300 hover:border-black"
                  >
                    <span>Mekân Detayları</span>
                  </Link>
                </div>
              </SpotlightCard>
            </InView>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. LIFESTYLE & INSTAGRAM BENTO COMMUNITY
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F4EFEA] border-t border-stone-200" aria-label="Topluluk & Instagram">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4A1525]">
                @AIO.ALLINONECOFFEE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0C0A09] font-normal mt-1">
                Kahve Topluluğumuz
              </h2>
            </div>
            <a
              href="https://www.instagram.com/aio.allinonecoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#4A1525] hover:opacity-75 transition-opacity"
            >
              <span>Instagram'da Takip Et</span>
              <span>↗</span>
            </a>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: '/images/menu/coffee-rituals/cappuccino.png', title: 'Latte Art Moments' },
              { img: '/images/menu/all-day-brunch-rituals/avocado-balance.jpeg', title: 'Brunch Rituals' },
              { img: '/images/menu/tatlilar/fistikli-tiramisu.jpeg', title: 'Pistachio Dessert' },
              { img: '/images/menu/ice-rituals/cold-brew.jpeg', title: 'Cold Extraction' },
            ].map((shot, idx) => (
              <InView key={idx} variant="fade-up" delay={0.08 * idx}>
                <a
                  href="https://www.instagram.com/aio.allinonecoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square rounded-2xl overflow-hidden bg-stone-200 border border-stone-300/80 shadow-xs"
                >
                  <img
                    src={shot.img}
                    alt={shot.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-[2px]">
                    <span>@aio.allinonecoffee ↗</span>
                  </div>
                </a>
              </InView>
            ))}
          </div>

        </div>
      </section>

      {/* ── Brand Site Luxury Footer ── */}
      <SiteFooter />
    </div>
  );
}
