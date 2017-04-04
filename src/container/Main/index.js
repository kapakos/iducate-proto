import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';

export default class Main extends Component {
  static handleActive(tab) {
    hashHistory.push(`${tab.props['data-route']}`);
  }

  render() {
    return (
      <div className="content">
        <AppBar title="Iducate Prototypes" style={{ width: '100%' }}>
          <Tabs>
            <Tab label="Courses" data-route="/courses" onActive={Main.handleActive} />
            <Tab label="Dashboard" data-route="/dashboard" onActive={Main.handleActive} />
          </Tabs>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}
