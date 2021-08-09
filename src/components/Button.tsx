/* eslint-disable react/button-has-type */
import React from 'react';

type ButtonProps = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick' | 'className'> & {
  active?: boolean;
  children: React.ReactNode;
  outlined?: boolean;
  size?: 'large' | 'small';
  type: NonNullable<React.ButtonHTMLAttributes<HTMLButtonElement>['type']>;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
};

const sizeMap: Record<NonNullable<ButtonProps['size']>, string> = {
  large: 'btn-lg',
  small: 'btn-sm',
};

function getClassName(...names: (string | undefined)[]) {
  return names.filter(Boolean).join(' ');
}

const Button = ({
  active,
  children,
  className,
  disabled,
  onClick,
  outlined,
  size,
  type,
  variant = 'secondary',
}: ButtonProps): JSX.Element => (
  <button
    aria-disabled={disabled}
    className={getClassName(
      ' btn',
      `${active ? 'active' : ''}`,
      `btn-${outlined ? 'outline-' : ''}${variant}`,
      size && sizeMap[size],
      className,
    )}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
