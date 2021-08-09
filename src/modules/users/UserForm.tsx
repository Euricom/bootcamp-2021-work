import React from 'react';

const UserForm = (): JSX.Element => (
  <div className="container-fluid">
    <h1>User Detail</h1>
    <div className="col-md-6">
      <label htmlFor="firstname" className="form-label">
        First name
      </label>
      <input type="text" className="form-control" id="firstname" name="firstName" />
    </div>
  </div>
);

export default UserForm;
