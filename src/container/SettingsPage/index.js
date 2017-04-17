import React from 'react';
import { Grid } from 'react-flexbox-grid';
import UserForm from '../../components/UserForm';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid fluid>
        <UserForm />
      </Grid>);
  }
}

export default SettingsPage;
