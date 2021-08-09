import React from 'react';
import { createBrowserHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import NavBar from './NavBar';

describe('Navbar should:', () => {
  test('render language buttons', () => {
    const history = createBrowserHistory()

    render( <Router history={history}><NavBar/></Router>)

    screen.getByRole('button', {name: /nl/i})
    screen.getByRole('button', {name: /en/i})
  });
})
