import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import { BrowserRouter } from 'react-router-dom';

import Login from './Login';
import { authenticate } from './services/authentication';

jest.mock('./services/authentication');

afterEach(() => {
  window.history.replaceState(null, '', '/');
});

function getFormElements() {
  return {
    usernameInput: screen.getByLabelText('Username'),
    passwordInput: screen.getByLabelText('Password'),
    loginButton: screen.getByRole('button', { name: 'Login' }),
  };
}

describe('anonymous', () => {
  test('it renders the login form', () => {
    render(
      <BrowserRouter>
        <Login onLogin={() => {}} />
      </BrowserRouter>,
    );

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

    render(
      <BrowserRouter>
        <Login onLogin={onLogin} />
      </BrowserRouter>,
    );

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
    render(
      <BrowserRouter>
        <Login onLogin={onLogin} />
      </BrowserRouter>,
    );

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

test('it redirects to previous page when authenticated', async () => {
  const onLogin = jest.fn();
  const givenUser = 'user';
  const givenPass = 'pass';

  const history = createBrowserHistory();
  history.push('/protected');

  render(
    <BrowserRouter>
      <Login onLogin={onLogin} />
    </BrowserRouter>,
  );

  const { usernameInput, passwordInput, loginButton } = getFormElements();

  userEvent.type(usernameInput, givenUser);
  userEvent.type(passwordInput, givenPass);

  mocked(authenticate).mockResolvedValueOnce(true);

  userEvent.click(loginButton);

  expect(loginButton).toBeDisabled();
  expect(authenticate).toHaveBeenCalledWith(givenUser, givenPass);

  await waitFor(() => {
    expect(onLogin).toHaveBeenCalledWith({ username: givenUser });
    expect(history).toHaveProperty('location', expect.objectContaining({ pathname: '/protected' }));
  });
});
test('it redirects to home page when authenticated and no redirect', async () => {
  const onLogin = jest.fn();
  const givenUser = 'user';
  const givenPass = 'pass';

  const history = createBrowserHistory();
  history.push('/');

  render(
    <BrowserRouter>
      <Login onLogin={onLogin} />
    </BrowserRouter>,
  );

  const { usernameInput, passwordInput, loginButton } = getFormElements();

  userEvent.type(usernameInput, givenUser);
  userEvent.type(passwordInput, givenPass);

  mocked(authenticate).mockResolvedValueOnce(true);

  userEvent.click(loginButton);

  expect(loginButton).toBeDisabled();
  expect(authenticate).toHaveBeenCalledWith(givenUser, givenPass);

  await waitFor(() => {
    expect(onLogin).toHaveBeenCalledWith({ username: givenUser });
    expect(history).toHaveProperty('location', expect.objectContaining({ pathname: '/' }));
  });
});
