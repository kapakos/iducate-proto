import React from 'react';
import PropTypes from 'prop-types';
import dataStore from '../../data/store';

class SignOutPage extends React.Component {
  componentDidMount() {
    dataStore.deleteLoginData();
    this.context.router.push('/login');
  }

  render() {
    return null;
  }
}

SignOutPage.contextTypes = {
  router: PropTypes.shape().isRequired,
};

export default SignOutPage;
