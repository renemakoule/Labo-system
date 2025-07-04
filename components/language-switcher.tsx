"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
      <Button 
          variant="outline" 
          size="sm"
          onClick={() => setLocale(locale === 'fr' ? 'ar' : 'fr')}
      >
          <Languages className="me-2 h-4 w-4" />
          {locale === 'fr' ? 'العربية' : 'Français'}
      </Button>
  );
}