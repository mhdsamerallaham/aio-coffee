// AIO Coffee — MenuPage (Brand Site)
// Premium editorial showcase of all menu categories with real product photos
// Focuses entirely on brand coffee culture and rituals

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { useReveal } from '../../lib/useReveal';

// Menu categories for brand showcase
const MENU_CATEGORIES = [
  {
    id: 'coffee-rituals',
    name: { tr: 'Coffee Rituals', en: 'Coffee Rituals' },
    description: { tr: 'Espresso, cappuccino, latte ve daha fazlası.', en: 'Espresso, cappuccino, latte and more.' },
    heroImg: '/images/menu/coffee-rituals/cappuccino.png',
    items: [
      { name: 'Espresso', img: '/images/menu/coffee-rituals/espresso.png' },
      { name: 'Cappuccino', img: '/images/menu/coffee-rituals/cappuccino.png' },
      { name: 'Latte', img: '/images/menu/coffee-rituals/latte.png' },
      { name: 'Flat White', img: '/images/menu/coffee-rituals/flat-white.png' },
      { name: 'Americano', img: '/images/menu/coffee-rituals/americano.png' },
      { name: 'Cortado', img: '/images/menu/coffee-rituals/cortado.png' },
    ],
  },
  {
    id: 'ice-rituals',
    name: { tr: 'Ice Rituals', en: 'Ice Rituals' },
    description: { tr: 'Soğuk espresso ve zanaat soğuk demleme ritüelleri.', en: 'Cold espresso and crafted cold brew rituals.' },
    heroImg: '/images/menu/ice-rituals/cold-brew.jpeg',
    items: [
      { name: 'Ice Latte', img: '/images/menu/ice-rituals/ice-latte.png' },
      { name: 'Cold Brew', img: '/images/menu/ice-rituals/cold-brew.jpeg' },
      { name: 'Ice Americano', img: '/images/menu/ice-rituals/ice-americano.png' },
      { name: 'Japanese Iced Coffee', img: '/images/menu/ice-rituals/japanese-iced-coffee.png' },
      { name: 'Ice Mocha', img: '/images/menu/ice-rituals/ice-mocha.png' },
    ],
  },
  {
    id: 'matcha-rituals',
    name: { tr: 'Matcha Rituals', en: 'Matcha Rituals' },
    description: { tr: 'Japon seremoniyel matcha deneyimi.', en: 'Japanese ceremonial matcha experience.' },
    heroImg: '/images/menu/matcha-rituals/matcha-latte.jpeg',
    items: [
      { name: 'Matcha Latte', img: '/images/menu/matcha-rituals/matcha-latte.jpeg' },
      { name: 'Ice Matcha Latte', img: '/images/menu/matcha-rituals/ice-matcha-latte.jpeg' },
      { name: 'Vanilla Matcha', img: '/images/menu/matcha-rituals/vanilla-matcha.jpeg' },
      { name: 'Strawberry Matcha', img: '/images/menu/matcha-rituals/strawberry-matcha.jpeg' },
    ],
  },
  {
    id: 'brew-bar',
    name: { tr: 'Brew Bar', en: 'Brew Bar' },
    description: { tr: 'V60, Chemex, cold brew ve geleneksel Türk kahvesi.', en: 'V60, Chemex, cold brew and traditional Turkish coffee.' },
    heroImg: '/images/menu/brew-rituals/chemex.png',
    items: [
      { name: 'Chemex', img: '/images/menu/brew-rituals/chemex.png' },
      { name: 'V60', img: '/images/menu/brew-rituals/v60.png' },
      { name: 'Filtre Kahve', img: '/images/menu/brew-rituals/filtre-kahve.png' },
      { name: 'Türk Kahvesi', img: '/images/menu/brew-rituals/turk-kahvesi.png' },
    ],
  },
  {
    id: 'brunch',
    name: { tr: 'All Day Brunch', en: 'All Day Brunch' },
    description: { tr: 'Taze malzemelerle hazırlanan gün boyu tabaklar.', en: 'All-day plates prepared with fresh ingredients.' },
    heroImg: '/images/menu/all-day-brunch-rituals/avocado-balance.jpeg',
    items: [
      { name: 'Avocado Balance', img: '/images/menu/all-day-brunch-rituals/avocado-balance.jpeg' },
      { name: 'Egg Bowl', img: '/images/menu/all-day-brunch-rituals/egg-bowl.png' },
      { name: 'Sunrise Ritual', img: '/images/menu/all-day-brunch-rituals/sunrise-ritual.jpg' },
    ],
  },
  {
    id: 'cookies',
    name: { tr: 'Cookies & Kurabiyeler', en: 'Gourmet Cookies' },
    description: { tr: 'İçi yumuşacık ve akışkan, taze fırınlanmış gurme zanaat kurabiyeleri.', en: 'Freshly baked, soft-baked & gooey artisan gourmet cookies.' },
    heroImg: '/images/menu/cookies/lotus-cookie.jpeg',
    items: [
      { name: 'Biscoff Lotus Cookie', img: '/images/menu/cookies/lotus-cookie.jpeg' },
      { name: 'Triple Çikolatalı Cookie', img: '/images/menu/cookies/cikolatali-cookie.png' },
      { name: 'Beyaz Çikolatalı Kinder Cookie', img: '/images/menu/cookies/kinder-cookie.jpeg' },
      { name: 'Red Velvet Cookie', img: '/images/menu/cookies/red-velvet-cookie.jpeg' },
      { name: 'Oreo Parçacıklı Cookie', img: '/images/menu/cookies/oreo-cookie.jpeg' },
      { name: 'Uji Matcha Cookie', img: '/images/menu/cookies/matcha-cookie.jpeg' },
      { name: 'Tiramisu & Espresso Cookie', img: '/images/menu/cookies/tiramisu-cookie.jpeg' },
      { name: 'Yaban Mersinli Cookie', img: '/images/menu/cookies/blueberry-cookie.jpeg' },
      { name: 'Çilekli & Beyaz Çikolatalı Cookie', img: '/images/menu/cookies/cilekli-cookie.jpeg' },
      { name: 'Limonlu Glaze Cookie', img: '/images/menu/cookies/limonlu-cookie.jpeg' },
      { name: 'Vişne Marmelatlı Cookie', img: '/images/menu/cookies/visne-marmelat-cookie.jpeg' },
      { name: 'Sütlü Çikolatalı Klasik Cookie', img: '/images/menu/cookies/sutlu-cikolatali-cookie.jpeg' },
    ],
  },
  {
    id: 'desserts',
    name: { tr: 'Tatlılar & Pasta', en: 'Desserts & Cakes' },
    description: { tr: 'Özel reçeteli pastalar, artisan San Sebastian ve el yapımı tatlılar.', en: 'Signature recipe cakes, artisan San Sebastian and handcrafted pastries.' },
    heroImg: '/images/menu/tatlilar/fistikli-tiramisu.jpeg',
    items: [
      { name: 'Antep Fıstıklı Tiramisu', img: '/images/menu/tatlilar/fistikli-tiramisu.jpeg' },
      { name: 'Brownie Intense', img: '/images/menu/tatlilar/brownie.png' },
      { name: 'Ballı Pasta (Medovik)', img: '/images/menu/tatlilar/balli-pasta-medovik.png' },
      { name: 'Meyveli Cheesecake Tart', img: '/images/menu/tatlilar/meyveli-cheesecake-tart.jpeg' },
      { name: 'Çikolatalı New York Roll', img: '/images/menu/firindan/cikolatali-new-york-roll.jpeg' },
    ],
  },
];

