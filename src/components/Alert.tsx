import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
  heading?: React.ReactNode;
  onDismiss?: () => void;
  variant?: 'info' | 'warning' | 'danger';
}

const Alert = ({ children, className, heading, onDismiss, variant = 'warning' }: AlertProps): JSX.Element => (
  <div
    role="alert"
    className={['alert', `alert-${variant}`, onDismiss && 'alert-dismissable', className].filter(Boolean).join(' ')}
  >
    {heading && <h4 className="alert-heading">{heading}</h4>}
    {children}
    {onDismiss && <button type="button" className="btn-close" aria-label="Close" onClick={onDismiss} />}
  </div>
);

export default Alert;
