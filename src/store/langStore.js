// AIO Coffee — Language Store (Zustand)
// Manages TR/EN language selection for brand site

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLangStore = create(
  persist(
    (set, get) => ({
      lang: 'tr',
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === 'tr' ? 'en' : 'tr' }),
    }),
    {
      name: 'aio-lang',
    }
  )
);

export default useLangStore;
