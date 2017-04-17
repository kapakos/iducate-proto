import React from 'react';
import { Grid } from 'react-flexbox-grid';
import UserForm from '../../components/UserForm';

class SettingsPage extends React.Component {
  static getDefaultUser() {
    return {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      dateOfBirth: moment('19770116').toString(),
      email: '',
    };
  }
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
