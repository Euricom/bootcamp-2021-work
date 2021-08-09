import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

import App from './App';
import Login, { LoginProps } from './modules/login/Login';
import IdentityContext from './contexts/IdentityContext';

jest.mock('./modules/home/Home', () => () => <div data-testid="home-mock" />);
jest.mock('./pages/NotFound', () => () => <div data-testid="not-found-mock" />);

jest.mock('./modules/login/Login', () =>
  jest.fn(({ onLogin }: LoginProps) => (
    <div data-testid="login-mock">
      <button type="button" onClick={() => onLogin({ username: 'johnny-mock' })}>
        Fake Login
      </button>
    </div>
  )),
);

test('it renders home when path is /', () => {
  const history = createBrowserHistory();

  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  screen.getByTestId('home-mock');

  expect(screen.queryByTestId('not-found-mock')).not.toBeInTheDocument();
});

test('it renders login when path is /login', () => {
  const history = createBrowserHistory();
  history.push('/login');

  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  screen.getByTestId('login-mock');

  expect(Login).toHaveBeenCalledWith(
    {
      onLogin: expect.any(Function),
    },
    {},
  );

  expect(screen.queryByTestId('home-mock')).not.toBeInTheDocument();
});

test('it renders the not found page when path is unknown', () => {
  const history = createBrowserHistory();
  history.push('/unknown');

  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  screen.getByTestId('not-found-mock');
});

describe('navbar', () => {
  test('it renders by default', () => {
    const history = createBrowserHistory();

    render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar navbar-light bg-light', { exact: true });

    const link = within(nav).getByText('Bootcamp');
    expect(link).toHaveProperty('tagName', 'A');
    expect(link).toHaveClass('navbar-brand');
    expect(link).toHaveAttribute('href', '/');

    const image = within(link).getByAltText('Bootcamp Logo');
    expect(image).toHaveAttribute('src', 'images/js-logo.png');

    const loginLink = within(nav).getByRole('link', { name: 'Log In' });
    expect(loginLink).toHaveClass('nav-link');
    expect(loginLink).toHaveAttribute('href', '/login');

    expect(within(nav).queryByRole('link', { name: 'Log Out' })).not.toBeInTheDocument();
  });

  test('it renders a logout link when authenticated', () => {
    const history = createBrowserHistory();
    history.push('/login');

    render(
      <Router history={history}>
        <App />
      </Router>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Fake Login' }));

    const nav = screen.getByRole('navigation');

    const logoutLink = within(nav).getByRole('link', { name: 'Log Out' });
    expect(logoutLink).toHaveClass('nav-link');
    expect(logoutLink).toHaveAttribute('href', '/logout');

    expect(within(nav).queryByRole('link', { name: 'Log In' })).not.toBeInTheDocument();
  });
});

test('It renders login when visiting protected without being logged in', () => {
  const history = createBrowserHistory();
  history.push('/protected');

  render(
    <IdentityContext.Provider value={{}}>
      <Router history={history}>
        <App />
      </Router>
    </IdentityContext.Provider>,
  );
  screen.getByTestId('login-mock');
});
