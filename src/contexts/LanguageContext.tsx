import React from 'react';

export type UserLanguage = 'en' | 'nl';

const LanguageContext = React.createContext<UserLanguage>('en');

export default LanguageContext;
