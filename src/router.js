import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Main from 'container/Main';
import DashboardPage from 'container/DashboardPage';
import CoursesPage from 'container/CoursesPage';

const Routes = (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="dashboard" component={DashboardPage} />
        <Route path="courses" component={CoursesPage} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
