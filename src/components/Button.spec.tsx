import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import Button from './Button';

test('it renders by default a secondary button', () => {
  render(
    <Button type="button">
      <div data-testid="child" />
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveClass('btn btn-secondary', { exact: true });

  within(button).getByTestId('child');

  // Verify our button is enabled
  expect(button).toBeEnabled();
  expect(button).not.toHaveAttribute('aria-disabled');
});

test('it can render in a variant', () => {
  render(
    <Button type="button" variant="primary">
      Primary
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button).toHaveClass('btn btn-primary', { exact: true });
});

test('it can render as another type', () => {
  render(<Button type="submit">Nice</Button>);

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('type', 'submit');
});

test('it can render outlined', () => {
  render(
    <Button type="button" variant="primary" outlined>
      Primary
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button).toHaveClass('btn btn-outline-primary', { exact: true });
});

describe('size', () => {
  test('it can render as a large button', () => {
    render(
      <Button type="button" size="large">
        Large
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn btn-secondary btn-lg', { exact: true });
  });

  test('it can render as a small button', () => {
    render(
      <Button type="button" size="small">
        Small
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn btn-secondary btn-sm', { exact: true });
  });
});

test('it can be disabled', () => {
  render(
    <Button type="button" disabled>
      Disabled
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-disabled', 'true');
});

test('it can be clicked', () => {
  const onClick = jest.fn();

  render(
    <Button type="button" onClick={onClick}>
      Click me
    </Button>,
  );

  const button = screen.getByRole('button');

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
});

test('it supports auxiliary classes', () => {
  render(
    <Button type="button" className="extra-class">
      Just here for kicks
    </Button>,
  );

  const button = screen.getByRole('button');
  expect(button).toHaveClass('btn btn-secondary extra-class', { exact: true });
});
