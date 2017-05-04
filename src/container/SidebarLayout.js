import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';

const styles = {
  row: {
    marginTop: '30px',
  },
};

const SidebarContent = () => (
  <div>
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader title="Some side bar content" subtitle="Data" />
        </Card>
      </Col>
    </Row>
    <Row style={styles.row}>
      <Col xs={12}>
        <Card>
          <CardHeader title="Another side bar content" subtitle="Data" />
        </Card>
      </Col>
    </Row>
  </div>
    );

const SidebarLayout = MainComponent => () => (
  <Grid fluid>
    <Row style={styles.row}>
      <Col xs={12} sm={9}>
        <MainComponent />
      </Col>
      <Col xs={12} sm={3}>
        <SidebarContent />
      </Col>
    </Row>
  </Grid>
    );

SidebarLayout.propTypes = {
  children: PropTypes.shape(),
  sidebarChildren: PropTypes.shape(),
};

SidebarLayout.defaultProps = {
  children: {},
  sidebarChildren: {},
};

export default SidebarLayout;
