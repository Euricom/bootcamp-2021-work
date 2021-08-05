import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './modules/home/Home';
import Login from './modules/login/Login';
import NotFound from './pages/NotFound';
import jsLogo from './images/js-logo.png';
import IdentityContext, { Identity } from './contexts/IdentityContext';

const NavBar = () => {
  const identity = useContext(IdentityContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={jsLogo} alt="Bootcamp Logo" width="24" height="24" className="d-inline-block align-text-top" />{' '}
          Bootcamp
        </Link>

        {identity ? (
          <Link className="nav-link" to="/logout">
            Log Out
          </Link>
        ) : (
          <Link className="nav-link" to="/login">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

const App = (): JSX.Element => {
  const [currentIdentity, setCurrentIdentity] = useState<Identity | null>(null);

  return (
    <Router>
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
    </Router>
  );
};

export default App;
