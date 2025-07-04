//context/language-context.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import frMessages from '@/messages/fr.json';
import arMessages from '@/messages/ar.json';

type Locale = 'fr' | 'ar';

// CORRECTION 1: Mettre à jour la signature de la fonction `t`
interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages: Record<Locale, any> = {
  fr: frMessages,
  ar: arMessages,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const savedLocale = localStorage.getItem('app-locale') as Locale;
    if (savedLocale && (savedLocale === 'fr' || savedLocale === 'ar')) {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale;
      document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('app-locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  };

  // CORRECTION 2: Améliorer la fonction `t` pour gérer les variables
  const t = (key: string, values?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result: string | any = messages[locale];
    
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; 
      }
    }

    if (typeof result === 'string' && values) {
      // Boucle sur les valeurs à remplacer (ex: {count: 5})
      Object.keys(values).forEach((valueKey) => {
        const regex = new RegExp(`{${valueKey}}`, 'g');
        result = result.replace(regex, String(values[valueKey]));
      });
    }

    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}