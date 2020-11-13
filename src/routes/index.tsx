import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashBoard from '../pages/DashBoard';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/Dashboard" component={DashBoard} />
  </Switch>
);

export default Routes;
