import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
  navigation: {
    width: '20%',
  },
};

const NavigationBar = ({
  handleTitleTap,
  handleActiveTab,
  background,
  selectedTab }) => (
    <div>
      <Row>
        <Col xs={12}>
          <AppBar
            style={{ boxShadow: 'none', pointer: 'Cursor' }}
            showMenuIconButton={false}
            title="Iducate Protoype"
            onTitleTouchTap={handleTitleTap}
          />
        </Col>
      </Row>
      <Row style={{ backgroundColor: background }}>
        <Col xs={12}>
          <Tabs style={styles.navigation} inkBarStyle={{ display: selectedTab === -1 ? 'none' : 'block' }} initialSelectedIndex={selectedTab}>
            <Tab label="Courses" data-route="/courses" onActive={handleActiveTab} />
            <Tab label="Dashboard" data-route="/dashboard" onActive={handleActiveTab} />
          </Tabs>
        </Col>
      </Row>
    </div>);

NavigationBar.propTypes = {
  handleTitleTap: React.PropTypes.func,
  handleActiveTab: React.PropTypes.func,
  background: React.PropTypes.string,
  selectedTab: React.PropTypes.number,
  hideInkbar: React.PropTypes.bool,
};

NavigationBar.defaultProps = {
  handleTitleTap: () => {},
  handleActiveTab: () => {},
  background: '',
  selectedTab: -1,
  hideInkbar: false,
};

export default NavigationBar;
