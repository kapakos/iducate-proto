import React from 'react';
import { Grid } from 'react-flexbox-grid';

const Wrapper = ({ children }) => (
  <Grid fluid>
    {children}
  </Grid>);

Wrapper.propTypes = {
  children: React.PropType.shapeOf(),
};

Wrapper.defaultProps = {
  children: {},
};

export default Wrapper;
