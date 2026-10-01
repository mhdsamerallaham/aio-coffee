// AIO Coffee — BlogPage
// Editorial blog — coffee culture, brewing guides, ritual stories

import React, { useState } from 'react';
import useLangStore from '../../store/langStore';
import { getContent } from '../../content/siteContent';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import SeoHead from '../../components/seo/SeoHead';
import { getSeoMetadata } from '../../content/seoContent';
import { useReveal } from '../../lib/useReveal';

// ── Category filter pill
function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="type-label px-4 py-2 transition-all"
      style={{
        border: `1px solid ${active ? '#4A1525' : '#DDD8D3'}`,
        background: active ? '#4A1525' : 'transparent',
        color: active ? '#fff' : '#7A6E65',
        cursor: 'pointer',
      }}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

// ── Blog post card
function BlogCard({ post, index, lang }) {
  const isLarge = index === 0;

  return (
    <article
      className="group cursor-pointer"
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
      }}
    >
      {/* Image */}
      <div
        className="img-hover-scale mb-5"
        style={{
          aspectRatio: isLarge ? '16/7' : '3/4',
          background: '#E6DFD6',
          overflow: 'hidden',
        }}
      >
        <img
          src={post.img}
          alt={post.title}
          className="img-cover"
          style={{ opacity: 0.92 }}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <span className="type-label text-[#4A1525]">{post.category}</span>
        <span className="type-label text-[#C5BDB7]">·</span>
        <span className="type-label text-[#A09690]">{post.readTime}</span>
      </div>

      {/* Title */}
      <h2
        className="group-hover:text-[#4A1525] transition-colors mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isLarge ? 'clamp(1.5rem, 2.5vw, 2.25rem)' : 'clamp(1.125rem, 1.8vw, 1.5rem)',
          fontWeight: 400,
          color: '#0C0A09',
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        className="type-body text-[#7A6E65]"
        style={{
          maxWidth: isLarge ? '700px' : '100%',
          lineHeight: 1.65,
        }}
      >
        {post.excerpt}
      </p>

      {/* Read more link */}
      <span
        className="inline-flex items-center gap-2 mt-4 type-label text-[#A09690] group-hover:text-[#4A1525] transition-colors"
      >
        {lang === 'tr' ? 'Devamını Oku' : 'Read More'} →
      </span>
    </article>
  );
}

