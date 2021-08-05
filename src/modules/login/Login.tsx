import React from 'react';
import { Redirect } from 'react-router';
import Alert from '../../components/Alert';
import IdentityContext, { Identity } from '../../contexts/IdentityContext';
import LoginForm, { LoginFormProps } from './components/LoginForm';
import { authenticate } from './services/authentication';

export interface LoginProps {
  onLogin: (identity: Identity) => void;
}

const Login = ({ onLogin }: LoginProps): JSX.Element => {
  const identity = React.useContext(IdentityContext);
  const [submitting, setSubmitting] = React.useState(false);
  const [authFailed, setAuthFailed] = React.useState(false);

  const handleSubmit: LoginFormProps['onSubmit'] = async ({ username, password }) => {
    setSubmitting(true);

    const authenticated = await authenticate(username, password);

    if (authenticated) onLogin({ username });
    else {
      setAuthFailed(true);
      setSubmitting(false);
    }
  };

  if (identity) return <Redirect to="/" />;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="card col-sm-6">
          <h4 className="card-header">Log in to Bootcamp</h4>
          <div className="card-body">
            {authFailed && <Alert variant="danger">Unknown username or password</Alert>}
            <LoginForm onSubmit={handleSubmit} submitting={submitting} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
