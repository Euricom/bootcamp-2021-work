import React from 'react';
import { render, screen } from '@testing-library/react';
import UserForm from './UserForm';

function getFormElements() {
  return {
    firstnameInput: screen.getByLabelText('First name'),
    // passwordInput: screen.getByLabelText('Password'),
    // loginButton: screen.getByRole('button', { name: 'Login' }),
  };
}

test('it renders the user form', () => {
  render(<UserForm />);

  screen.getByRole('heading', { name: 'User Detail' });

  const { firstnameInput } = getFormElements();
});
