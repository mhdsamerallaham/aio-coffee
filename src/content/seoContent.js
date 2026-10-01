// AIO Coffee — SEO & GEO Metadata & Schema.org JSON-LD Dictionary
// Fully bilingual (TR / EN) with entity relations, developer attribution, and high-density citation data.

export const DEVELOPER_ENTITY = {
  '@type': 'Person',
  name: 'Samer',
  url: 'https://www.samer.life',
  jobTitle: 'Principal Full-Stack Engineer',
  sameAs: 'https://www.samer.life',
};

export const BASE_ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': 'https://aiocoffee.com/#organization',
  name: 'AIO Coffee',
  alternateName: ['All in One Coffee', 'AIO Specialty Coffee'],
  url: 'https://aiocoffee.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://aiocoffee.com/images/logo.png',
    width: 200,
    height: 72,
  },
  email: 'info@aiocoffee.com',
  sameAs: ['https://www.instagram.com/aio.allinonecoffee'],
  creator: DEVELOPER_ENTITY,
};

export const STORE_LOCATIONS_SCHEMA = [
  {
    '@type': 'CafeOrCoffeeShop',
    '@id': 'https://aiocoffee.com/#istanbul-store',
    name: 'AIO Coffee — Rumeli Caddesi (İstanbul)',
    image: 'https://aiocoffee.com/images/stores/istanbul-store.jpg',
    url: 'https://aiocoffee.com/tr/magazalar',
    telephone: '+902120000000',
    priceRange: '$$',
    servesCuisine: ['Specialty Coffee', 'Brunch', 'Matcha', 'Artisan Bakery'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cumhuriyet Mahallesi, Rumeli Caddesi No: 94A',
      addressLocality: 'Şişli',
      addressRegion: 'İstanbul',
      postalCode: '34380',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0553,
      longitude: 28.9866,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    hasMap: 'https://maps.google.com/?q=Cumhuriyet+Mahallesi+Rumeli+Caddesi+No+94A+Şişli+İstanbul',
    parentOrganization: { '@id': 'https://aiocoffee.com/#organization' },
    creator: DEVELOPER_ENTITY,
  },
  {
    '@type': 'CafeOrCoffeeShop',
    '@id': 'https://aiocoffee.com/#izmir-store',
    name: 'AIO Coffee — Alsancak (İzmir)',
    image: 'https://aiocoffee.com/images/stores/izmir-store.jpg',
    url: 'https://aiocoffee.com/tr/magazalar',
    telephone: '+902320000000',
    priceRange: '$$',
    servesCuisine: ['Specialty Coffee', 'Brunch', 'Matcha', 'Artisan Bakery'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gül Sokak (1382. Sk.)',
      addressLocality: 'Alsancak, Konak',
      addressRegion: 'İzmir',
      postalCode: '35220',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.4382,
      longitude: 27.1425,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    hasMap: 'https://www.google.com/maps/search/?api=1&query=AIO+COFFEE+Alsancak+İzmir',
    parentOrganization: { '@id': 'https://aiocoffee.com/#organization' },
    creator: DEVELOPER_ENTITY,
  },
];

export const seoContent = {
  tr: {
    home: {
      title: 'AIO Coffee — Specialty Kahve & Ritüeller | İstanbul & İzmir',
      description: 'AIO Coffee: İstanbul Şişli ve İzmir Alsancak’ta specialty coffee, seremoniyel matcha ve gourmet brunch ritüelleri. All in One deneyimi.',
      path: '/tr',
      trPath: '/tr',
      enPath: '/en',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'WebSite',
          '@id': 'https://aiocoffee.com/#website',
          name: 'AIO Coffee',
          url: 'https://aiocoffee.com/tr',
          inLanguage: 'tr-TR',
          publisher: { '@id': 'https://aiocoffee.com/#organization' },
          creator: DEVELOPER_ENTITY,
        },
        ...STORE_LOCATIONS_SCHEMA,
      ],
    },
    about: {
      title: 'Biz Kimiz — AIO Coffee Hikayesi & Değerlerimiz',
      description: 'AIO Coffee manifestosu: Kahveyi bir içecekten öte günlük bir ritüele dönüştüren All in One felsefesi, kavurma disiplini ve mimari vizyonumuz.',
      path: '/tr/biz-kimiz',
      trPath: '/tr/biz-kimiz',
      enPath: '/en/about',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'AboutPage',
          '@id': 'https://aiocoffee.com/tr/biz-kimiz#webpage',
          name: 'Biz Kimiz — AIO Coffee',
          url: 'https://aiocoffee.com/tr/biz-kimiz',
          inLanguage: 'tr-TR',
          mainEntity: {
            '@type': 'Organization',
            name: 'AIO Coffee',
            foundingDate: '2025',
            description: 'Kahveyi içecekten öte günün ritüeli kılan bağımsız specialty kahve markası.',
            creator: DEVELOPER_ENTITY,
          },
        },
      ],
    },
    stores: {
      title: 'Mağazalarımız — Şişli İstanbul & Alsancak İzmir | AIO Coffee',
      description: 'AIO Coffee şubeleri: İstanbul Şişli Rumeli Caddesi ve İzmir Alsancak Gül Sokak mağazalarımızın adresleri, çalışma saatleri ve harita konumları.',
      path: '/tr/magazalar',
      trPath: '/tr/magazalar',
      enPath: '/en/stores',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        ...STORE_LOCATIONS_SCHEMA,
      ],
    },
    menu: {
      title: 'Menü & Kahve Ritüelleri — Specialty Kahve & Brunch | AIO Coffee',
      description: 'AIO Coffee menüsü: Tek kökenli espresso ritüelleri, 48h nitro cold brew, Japon Uji matchası, Chemex demlemeler ve leziz artisan brunch.',
      path: '/tr/menu',
      trPath: '/tr/menu',
      enPath: '/en/menu',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'Menu',
          '@id': 'https://aiocoffee.com/tr/menu#menu',
          name: 'AIO Coffee Ritüel Menüsü',
          url: 'https://aiocoffee.com/tr/menu',
          inLanguage: 'tr-TR',
          hasMenuSection: [
            {
              '@type': 'MenuSection',
              name: 'Coffee Rituals (Sıcak Kahveler)',
              description: 'Özel seçki çekirdekler, çift shot espresso ve kadife süt dokusu.',
            },
            {
              '@type': 'MenuSection',
              name: 'Ice Rituals (Soğuk Kahveler)',
              description: '48h soğuk damıtım cold brew, buzlu latte ve ferahlatıcı lezzetler.',
            },
            {
              '@type': 'MenuSection',
              name: 'Matcha Rituals',
              description: 'Japonya Uji bölgesinden A-grade seremoniyel matcha içecekleri.',
            },
            {
              '@type': 'MenuSection',
              name: 'Brew Bar (Manuel Demleme)',
              description: 'V60, Chemex ve geleneksel Türk kahvesi demleme ritüelleri.',
            },
            {
              '@type': 'MenuSection',
              name: 'All Day Brunch & Bakery',
              description: 'Taze fırın ürünleri, fıstıklı tiramisu ve gurme sandviçler.',
            },
          ],
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
    franchise: {
      title: 'Franchise & İş Ortaklığı — Yatırım Modeli | AIO Coffee',
      description: 'AIO Coffee franchise ortaklığı: Mimari tasarım gücü, AIO Barista Akademisi, merkezi tedarik ve bölge korumalı sürdürülebilir yatırım modeli.',
      path: '/tr/franchise',
      trPath: '/tr/franchise',
      enPath: '/en/franchise',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'Service',
          name: 'AIO Coffee Franchise & Kurumsal Ortaklık Programı',
          provider: { '@id': 'https://aiocoffee.com/#organization' },
          serviceType: 'Franchise Partnership',
          areaServed: 'TR',
          creator: DEVELOPER_ENTITY,
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'AIO Coffee franchise süreci nasıl ilerler?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Franchise süreci: 1) Ön başvuru incelemesi, 2) Yaya trafiği ve lokasyon fizibilitesi, 3) 3D mimari proje ve anahtar teslim kurulum, 4) AIO Barista Akademisi eğitimi ve operasyonel açılış desteği adımlarından oluşur.',
              },
            },
            {
              '@type': 'Question',
              name: 'AIO Coffee mağaza personeline eğitim veriyor mu?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Evet. AIO Barista Akademisi kapsamında tüm barista ve servis ekibine çekirdek kimyası, ekstraksiyon, latte art, hijyen ve misafirperverlik standartları eğitimi eksiksiz verilir.',
              },
            },
            {
              '@type': 'Question',
              name: 'Bölge koruması sağlanıyor mu?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Evet. İş ortaklarımızın ticari sürdürülebilirliğini korumak adına açılan her AIO mağazası için korumalı bölge yarıçapı uygulanır.',
              },
            },
          ],
        },
      ],
    },
    blog: {
      title: 'Blog & Kahve Kültürü — Specialty Kahve Rehberi | AIO Coffee',
      description: 'Kahve ritüelleri, çekirdek orijinleri, seremoniyel matcha kültürü ve demleme incelikleri hakkında ilham veren AIO Coffee yazıları.',
      path: '/tr/blog',
      trPath: '/tr/blog',
      enPath: '/en/blog',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'Blog',
          '@id': 'https://aiocoffee.com/tr/blog#blog',
          name: 'AIO Coffee Kültür & Demleme Günlüğü',
          publisher: { '@id': 'https://aiocoffee.com/#organization' },
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
    career: {
      title: 'Kariyer — AIO Ekibine Katılın | Barista & Mutfak Ekibi',
      description: 'AIO Coffee ailesine katılın: İstanbul ve İzmir mağazalarımızda barista, servis uzmanı ve mutfak ekibi kariyer fırsatları. Başvuru yapın.',
      path: '/tr/kariyer',
      trPath: '/tr/kariyer',
      enPath: '/en/careers',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'JobPosting',
          title: 'Specialty Coffee Barista & Service Specialist',
          description: 'AIO Coffee İstanbul ve İzmir mağazalarında specialty kahve ritüellerini icra edecek barista ve misafirperverlik ekibi arayışımız sürmektedir.',
          identifier: {
            '@type': 'PropertyValue',
            name: 'AIO Coffee',
            value: 'BARISTA-2026',
          },
          datePosted: '2026-01-01',
          employmentType: 'FULL_TIME',
          hiringOrganization: { '@id': 'https://aiocoffee.com/#organization' },
          jobLocation: [
            {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Şişli',
                addressRegion: 'İstanbul',
                addressCountry: 'TR',
              },
            },
            {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Alsancak',
                addressRegion: 'İzmir',
                addressCountry: 'TR',
              },
            },
          ],
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
    contact: {
      title: 'İletişim — Mağazalar & Müşteri Hizmetleri | AIO Coffee',
      description: 'AIO Coffee ile iletişime geçin. İstanbul Şişli ve İzmir Alsancak mağazalarımızın telefon, e-posta, çalışma saatleri ve harita rehberi.',
      path: '/tr/iletisim',
      trPath: '/tr/iletisim',
      enPath: '/en/contact',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'ContactPage',
          '@id': 'https://aiocoffee.com/tr/iletisim#contactpage',
          name: 'İletişim — AIO Coffee',
          url: 'https://aiocoffee.com/tr/iletisim',
          mainEntity: {
            '@type': 'Organization',
            name: 'AIO Coffee',
            email: 'info@aiocoffee.com',
            creator: DEVELOPER_ENTITY,
          },
        },
        ...STORE_LOCATIONS_SCHEMA,
      ],
    },
    privacy: {
      title: 'Gizlilik İlkesi & KVKK Aydınlatma Metni — AIO Coffee',
      description: 'AIO Coffee Gizlilik İlkesi ve KVKK Aydınlatma Metni: Kişisel verilerinizin işlenmesi, korunması, çerez politikası ve yasal haklarınız.',
      path: '/tr/gizlilik-politikasi',
      trPath: '/tr/gizlilik-politikasi',
      enPath: '/en/privacy-policy',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'WebPage',
          '@id': 'https://aiocoffee.com/tr/gizlilik-politikasi#webpage',
          name: 'Gizlilik İlkesi ve KVKK Aydınlatma Metni',
          url: 'https://aiocoffee.com/tr/gizlilik-politikasi',
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
  },

  en: {
    home: {
      title: 'AIO Coffee — Specialty Coffee Rituals | Istanbul & Izmir',
      description: 'AIO Coffee: Independent specialty coffee, ceremonial matcha, and gourmet brunch rituals in Istanbul Nişantaşı/Şişli and Izmir Alsancak.',
      path: '/en',
      trPath: '/tr',
      enPath: '/en',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'WebSite',
          '@id': 'https://aiocoffee.com/en#website',
          name: 'AIO Coffee',
          url: 'https://aiocoffee.com/en',
          inLanguage: 'en-US',
          publisher: { '@id': 'https://aiocoffee.com/#organization' },
          creator: DEVELOPER_ENTITY,
        },
        ...STORE_LOCATIONS_SCHEMA,
      ],
    },
    about: {
      title: 'Our Story — The AIO Coffee Ritual & Brand Ethos',
      description: 'The AIO Coffee manifesto: Transforming specialty coffee into an elevated daily ritual through architectural design, craft roasting, and hospitality.',
      path: '/en/about',
      trPath: '/tr/biz-kimiz',
      enPath: '/en/about',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'AboutPage',
          '@id': 'https://aiocoffee.com/en/about#webpage',
          name: 'Our Story — AIO Coffee',
          url: 'https://aiocoffee.com/en/about',
          inLanguage: 'en-US',
          mainEntity: {
            '@type': 'Organization',
            name: 'AIO Coffee',
            foundingDate: '2025',
            creator: DEVELOPER_ENTITY,
          },
        },
      ],
    },
    stores: {
      title: 'Our Stores — Şişli Istanbul & Alsancak Izmir | AIO Coffee',
      description: 'Visit AIO Coffee in Istanbul (Rumeli Avenue, Şişli) and Izmir (Gül Street, Alsancak). View opening hours, directions, and maps.',
      path: '/en/stores',
      trPath: '/tr/magazalar',
      enPath: '/en/stores',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        ...STORE_LOCATIONS_SCHEMA,
      ],
    },
    menu: {
      title: 'Menu & Coffee Rituals — Specialty Coffee & Food | AIO Coffee',
      description: 'AIO Coffee menu: Single-origin espresso drinks, 48h nitro cold brew, authentic Japanese Uji matcha, Chemex filter, and all-day artisanal brunch.',
      path: '/en/menu',
      trPath: '/tr/menu',
      enPath: '/en/menu',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'Menu',
          '@id': 'https://aiocoffee.com/en/menu#menu',
          name: 'AIO Coffee Ritual Menu',
          url: 'https://aiocoffee.com/en/menu',
          inLanguage: 'en-US',
          hasMenuSection: [
            {
              '@type': 'MenuSection',
              name: 'Coffee Rituals (Espresso)',
              description: 'Single-origin beans, precision extraction, silky microfoam.',
            },
            {
              '@type': 'MenuSection',
              name: 'Ice Rituals (Cold Brew & Iced)',
              description: '48h slow drip cold brew, iced latte, and refreshing drinks.',
            },
            {
              '@type': 'MenuSection',
              name: 'Matcha Rituals',
              description: 'A-grade ceremonial matcha from Uji, Kyoto.',
            },
            {
              '@type': 'MenuSection',
              name: 'Brew Bar (Pour Over)',
              description: 'V60, Chemex, and authentic Turkish coffee rituals.',
            },
            {
              '@type': 'MenuSection',
              name: 'All Day Brunch & Bakery',
              description: 'Fresh baked pastries, pistachio tiramisu, and gourmet bowls.',
            },
          ],
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
    franchise: {
      title: 'Franchise & Partnership — Investment Model | AIO Coffee',
      description: 'Partner with AIO Coffee: A sustainable specialty coffee franchise model offering architectural identity, barista academy training, and territory protection.',
      path: '/en/franchise',
      trPath: '/tr/franchise',
      enPath: '/en/franchise',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'Service',
          name: 'AIO Coffee Franchise & Corporate Partnership',
          provider: { '@id': 'https://aiocoffee.com/#organization' },
          serviceType: 'Franchise Partnership',
          areaServed: 'TR',
          creator: DEVELOPER_ENTITY,
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How does the AIO Coffee franchise onboarding process work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The onboarding consists of: 1) Initial discovery meeting, 2) Foot-traffic feasibility analysis, 3) 3D architectural project and turnkey buildout, 4) AIO Barista Academy training and operational grand opening support.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does AIO Coffee provide staff barista training?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Every team member undergoes intensive curriculum training at the AIO Barista Academy covering bean origins, extraction science, latte art, and guest hospitality.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is territory protection provided for new franchise locations?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Designated territory protection radii are established for every location to ensure long-term commercial sustainability.',
              },
            },
          ],
        },
      ],
    },
    blog: {
      title: 'Journal & Coffee Culture — Specialty Guides | AIO Coffee',
      description: 'Explore the AIO Coffee journal: Brewing guides, bean origins, ceremonial matcha culture, and specialty lifestyle articles.',
      path: '/en/blog',
      trPath: '/tr/blog',
      enPath: '/en/blog',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'Blog',
          '@id': 'https://aiocoffee.com/en/blog#blog',
          name: 'AIO Coffee Journal',
          publisher: { '@id': 'https://aiocoffee.com/#organization' },
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
    careers: {
      title: 'Careers — Join the AIO Coffee Team | Barista & Hospitality',
      description: 'Build your hospitality career with AIO Coffee. Explore barista, kitchen, and store management opportunities in Istanbul and Izmir.',
      path: '/en/careers',
      trPath: '/tr/kariyer',
      enPath: '/en/careers',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'JobPosting',
          title: 'Specialty Coffee Barista & Hospitality Specialist',
          description: 'AIO Coffee is hiring talented baristas and front-of-house team members across our Istanbul and Izmir flagships.',
          identifier: {
            '@type': 'PropertyValue',
            name: 'AIO Coffee',
            value: 'BARISTA-EN-2026',
          },
          datePosted: '2026-01-01',
          employmentType: 'FULL_TIME',
          hiringOrganization: { '@id': 'https://aiocoffee.com/#organization' },
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
    contact: {
      title: 'Contact Us — Stores & Inquiries | AIO Coffee',
      description: 'Get in touch with AIO Coffee. Find store addresses in Istanbul and Izmir, direct email contacts, opening hours, and location maps.',
      path: '/en/contact',
      trPath: '/tr/iletisim',
      enPath: '/en/contact',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'ContactPage',
          '@id': 'https://aiocoffee.com/en/contact#contactpage',
          name: 'Contact — AIO Coffee',
          url: 'https://aiocoffee.com/en/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'AIO Coffee',
            email: 'info@aiocoffee.com',
            creator: DEVELOPER_ENTITY,
          },
        },
        ...STORE_LOCATIONS_SCHEMA,
      ],
    },
    privacy: {
      title: 'Privacy Policy & Data Protection Notice — AIO Coffee',
      description: 'AIO Coffee Privacy Policy and Data Protection Notice: Information on personal data processing, cookie policies, and your legal rights under KVKK & GDPR.',
      path: '/en/privacy-policy',
      trPath: '/tr/gizlilik-politikasi',
      enPath: '/en/privacy-policy',
      schema: [
        BASE_ORGANIZATION_SCHEMA,
        {
          '@type': 'WebPage',
          '@id': 'https://aiocoffee.com/en/privacy-policy#webpage',
          name: 'Privacy Policy & Data Protection Notice',
          url: 'https://aiocoffee.com/en/privacy-policy',
          creator: DEVELOPER_ENTITY,
        },
      ],
    },
  },
};

export function getSeoMetadata(pageKey, lang = 'tr') {
  const localized = seoContent[lang] || seoContent.tr;
  return localized[pageKey] || localized.home;
}
