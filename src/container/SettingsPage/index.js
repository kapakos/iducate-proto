import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { Grid } from 'react-flexbox-grid';
import UserForm from '../../components/UserForm';
import content from './content';
import dataStore from '../../data/store';

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
    this.state = {
      errorText: {
        userNameErrorText: '',
        firstNameErrorText: '',
        lastNameErrorText: '',
        emailErrorText: '',
      },
      user: {},
      content,
    };
    this.enterTextHandler = this.enterTextHandler.bind(this);
    this.enterDateHandler = this.enterDateHandler.bind(this);
    this.getErrorText = this.getErrorText.bind(this);
  }

  componentDidMount() {
    const self = this;
    dataStore.getUser()
    .then((user) => {
      if (!R.isEmpty(user)) {
        self.setState({ user });
      } else {
        self.setState({ user: SettingsPage.getDefaultUser() });
      }
    });
  }

  getErrorText(name, value) {
    return R.isEmpty(value) ? R.find(R.propEq('name', name))(this.state.content).errorText : '';
  }

  enterTextHandler(event, value) {
    this.setState({
      user: Object.assign({}, this.state.user, { [event.target.name]: value }),
      errorText: {
        [`${event.target.name}ErrorText`]: this.getErrorText(event.target.name, value),
      },
    });
  }

  enterDateHandler(event, value) {
    this.setState({
      user: Object.assign({}, this.state.user, { dateOfBirth: moment(value) }),
    });
  }


  render() {
    const user = this.state.user;
    if (R.isEmpty(user)) {
      return <div>Loading...</div>;
    }
    return (
      <Grid fluid>
        <UserForm
          fieldConfig={this.state.content}
          user={this.state.user}
          onTextEnterHandler={this.enterTextHandler}
          onDateEnterHandler={this.enterDateHandler}
          errorText={this.state.errorText}
        />
      </Grid>);
  }
}

export default SettingsPage;
