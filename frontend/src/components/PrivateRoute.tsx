import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppState } from '../reducers';

interface IProps {
  isAuthenticated: boolean;
  component: any;
  rest?: any;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<IProps> = ({ component, isAuthenticated, ...rest }) => {
  const Component = component;
  const renderRouteChildren = (props: any) => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
  );

  return (
    <Route
      {...rest}
      render={renderRouteChildren}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(PrivateRoute);
