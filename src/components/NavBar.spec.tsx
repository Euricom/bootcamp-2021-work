import React from 'react';
import { createBrowserHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import NavBar from './NavBar';
import LanguageContext from '../contexts/LanguageContext';
import userEvent from '@testing-library/user-event';

describe('Navbar should:', () => {
  test('renders language buttons', () => {
    const history = createBrowserHistory();

    render(
      <Router history={history}>
        <NavBar onLanguageChange={jest.fn()} />
      </Router>,
    );

    const buttonElementEn = screen.getByRole('button', { name: /en/i });
    const buttonElementNl = screen.getByRole('button', { name: /nl/i });

    expect(buttonElementEn).toHaveClass('active');
    expect(buttonElementNl).not.toHaveClass('active');
  });

  test('renders nl as active button', () => {
    const history = createBrowserHistory();

    render(
      <LanguageContext.Provider value="nl">
        <Router history={history}>
          <NavBar onLanguageChange={jest.fn()} />
        </Router>
      </LanguageContext.Provider>,
    );

    const buttonElementEn = screen.getByRole('button', { name: /en/i });
    const buttonElementNl = screen.getByRole('button', { name: /nl/i });

    expect(buttonElementNl).toHaveClass('active');
    expect(buttonElementEn).not.toHaveClass('active');
  });

  test('should switch between languages', () => {
    const onLanguageChange = jest.fn();
    const history = createBrowserHistory();

    render(
      <LanguageContext.Provider value="nl">
        <Router history={history}>
          <NavBar onLanguageChange={onLanguageChange} />
        </Router>
      </LanguageContext.Provider>,
    );

    const buttonElementEn = screen.getByRole('button', { name: /en/i });
    userEvent.click(buttonElementEn);

    expect(onLanguageChange).toHaveBeenCalledWith('en');
  });
});
