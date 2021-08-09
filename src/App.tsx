import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './modules/home/Home';
import Login from './modules/login/Login';
import NotFound from './pages/NotFound';
import IdentityContext, { Identity } from './contexts/IdentityContext';
import NavBar from './components/NavBar';
import LanguageContext from './contexts/LanguageContext';

const App = (): JSX.Element => {
  const [currentIdentity, setCurrentIdentity] = useState<Identity | null>(null);

  return (
    <Router>
      <LanguageContext.Provider value="en">
        <IdentityContext.Provider value={currentIdentity}>
          <NavBar />
          <div className="container-fluid">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" render={() => <Login onLogin={setCurrentIdentity} />} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </IdentityContext.Provider>
      </LanguageContext.Provider>
    </Router>
  );
};

export default App;
