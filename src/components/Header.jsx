import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, switchLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-text">AIO</span>
        </div>
        
        <ul className="nav-links">
          <li>
            <button 
              onClick={() => scrollToSection('home')}
              className="nav-link"
            >
              {t('navigation.home')}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link"
            >
              {t('navigation.about')}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('products')}
              className="nav-link"
            >
              {t('navigation.products')}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('location')}
              className="nav-link"
            >
              {t('navigation.location')}
            </button>
          </li>
          <li>
            <button 
              onClick={() => switchLanguage(language === 'tr' ? 'en' : 'tr')}
              className="language-switch"
            >
              {t('language.switch')}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
