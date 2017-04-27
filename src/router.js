import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import R from 'ramda';
import Main from './container/Main';
import muiTheme from './styles/muiTheme';
import routes from './routes';
import DashboardPage from './container/DashboardPage';
import dataStore from './data/store';

const requireAuth = async (nextState, replace, callback) => {
  const loginData = await dataStore.getLoginData();
  if (R.isEmpty(loginData)) {
    replace('/login');
  }
  return callback();
};

const Routes = (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={DashboardPage} onEnter={requireAuth} />
        {
          routes.map(
            route => (route.type !== 'logo') &&
            <Route
              onEnter={!route.public && requireAuth}
              path={route.path}
              key={route.name}
              component={route.component}
            />,
          )
        }
      </Route>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
