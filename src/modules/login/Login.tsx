import React from 'react';
import { Redirect } from 'react-router';
import Button from '../../components/Button';
import IdentityContext, { Identity } from '../../contexts/IdentityContext';

export interface LoginProps {
  onLogin: (identity: Identity) => void;
}

const Login = ({ onLogin }: LoginProps): JSX.Element => {
  const identity = React.useContext(IdentityContext);

  if (identity) return <Redirect to="/" />;

  return (
    <>
      <h1>Login</h1>

      <Button type="button" variant="primary" onClick={() => onLogin({ username: 'admin' })}>
        Do the login
      </Button>
    </>
  );
};

export default Login;
