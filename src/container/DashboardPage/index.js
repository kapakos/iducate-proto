import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Dashboard extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <div>Dashboard</div>
          </Col>
        </Row>
      </Grid>);
  }
}

export default Dashboard;
