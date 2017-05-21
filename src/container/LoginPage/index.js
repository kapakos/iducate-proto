import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Grid, Row } from 'react-flexbox-grid';
import LoginForm from '../../components/LoginForm';
import dataStore from '../../data/store';
import content from './content';
import utilities from '../../utilities';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(credentials) {
    await dataStore.loginUser(credentials);
    const user = await dataStore.getUser();
    const skills = await dataStore.getSkills();
    const educations = await dataStore.getEducations();
    let queryMessage = '';

    if (R.any(R.isEmpty, [user, skills, educations])) {
      const arr = [];
      let message = '';
      arr.push(R.isEmpty(user) ? 'your Personal Data' : '');
      arr.push(R.isEmpty(skills) ? 'your Skills' : '');
      arr.push(R.isEmpty(educations) ? 'your Educations' : '');
      message = utilities.formatEnumerationIntoMessage(arr);
      queryMessage = content.emptyUserMessage.replace('{0}', message);
      this.context.router.push({ pathname: '/settings', state: { message: queryMessage } });
    } else {
      queryMessage = content.successMessage.replace('{0}', user.firstName);
      this.context.router.push({ pathname: '/', state: { message: queryMessage } });
    }
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

LoginPage.contextTypes = {
  router: PropTypes.shape().isRequired,
};

export default LoginPage;
