import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import IdentityContext from '../../contexts/IdentityContext';

type RouteProtectorProps = Pick<RouteProps, 'path' | 'component' | 'render' | 'children'>;
const RouteProtector = ({ path, children }: RouteProtectorProps): JSX.Element => {
  const identity = useContext(IdentityContext);
  if (identity) {
    return (
      <Route exact path={path}>
        {children}
      </Route>
    );
  }

  return <Redirect to={{ pathname: '/login', state: { path: `${path}` } }} />;
};
export default RouteProtector;
