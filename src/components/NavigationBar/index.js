import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
  navigation: {
    width: '250px',
  },
};

const Logged = props => (
  <IconMenu
    {...props}
    iconStyle={{ color: 'white' }}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Settings" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

const NavigationBar = ({
  handleTitleTap,
  handleActiveTab,
  background,
  selectedTab }) => (
    <Grid fluid style={{ backgroundColor: background }}>
      <Row>
        <Col xs={12}>
          <AppBar
            style={{ boxShadow: 'none', cursor: 'pointer' }}
            showMenuIconButton
            title="Iducate Protoype"
            onTitleTouchTap={handleTitleTap}
            iconElementRight={<Logged />}

          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Tabs style={styles.navigation} inkBarStyle={{ display: selectedTab === -1 ? 'none' : 'block' }} initialSelectedIndex={selectedTab}>
            <Tab label="Courses" data-route="/courses" onActive={handleActiveTab} />
            <Tab label="Dashboard" data-route="/dashboard" onActive={handleActiveTab} />
          </Tabs>
        </Col>
      </Row>
    </Grid>);

NavigationBar.propTypes = {
  handleTitleTap: React.PropTypes.func,
  handleActiveTab: React.PropTypes.func,
  background: React.PropTypes.string,
  selectedTab: React.PropTypes.number,
};

NavigationBar.defaultProps = {
  handleTitleTap: () => {},
  handleActiveTab: () => {},
  background: '',
  selectedTab: -1,
};

export default NavigationBar;
