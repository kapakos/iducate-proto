import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import R from 'ramda';
import VerticalNavigation from '../VerticalNavigation';
import routes from '../../routes';
import authService from '../../services/authService';

const styles = {
  navigation: {
    width: '250px',
  },
  tab: {
    deactivated: {
      color: 'rgba(255, 255, 255, 0.701961)',
    },
    activated: {
      color: 'rgba(255, 255, 255, 1)',
    },
  },
  tab: {
    deactivated: {
      color: 'rgba(255, 255, 255, 0.701961)',
    },
    activated: {
      color: 'rgba(255, 255, 255, 1)',
    },
  },
};


class NavigationBar extends React.Component {
  static getDecativatedTabColorStyle(selectedTab, index) {
    return (selectedTab === index ? styles.tab.activated.color : styles.tab.deactivated.color);
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.getSelectedTab(),
    };
    this.getSelectedTab = this.getSelectedTab.bind(this);
    this.handleActiveTap = this.handleActiveTap.bind(this);
    this.handleTitleTap = this.handleTitleTap.bind(this);
    this.handleVerticalMenuTap = this.handleVerticalMenuTap.bind(this);
  }

  async componentWillMount() {
    const selectedTab = this.getSelectedTab();
    const isAuth = await authService.isAuthenticated();
    this.setState({
      isAuthenticated: isAuth,
      selectedTab,
    });
  }

  async shouldComponentUpdate(nextProps, nextState) {
    const isAuth = await authService.isAuthenticated();
    if (nextState.isAuthenticated === isAuth) {
      return false;
    }
    this.setState({
      isAuthenticated: isAuth,
    });
    return true;
  }

  getSelectedTab() {
    const removeHomeRoute = route => route.name !== 'home';
    return R.findIndex(R.propEq('path', this.props.location.pathname))(R.filter(removeHomeRoute, routes));
  }

  handleActiveTap(tab) {
    console.log(tab.props.index);
    this.context.router.push(`${tab.props['data-route']}`);
    this.setState({ selectedTab: tab.props.index });
  }

  handleTitleTap() {
    this.context.router.push('/');
    this.setState({ selectedTab: -1 });
  }

  handleVerticalMenuTap(event, value) {
    this.context.router.push(`${value.props['data-route']}`);
    this.setState({ selectedTab: -1 });
  }

  isMainNavigationActive() {
    const mainRoutes = R.filter(route => (route.type === 'navigation'), routes);
    return R.any(route => (this.props.location.pathname.indexOf(route.path) > -1), mainRoutes);
  }

  render() {
    const { muiTheme } = this.props;
    const { selectedTab, isAuthenticated } = this.state;
    return (
      <Grid fluid style={{ backgroundColor: muiTheme.palette.primary1Color }}>
        <Row>
          <Col xs={12}>
            <AppBar
              style={{ boxShadow: 'none', cursor: 'pointer' }}
              titleStyle={{ fontWeight: 100 }}
              showMenuIconButton={false}
              title="Iducate Protoype"
              onTitleTouchTap={this.handleTitleTap}
              iconElementRight={isAuthenticated
                ? <VerticalNavigation handleMenuItemTap={this.handleVerticalMenuTap} />
                : <div />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Tabs style={styles.navigation} initialSelectedIndex={selectedTab} inkBarStyle={{ display: 'none' }}>
              {isAuthenticated && <Tab
                label="Categories"
                style={{ color: NavigationBar.getDecativatedTabColorStyle(selectedTab, 0) }}
                data-route="/categories"
                onActive={this.handleActiveTap}
              />}
              {isAuthenticated && <Tab
                label="Courses"
                style={{ color: NavigationBar.getDecativatedTabColorStyle(selectedTab, 1) }}
                data-route="/courses"
                onActive={this.handleActiveTap}
              />}
            </Tabs>
          </Col>
        </Row>
      </Grid>);
  }
}

NavigationBar.propTypes = {
  muiTheme: PropTypes.shape(),
  location: PropTypes.shape(),
};

NavigationBar.defaultProps = {
  muiTheme: {},
  location: {},
};

NavigationBar.contextTypes = {
  router: PropTypes.shape(),
};

export default muiThemeable()(NavigationBar);
