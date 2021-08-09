import { render } from '@testing-library/react';
import React from 'react';
import Protected from './Protected';

test('It renders the protected page', () => {
  render(<Protected />);
});
