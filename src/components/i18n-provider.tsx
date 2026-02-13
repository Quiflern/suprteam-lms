'use client';

import { useEffect } from 'react';
import i18n from '@/lib/i18n';

export function I18nProvider({ children, locale }: { children: React.ReactNode; locale?: string }) {
  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return children;
}