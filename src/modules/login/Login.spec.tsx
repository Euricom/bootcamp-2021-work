import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

import Login from './Login';
import IdentityContext from '../../contexts/IdentityContext';

test('it renders a button to login when anonymous', () => {
  const onLogin = jest.fn();

  render(<Login onLogin={onLogin} />);

  const loginButton = screen.getByRole('button');

  fireEvent.click(loginButton);

  expect(onLogin).toHaveBeenCalledWith({ username: 'admin' });
  expect(onLogin).toHaveBeenCalledTimes(1);
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
