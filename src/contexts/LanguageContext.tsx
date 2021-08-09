import React from 'react';

type UserLanguage = 'en' | 'nl';

const LanguageContext = React.createContext<UserLanguage>('en');

export default LanguageContext;
