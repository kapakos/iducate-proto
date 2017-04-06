import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from 'container/Main';
import DashboardPage from 'container/DashboardPage';
import CoursesPage from 'container/CoursesPage';
import muiTheme from './styles/muiTheme';

const Routes = (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="dashboard" component={DashboardPage} />
        <Route path="courses" component={CoursesPage} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
