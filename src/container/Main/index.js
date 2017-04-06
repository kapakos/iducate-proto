import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = {
  navigation: {
    width: '20%',
  },
};

class Main extends Component {
  static handleActive(tab) {
    hashHistory.push(`${tab.props['data-route']}`);
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.getActiveRoute(),
    };
    this.handleTitleTap = this.handleTitleTap.bind(this);
    this.getActiveRoute = this.getActiveRoute.bind(this);
  }

  getActiveRoute() {
    return this.props.location.pathname.indexOf('course') > -1 ? 0 : -1;
  }

  handleTitleTap() {
    hashHistory.push('/');
    this.setState({ selectedTab: -1 });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <AppBar
              style={{ boxShadow: 'none', pointer: 'Cursor' }}
              showMenuIconButton={false}
              title="Iducate Protoype"
              onTitleTouchTap={this.handleTitleTap}
            />
          </Col>
        </Row>
        <Row style={{ backgroundColor: this.props.muiTheme.palette.primary1Color }}>
          <Col xs={12}>
            <Tabs style={styles.navigation} initialSelectedIndex={this.state.selectedTab}>
              <Tab style={{ borderColor: 'yellow' }} label="Courses" data-route="/courses" onActive={Main.handleActive} />
              <Tab label="Dashboard" data-route="/dashboard" onActive={Main.handleActive} />
            </Tabs>
          </Col>
        </Row>
        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.shape(),
  location: React.PropTypes.shape(),
  muiTheme: React.PropTypes.shape(),
};

Main.defaultProps = {
  children: {},
  location: {},
  muiTheme: {},
};

export default muiThemeable()(Main);
