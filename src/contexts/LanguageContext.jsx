import { createContext, useContext, useState, useEffect } from 'react';

// Import translations
import { trTranslations } from '../locales/tr.js';
import { enTranslations } from '../locales/en.js';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('tr'); // Default Turkish
  
  const translations = {
    tr: trTranslations,
    en: enTranslations
  };

  const currentTranslation = translations[language];

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let value = currentTranslation;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      switchLanguage, 
      t,
      currentTranslation 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
