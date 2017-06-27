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

const SidebarLayout = (MainComponent, SideComponent, options) =>
class extends React.Component {
  render() {
    return (
      <div>
        <div className="content">
          <Grid fluid>
            {options &&
            <Row center="xs">
              <Col>
                <h1>{options.title}</h1>
                <h3>{options.subtitle}</h3>
              </Col>
            </Row>
          }
            <Row style={styles.row}>
              <Col xs={12} sm={3}>
                {SideComponent ? <SideComponent /> : <SidebarContent /> }
              </Col>
              <Col xs={12} sm={9}>
                <MainComponent />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
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
