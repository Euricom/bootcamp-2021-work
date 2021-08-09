import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import IdentityContext from '../contexts/IdentityContext';
import jsLogo from '../images/js-logo.png';
import Button from './Button';
import LanguageContext from '../contexts/LanguageContext';

const NavBar = (): JSX.Element => {
  const identity = useContext(IdentityContext);
  const language = useContext(LanguageContext);

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
        <Button active={language === 'en'} type="button">
          EN
        </Button>
        <Button active={language === 'nl'} type="button">
          NL
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
