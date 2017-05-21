import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import R from 'ramda';
import Main from './container/Main';
import muiTheme from './styles/muiTheme';
import routes from './routes';
import DashboardPage from './container/DashboardPage';
import CoursePage from './container/CoursePage';
import dataStore from './data/store';

const requireAuth = async (nextState, replace, callback) => {
  const loginData = await dataStore.getLoginData();
  if (R.isEmpty(loginData)) {
    replace('/login');
  }
  return callback();
};

const createUrlProps = propsList => R.reduce(R.concat, '', propsList);

const Routes = (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={DashboardPage} onEnter={requireAuth} />
        {
          routes.map(
            route => (route.type === 'navigation') &&
            <Route
              name={route.name}
              onEnter={!route.public && requireAuth}
              path={!R.isEmpty(route.propsIds) ? `${route.path}${createUrlProps(route.propsIds)}` : route.path}
              key={route.name}
              component={route.component}
            />,
          )
        }
        {
          routes.map(
            route => (route.type === 'vertical-navigation') &&
            <Route
              name={route.name}
              onEnter={!route.public && requireAuth}
              path={!R.isEmpty(route.propsIds) ? `${route.path}${createUrlProps(route.propsIds)}` : route.path}
              key={route.name}
              component={route.component}
            />,
          )
        }
        {
         routes.map(
          route => (route.type === 'nested') &&
          <Route
            path={route.path}
            key={route.name}
            component={route.parentComponent}
          >
            <Route
              path={!R.isEmpty(route.propsIds) ? `${route.path}${createUrlProps(route.propsIds)}` : route.path}
              component={route.component}
              name={route.name}
              onEnter={!route.public && requireAuth}
            />
          </Route>,
        )
        }
      </Route>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