export default function BlogPage() {
  const { lang } = useLangStore();
  const content = getContent(lang);
  const t = content.blog;
  const seo = getSeoMetadata('blog', lang);

  const headerRef = useReveal();
  const gridRef = useReveal();

  // Extract unique categories from posts
  const allCategories = t.posts ? [...new Set(t.posts.map(p => p.category))] : [];
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = t.posts
    ? (activeCategory === 'all' ? t.posts : t.posts.filter(p => p.category === activeCategory))
    : [];

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
      {/* ── Dynamic SEO & GEO Meta Tags ── */}
      <SeoHead {...seo} lang={lang} />

      <SiteNav theme="light" />

      {/* ── Page Header ── */}
      <section
        style={{
          paddingTop: 'calc(72px + clamp(3rem, 6vw, 5rem))',
          paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
          borderBottom: '1px solid #E6DFD6',
        }}
      >
        <div ref={headerRef} className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="reveal type-label text-[#4A1525] mb-4">{t.overline}</p>
              <h1
                className="reveal reveal-delay-1 type-display-lg text-[#0C0A09]"
                style={{ fontWeight: 300, fontStyle: 'italic', maxWidth: '600px' }}
              >
                {t.headline}
              </h1>
              <p className="reveal reveal-delay-2 type-body-lg text-[#7A6E65] mt-4 max-w-md">
                {t.body}
              </p>
            </div>

            {/* Category Filters */}
            {allCategories.length > 0 && (
              <div className="reveal reveal-delay-2 flex flex-wrap gap-2 shrink-0">
                <FilterPill
                  label={lang === 'tr' ? 'Tümü' : 'All'}
                  active={activeCategory === 'all'}
                  onClick={() => setActiveCategory('all')}
                />
                {allCategories.map(cat => (
                  <FilterPill
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Posts Grid ── */}
      {filteredPosts.length > 0 ? (
        <section
          ref={gridRef}
          className="section-padding"
          aria-label="Blog posts"
        >
          <div className="container">
            {/* Featured post (first) */}
            {activeCategory === 'all' && filteredPosts[0] && (
              <div className="reveal mb-16 pb-16 border-b border-[#E6DFD6]">
                <article className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  {/* Image */}
                  <div
                    className="img-hover-scale"
                    style={{ aspectRatio: '4/3', background: '#E6DFD6', overflow: 'hidden' }}
                  >
                    <img
                      src={filteredPosts[0].img}
                      alt={filteredPosts[0].title}
                      className="img-cover"
                      loading="eager"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="type-label px-3 py-1"
                        style={{ background: '#4A1525', color: '#fff' }}
                      >
                        {lang === 'tr' ? 'Öne Çıkan' : 'Featured'}
                      </span>
                      <span className="type-label text-[#A09690]">{filteredPosts[0].category}</span>
                      <span className="type-label text-[#C5BDB7]">·</span>
                      <span className="type-label text-[#A09690]">{filteredPosts[0].readTime}</span>
                    </div>
                    <h2
                      className="group-hover:text-[#4A1525] transition-colors mb-5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                        fontWeight: 400,
                        color: '#0C0A09',
                        lineHeight: 1.15,
                      }}
                    >
                      {filteredPosts[0].title}
                    </h2>
                    <p className="type-body-lg text-[#5C5349] mb-8" style={{ lineHeight: 1.7 }}>
                      {filteredPosts[0].excerpt}
                    </p>
                    <span className="btn-ghost text-[#0C0A09]">
                      {lang === 'tr' ? 'Devamını Oku' : 'Read More'} →
                    </span>
                  </div>
                </article>
              </div>
            )}

            {/* Remaining posts grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
            >
              {(activeCategory === 'all' ? filteredPosts.slice(1) : filteredPosts).map((post, i) => (
                <article
                  key={post.id}
                  className="reveal group cursor-pointer"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  {/* Image */}
                  <div
                    className="img-hover-scale mb-5"
                    style={{ aspectRatio: '4/3', background: '#E6DFD6', overflow: 'hidden' }}
                  >
                    <img
                      src={post.img}
                      alt={post.title}
                      className="img-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="type-label text-[#4A1525]">{post.category}</span>
                    <span className="type-label text-[#C5BDB7]">·</span>
                    <span className="type-label text-[#A09690]">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2
                    className="group-hover:text-[#4A1525] transition-colors mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)',
                      fontWeight: 400,
                      color: '#0C0A09',
                      lineHeight: 1.25,
                    }}
                  >
                    {post.title}
                  </h2>

                  <p className="type-body text-[#7A6E65]" style={{ lineHeight: 1.65 }}>
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 mt-4 type-label text-[#A09690] group-hover:text-[#4A1525] transition-colors">
                    {lang === 'tr' ? 'Devamını Oku' : 'Read More'} →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* No posts fallback */
        <section className="section-padding">
          <div className="container">
            <div
              className="flex flex-col items-center justify-center py-24 text-center"
              style={{ borderTop: '1px solid #E6DFD6' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#DDD8D3',
                  marginBottom: '1.5rem',
                }}
              >
                {lang === 'tr' ? 'Yakında.' : 'Coming soon.'}
              </p>
              <p className="type-body text-[#A09690]">
                {lang === 'tr' ? 'Kahve hikayeleri çok yakında burada olacak.' : 'Coffee stories will be here soon.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter / Instagram CTA ── */}
      <section
        style={{
          background: '#0C0A09',
          padding: 'clamp(4rem, 8vw, 7rem) 0',
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="type-label text-white/30 mb-3">
                {lang === 'tr' ? 'Günlük Ritüeller' : 'Daily Rituals'}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#fff',
                  lineHeight: 1.2,
                }}
              >
                {lang === 'tr' ? 'Instagram\'da bizi takip et.' : 'Follow us on Instagram.'}
              </h3>
            </div>
            <a
              href="https://www.instagram.com/aio.allinonecoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-white shrink-0"
              style={{ borderBottomColor: 'rgba(255,255,255,0.3)' }}
            >
              @aio.allinonecoffee ↗
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
