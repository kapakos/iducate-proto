import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import FieldCategories from '../FieldCategories';

class Categories extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <FieldCategories />
          </Col>
        </Row>
      </div>);
  }
}

export default Categories;