function CategoryCard({ cat, lang, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group text-left"
      style={{
        padding: '1.125rem 0',
        borderTop: '1px solid #E6DFD6',
        display: 'block',
        width: '100%',
        transition: 'all 0.2s ease',
        borderTopColor: isActive ? '#4A1525' : '#E6DFD6',
      }}
      aria-pressed={isActive}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="type-heading-md text-[#0C0A09] group-hover:text-[#4A1525] transition-colors"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 1.6vw, 1.45rem)',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? '#4A1525' : undefined,
            }}
          >
            {cat.name[lang]}
          </p>
          <p className="type-label text-[#A09690] mt-1">{cat.description[lang]}</p>
        </div>
        <span
          className="type-label transition-transform duration-200"
          style={{
            color: isActive ? '#4A1525' : '#A09690',
            transform: isActive ? 'translateX(4px)' : 'none',
          }}
        >
          →
        </span>
      </div>
    </button>
  );
}

export default function MenuPage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.menuPage;
  const prefix = lang === 'tr' ? '/tr' : '/en';
  const storesHref = lang === 'tr' ? '/tr/magazalar' : '/en/stores';

  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const activeCat = MENU_CATEGORIES.find(c => c.id === activeCategory);

  const headerRef = useReveal();

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      <SiteNav theme="light" />

      {/* ── Page Header ── */}
      <section
        className="section-padding"
        style={{ paddingTop: 'calc(72px + clamp(3rem, 6vw, 5rem))', borderBottom: '1px solid #E6DFD6' }}
      >
        <div ref={headerRef} className="container">
          <div>
            <p className="reveal type-label text-[#4A1525] mb-4">{t.overline}</p>
            <h1
              className="reveal reveal-delay-1 type-display-lg text-[#0C0A09]"
              style={{ fontWeight: 300, fontStyle: 'italic', maxWidth: '700px' }}
            >
              {t.headline}
            </h1>
            <p className="reveal reveal-delay-2 type-body-lg text-[#7A6E65] mt-4 max-w-lg">
              {t.body}
            </p>
          </div>
        </div>
      </section>

      {/* ── Category Explorer ── */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Left — category list */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <p className="type-label text-[#A09690] mb-6">
                {lang === 'tr' ? 'Ritüel Kategorileri' : 'Ritual Categories'}
              </p>
              <div>
                {MENU_CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    lang={lang}
                    isActive={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                ))}
                {/* Last border */}
                <div style={{ borderBottom: '1px solid #E6DFD6' }} />
              </div>
            </div>

            {/* Right — active category showcase */}
            <div className="lg:col-span-3">
              {activeCat && (
                <div key={activeCat.id} className="reveal revealed">
                  {/* Category hero image banner */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      background: '#E6DFD6',
                      overflow: 'hidden',
                      marginBottom: '2.5rem',
                    }}
                    className="img-hover-scale"
                  >
                    <img
                      src={activeCat.heroImg}
                      alt={activeCat.name[lang]}
                      className="img-cover"
                      loading="eager"
                    />
                  </div>

                  {/* Category title & description */}
                  <div className="mb-8">
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)',
                        fontWeight: 300,
                        color: '#0C0A09',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {activeCat.name[lang]}
                    </h2>
                    <p className="type-body text-[#7A6E65]">{activeCat.description[lang]}</p>
                  </div>

                  {/* Product Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                    {activeCat.items.map((item, i) => (
                      <div
                        key={i}
                        className="group"
                      >
                        <div
                          style={{
                            aspectRatio: '1/1',
                            background: '#F0EDE8',
                            overflow: 'hidden',
                            marginBottom: '0.875rem',
                          }}
                          className="img-hover-scale"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="img-cover"
                            loading="lazy"
                          />
                        </div>
                        <p
                          className="group-hover:text-[#4A1525] transition-colors"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.0625rem',
                            fontWeight: 400,
                            color: '#1B1815',
                          }}
                        >
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Invitation / Stores CTA ── */}
      <section
        style={{ background: '#4A1525', padding: 'clamp(4rem, 8vw, 6.5rem) 0' }}
      >
        <div className="container text-center">
          <p className="type-label text-white/50 mb-4">
            {lang === 'tr' ? 'Mekânlarımızda Deneyimleyin' : 'Experience in Our Spaces'}
          </p>
          <h2
            className="type-display-md text-white mb-8"
            style={{ fontStyle: 'italic', fontWeight: 300, maxWidth: '580px', margin: '0 auto 2.5rem' }}
          >
            {lang === 'tr'
              ? 'Tüm ritüellerimiz,\nmağazalarımızda sizi bekliyor.'
              : 'All our rituals await you\nin our stores.'}
          </h2>
          <Link
            to={storesHref}
            className="btn-primary"
            style={{ background: '#fff', color: '#4A1525' }}
          >
            {lang === 'tr' ? 'Mağazaları Keşfet' : 'Explore Stores'} →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
