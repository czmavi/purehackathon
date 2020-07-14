import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Menu from './components/Menu';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import UserComponent from './components/User';
import Devices from './components/Devices';
import DeviceComponent from './components/Device';
import Groups from './components/Groups';
import GroupComponent from './components/Group';
import PrivateRoute from './components/PrivateRoute';

const Routes: React.FC = () => (
  <Router>
    <Menu />
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example with TypeScript
          </Typography>
      </Box>
      <Route path="/signin" component={SignIn} />
      <PrivateRoute path="/users" component={Users} />
      <PrivateRoute path="/user/:id" component={UserComponent} />
      <PrivateRoute path="/devices" component={Devices} />
      <PrivateRoute path="/device/:id" component={DeviceComponent} />
      <PrivateRoute path="/groups" component={Groups} />
      <PrivateRoute path="/group/:id" component={GroupComponent} />
      <PrivateRoute exact path="/" component={Dashboard} />
    </Container>
  </Router>
);

export default Routes;
