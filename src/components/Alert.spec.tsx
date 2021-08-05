import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import Alert from './Alert';

test('it renders a warning by default', () => {
  render(
    <Alert>
      <div data-testid="child" />
    </Alert>,
  );

  const alert = screen.getByRole('alert');
  expect(alert).toHaveClass('alert alert-warning', { exact: true });

  within(alert).getByTestId('child');

  expect(within(alert).queryByRole('heading')).not.toBeInTheDocument();
  expect(within(alert).queryByLabelText('Close')).not.toBeInTheDocument();
});

test('it supports variants', () => {
  render(<Alert variant="info">You have mail</Alert>);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveClass('alert alert-info', { exact: true });
});

test('it supports a heading', () => {
  render(<Alert heading={<div data-testid="headingChild" />}>You have mail</Alert>);

  const alert = screen.getByRole('alert');

  const header = within(alert).getByRole('heading');
  expect(header).toHaveProperty('tagName', 'H4');
  expect(header).toHaveClass('alert-heading');

  within(header).getByTestId('headingChild');
});

test('it supports extra classes', () => {
  render(<Alert className="extra-class">Yolo</Alert>);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveClass('alert alert-warning extra-class', { exact: true });
});

test('it renders as dismissable', () => {
  const onDismiss = jest.fn();

  render(<Alert onDismiss={onDismiss}>Yolo</Alert>);

  const alert = screen.getByRole('alert');
  expect(alert).toHaveClass('alert-dismissable');

  const dismissButton = within(alert).getByLabelText('Close');
  expect(dismissButton).toHaveProperty('tagName', 'BUTTON');
  expect(dismissButton).toHaveAttribute('type', 'button');
  expect(dismissButton).toHaveClass('btn-close');

  fireEvent.click(dismissButton);

  expect(onDismiss).toHaveBeenCalledTimes(1);
});
