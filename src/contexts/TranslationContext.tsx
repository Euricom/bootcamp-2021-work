/* eslint-disable arrow-body-style */
import React, { useMemo } from 'react';
import { UserLanguage } from './LanguageContext';

export type Json = string | { [key: string]: Json };
type Translation = Record<UserLanguage, Record<string, string>>;
interface TranslationProps {
  children: React.ReactNode;
  nl: Record<string, Json>;
  en: Record<string, Json>;
}

const TranslationContext = React.createContext<Translation>({
  en: {},
  nl: {},
});

const TranslationProvider = ({ children, en, nl }: TranslationProps): JSX.Element => {
  const flattened = useMemo<Translation>(
    () => ({
      en: {},
      nl: {},
    }),
    [],
  );

  return <TranslationContext.Provider value={flattened}>{children}</TranslationContext.Provider>;
};

export { TranslationProvider, TranslationContext };
