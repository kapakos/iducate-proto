import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import R from 'ramda';

const styles = {
  row: {
    marginTop: '30px',
  },
};

const SidebarLayout = (MainComponent, SidebarComponent) => class extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row style={styles.row}>
          <Col xs={12} sm={9}>
            <MainComponent />
          </Col>
          <Col xs={12} sm={3}>
            {!R.isNil(SidebarComponent) && <SidebarComponent />}
          </Col>
        </Row>
      </Grid>
    );
  }
};

SidebarLayout.propTypes = {
  children: PropTypes.shape(),
  sidebarChildren: PropTypes.shape(),
};

SidebarLayout.defaultProps = {
  children: {},
  sidebarChildren: {},
};

export default SidebarLayout;
