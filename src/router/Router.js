import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import App from '../components/App';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/login" component={App} />
      <Route path="/signup" component={App} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
