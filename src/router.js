import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './container/Main';
import muiTheme from './styles/muiTheme';
import routes from './routes';
import DashboardPage from './container/DashboardPage';

const Routes = (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={DashboardPage} />
        {routes.map(route => (route.type !== 'logo') &&
          <Route path={route.path} key={route.name} component={route.component} />)}
      }
      </Route>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
