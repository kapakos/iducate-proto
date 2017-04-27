import React from 'react';
import LoginForm from '../../components/LoginForm';
import { Grid, Row } from 'react-flexbox-grid';
import dataStore from '../../data/store';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(credentials) {
    dataStore.loginUser(credentials);
  }

  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <div style={{ marginTop: '50px' }}>
            <LoginForm loginHandler={this.loginUser} />
          </div>
        </Row>
      </Grid>
    );
  }
}

export default LoginPage;
