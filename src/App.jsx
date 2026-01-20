import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Location from './components/Location';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { protectContent, disableRightClick, disableTextSelection } from './utils/devToolsProtection';
import './App.css';

function App() {
  useEffect(() => {
    // Console mesajları
    console.clear();
    console.log('%c🚫 Developer Tools Tespit Edildi!', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cBu sitenin kaynak kodları koruma altındadır.', 'color: orange; font-size: 14px;');
    console.log('%cLütfen izinsiz erişim denemeyin.', 'color: yellow; font-size: 12px;');
    
    // Developer Tools koruması
    const cleanup = protectContent();
    
    // Sağ tık engelleme
    const handleContextMenu = disableRightClick;
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Klavye kısayollarını engelleme
    const handleKeyDown = disableTextSelection;
    document.addEventListener('keydown', handleKeyDown);
    
    // Metin seçim engelleme (CSS ile daha etkili)
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    
    // Drag engelleme
    document.addEventListener('dragstart', (e) => e.preventDefault());
    
    return () => {
      cleanup();
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <About />
          <Products />
          <Location />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
