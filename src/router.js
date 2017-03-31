import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Hello from 'components/Hello';
import Dashboard from 'components/Dashboard';
import Courses from 'components/Courses';

const Routes = (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Router history={hashHistory}>
      <Route path="/" component={Hello} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="courses" component={Courses} />
    </Router>
  </MuiThemeProvider>
);

export default Routes;
