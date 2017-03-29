import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Hello from 'components/Hello';
import Dashboard from 'components/Dashboard';
import Courses from 'components/Courses';

const Root = ({ children }) => (<div id="root"> { children } </div>);

const Routes = (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Router history={browserHistory}>
      <Route path="/" component={Hello} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="courses" component={Courses} />
    </Router>
  </MuiThemeProvider>
);

export default Routes;
