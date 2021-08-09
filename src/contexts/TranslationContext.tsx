import React from 'react';
import { UserLanguage } from './LanguageContext';

type Json = string | { [key: string]: Json };
type Translation = Record<UserLanguage, Json>;

const TranslationContext = React.createContext<Translation>({
  en: {},
  nl: {},
});

export default TranslationContext;
