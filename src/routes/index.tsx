import React from 'react';
import { Switch } from 'react-router-dom';

import SigniIn from '../pages/SignIn';
import Dashboard from '../pages/DashBoard';
import Clients from '../pages/Clients';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SigniIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/clients" component={Clients} isPrivate />
  </Switch>
);

export default Routes;
