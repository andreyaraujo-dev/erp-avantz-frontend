import React from 'react';
import { Switch } from 'react-router-dom';

import CustomRoute from './CustomRoutes';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/dashboard" component={Dashboard} />
      <CustomRoute isPrivate exact path="/profile" component={Profile} />
    </Switch>
  );
}
