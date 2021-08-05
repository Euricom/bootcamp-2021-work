import React from 'react';

export interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
  submitting?: boolean;
}

const LoginForm = ({ onSubmit, submitting }: LoginFormProps) => {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    usernameRef.current?.focus();
  });

  React.useEffect(() => {
    usernameRef.current!.value = '';
    passwordRef.current!.value = '';
  }, [submitting]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const username = usernameRef.current!;
    const password = passwordRef.current!;

    onSubmit({ username: username.value, password: password.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input id="username" name="username" ref={usernameRef} type="text" className="form-control" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input id="password" name="username" ref={passwordRef} type="password" className="form-control" />
      </div>
      <div className="d-grid">
        <button aria-disabled="false" disabled={submitting} className="btn btn-primary" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
