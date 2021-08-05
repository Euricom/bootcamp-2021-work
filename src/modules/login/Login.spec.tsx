import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';

import Login from './Login';
import IdentityContext from '../../contexts/IdentityContext';
import { authenticate } from './services/authentication';

jest.mock('./services/authentication');

function getFormElements() {
  return {
    usernameInput: screen.getByLabelText('Username'),
    passwordInput: screen.getByLabelText('Password'),
    loginButton: screen.getByRole('button', { name: 'Login' }),
  };
}

describe('anonymous', () => {
  test('it renders the login form', () => {
    render(<Login onLogin={() => {}} />);

    screen.getByRole('heading', { name: 'Log in to Bootcamp' });
    const { usernameInput, passwordInput, loginButton } = getFormElements();

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    expect(usernameInput).toHaveFocus();
    expect(usernameInput).toHaveAttribute('type', 'text');

    expect(passwordInput).toHaveAttribute('type', 'password');

    expect(loginButton).toHaveAttribute('type', 'submit');
    expect(loginButton).toHaveClass('btn-primary');
    expect(loginButton).toBeEnabled();
  });

  test('it successfully authenticates user', async () => {
    const onLogin = jest.fn();
    const givenUser = 'user';
    const givenPass = 'pass';

    render(<Login onLogin={onLogin} />);

    const { usernameInput, passwordInput, loginButton } = getFormElements();

    userEvent.type(usernameInput, givenUser);
    userEvent.type(passwordInput, givenPass);

    mocked(authenticate).mockResolvedValueOnce(true);

    userEvent.click(loginButton);

    expect(loginButton).toBeDisabled();
    expect(authenticate).toHaveBeenCalledWith(givenUser, givenPass);

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith({ username: givenUser });
    });
  });

  test('it fails to authenticate user', async () => {
    const onLogin = jest.fn();
    render(<Login onLogin={onLogin} />);

    const { usernameInput, passwordInput, loginButton } = getFormElements();

    userEvent.type(usernameInput, 'falsy user');
    userEvent.type(passwordInput, 'falsy pass');

    mocked(authenticate).mockResolvedValueOnce(false);

    userEvent.click(loginButton);

    const alert = await screen.findByRole('alert');

    expect(alert).toHaveTextContent('Unknown username or password');
    expect(alert).toHaveClass('alert-danger');

    expect(onLogin).not.toHaveBeenCalled();

    expect(loginButton).toBeEnabled();

    expect(usernameInput).toHaveFocus();
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
});

test('it redirects to / when authenticated', () => {
  const history = createBrowserHistory();
  history.push('/not');

  render(
    <IdentityContext.Provider value={{ username: 'johndo' }}>
      <Router history={history}>
        <Login onLogin={jest.fn()} />
      </Router>
    </IdentityContext.Provider>,
  );

  expect(history).toHaveProperty('location', expect.objectContaining({ pathname: '/' }));
});
