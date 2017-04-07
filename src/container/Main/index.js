import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';
import NavigationBar from 'components/NavigationBar';
import R from 'ramda';
import routes from '../../routes';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.getSelectedTab(),
    };
    this.handleTitleTap = this.handleTitleTap.bind(this);
    this.getSelectedTab = this.getSelectedTab.bind(this);
    this.handleActive = this.handleActive.bind(this);
  }

  getSelectedTab() {
    const removeHomeRoute = route => route.name !== 'home';
    return R.findIndex(R.propEq('path', this.props.location.pathname))(R.filter(removeHomeRoute, routes));
  }

  handleActive(tab) {
    hashHistory.push(`${tab.props['data-route']}`);
    this.setState({ selectedTab: tab.props.index });
  }

  handleTitleTap() {
    hashHistory.push('/');
    this.setState({ selectedTab: -1 });
  }

  render() {
    return (
      <div>
        <NavigationBar
          handleTitleTap={this.handleTitleTap}
          handleActiveTab={this.handleActive}
          background={this.props.muiTheme.palette.primary1Color}
          selectedTab={this.state.selectedTab}
        />
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
