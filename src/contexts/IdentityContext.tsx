import React from 'react';

export interface Identity {
  username?: string;
}

const IdentityContext = React.createContext<Identity | null>(null);

export default IdentityContext;
