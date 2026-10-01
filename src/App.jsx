// AIO Coffee — App Router
// Brand site + Digital Menu app routing

import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Brand site pages (lazy loaded)
const HomePage    = lazy(() => import('./pages/brand/HomePage'));
const AboutPage   = lazy(() => import('./pages/brand/AboutPage'));
const StoresPage  = lazy(() => import('./pages/brand/StoresPage'));
const MenuPage    = lazy(() => import('./pages/brand/MenuPage'));
const BlogPage    = lazy(() => import('./pages/brand/BlogPage'));
const CareerPage  = lazy(() => import('./pages/brand/CareerPage'));
const ContactPage = lazy(() => import('./pages/brand/ContactPage'));
const FranchisePage = lazy(() => import('./pages/brand/FranchisePage'));
const PrivacyPage = lazy(() => import('./pages/brand/PrivacyPage'));

// Digital Menu App (existing)
import AppShell from './app/AppShell';

// Scroll restoration to top on any route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

// Loading fallback
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF8F5',
      }}
    >
      <div
        style={{
          width: '2px',
          height: '40px',
          background: '#4A1525',
          animation: 'pulse 1.2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50%       { opacity: 1;   transform: scaleY(1);   }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Root & Common Aliases ── */}
          <Route path="/" element={<Navigate to="/tr" replace />} />
          <Route path="/about" element={<Navigate to="/tr/biz-kimiz" replace />} />
          <Route path="/stores" element={<Navigate to="/tr/magazalar" replace />} />
          <Route path="/menu" element={<Navigate to="/tr/menu" replace />} />
          <Route path="/blog" element={<Navigate to="/tr/blog" replace />} />
          <Route path="/career" element={<Navigate to="/tr/kariyer" replace />} />
          <Route path="/careers" element={<Navigate to="/en/careers" replace />} />
          <Route path="/franchise" element={<Navigate to="/tr/franchise" replace />} />
          <Route path="/contact" element={<Navigate to="/tr/iletisim" replace />} />
          <Route path="/iletisim" element={<Navigate to="/tr/iletisim" replace />} />
          <Route path="/privacy" element={<Navigate to="/tr/gizlilik-politikasi" replace />} />
          <Route path="/gizlilik" element={<Navigate to="/tr/gizlilik-politikasi" replace />} />
          <Route path="/gizlilik-ilkesi" element={<Navigate to="/tr/gizlilik-politikasi" replace />} />
          <Route path="/gizlilik-politikasi" element={<Navigate to="/tr/gizlilik-politikasi" replace />} />

          {/* ── Turkish routes ── */}
          <Route path="/tr"               element={<HomePage />} />
          <Route path="/tr/biz-kimiz"     element={<AboutPage />} />
          <Route path="/tr/magazalar"     element={<StoresPage />} />
          <Route path="/tr/menu"          element={<MenuPage />} />
          <Route path="/tr/franchise"     element={<FranchisePage />} />
          <Route path="/tr/blog"          element={<BlogPage />} />
          <Route path="/tr/kariyer"       element={<CareerPage />} />
          <Route path="/tr/iletisim"      element={<ContactPage />} />
          <Route path="/tr/gizlilik-politikasi" element={<PrivacyPage />} />
          {/* Turkish path aliases */}
          <Route path="/tr/gizlilik-ilkesi" element={<Navigate to="/tr/gizlilik-politikasi" replace />} />
          <Route path="/tr/privacy"        element={<Navigate to="/tr/gizlilik-politikasi" replace />} />
          <Route path="/tr/privacy-policy" element={<Navigate to="/tr/gizlilik-politikasi" replace />} />
          <Route path="/tr/about"         element={<Navigate to="/tr/biz-kimiz" replace />} />
          <Route path="/tr/stores"        element={<Navigate to="/tr/magazalar" replace />} />
          <Route path="/tr/contact"       element={<Navigate to="/tr/iletisim" replace />} />
          <Route path="/tr/careers"       element={<Navigate to="/tr/kariyer" replace />} />

          {/* ── English routes ── */}
          <Route path="/en"               element={<HomePage />} />
          <Route path="/en/about"         element={<AboutPage />} />
          <Route path="/en/stores"        element={<StoresPage />} />
          <Route path="/en/menu"          element={<MenuPage />} />
          <Route path="/en/franchise"     element={<FranchisePage />} />
          <Route path="/en/blog"          element={<BlogPage />} />
          <Route path="/en/careers"       element={<CareerPage />} />
          <Route path="/en/contact"       element={<ContactPage />} />
          <Route path="/en/privacy-policy" element={<PrivacyPage />} />
          {/* English path aliases */}
          <Route path="/en/privacy"       element={<Navigate to="/en/privacy-policy" replace />} />
          <Route path="/en/gizlilik-politikasi" element={<Navigate to="/en/privacy-policy" replace />} />
          <Route path="/en/gizlilik-ilkesi" element={<Navigate to="/en/privacy-policy" replace />} />
          <Route path="/en/biz-kimiz"     element={<Navigate to="/en/about" replace />} />
          <Route path="/en/magazalar"     element={<Navigate to="/en/stores" replace />} />
          <Route path="/en/kariyer"       element={<Navigate to="/en/careers" replace />} />
          <Route path="/en/career"        element={<Navigate to="/en/careers" replace />} />
          <Route path="/en/iletisim"      element={<Navigate to="/en/contact" replace />} />

          {/* ── Digital Ordering App ── */}
          <Route path="/app"              element={<AppShell />} />
          <Route path="/admin"            element={<AppShell />} />
          <Route path="/admin/*"          element={<AppShell />} />

          {/* ── Fallback ── */}
          <Route path="*"                 element={<Navigate to="/tr" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
