import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Grid, Row } from 'react-flexbox-grid';
import LoginForm from '../../components/LoginForm';
import dataStore from '../../data/store';
import content from './content';

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
      // const s = '';
      // s.concat(R.isEmpty(user) ? ' user Information' );
      // if (R.isEmpty(user)) {
      //   s.append('');
      // }
      queryMessage = content.emptyUserMessage;
    } else {
      queryMessage = content.successMessage.replace('{0}', user.firstName);
    }
    console.log('im in loginUser action');
    this.context.router.push(
      {
        pathname: '/',
        query: { message: queryMessage },

      });
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
