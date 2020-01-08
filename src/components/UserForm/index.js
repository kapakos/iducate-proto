import React from 'react';
import PropTypes from 'prop-types';
import uuidV4 from 'uuid/v4';
import R from 'ramda';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import DatePicker from 'material-ui/DatePicker';
import dataStore from '../../data/store';
import content from './content';


const styles = {
  field: {
    width: '100%',
  },
};

class UserForm extends React.Component {
  static wrapper(children, fieldName) {
    return (
      <Row key={fieldName}>
        <Col xs={12}>
          {children}
        </Col>
      </Row>
    );
  }

  static getDefaultUser() {
    return {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      dateOfBirth: moment().toString(),
      email: '',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userSaved: this.props.userSaved,
      fieldConfig: content,
      errorText: {
        userNameErrorText: '',
        firstNameErrorText: '',
        lastNameErrorText: '',
        emailErrorText: '',
      },
    };
    this.getUserFields = this.getUserFields.bind(this);
    this.createUser = this.createUser.bind(this);
    this.enterTextHandler = this.enterTextHandler.bind(this);
    this.enterDateHandler = this.enterDateHandler.bind(this);
    this.getErrorText = this.getErrorText.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentWillMount() {
    const self = this;
    dataStore.getUser()
    .then((user) => {
      if (!R.isEmpty(user)) {
        self.setState({ user });
      } else {
        self.setState({ user: UserForm.getDefaultUser() });
      }
    });
  }

  getErrorText(name, value) {
    return R.isEmpty(value) ? R.find(R.propEq('name', name))(this.state.fieldConfig).errorText : '';
  }

  getUserFields(
    savedValue,
    onEnterTextHandler,
    onEnterDateHandler,
    errorText,
    userField,
  ) {
    if (userField.type !== 'date') {
      return UserForm.wrapper(
        <TextField
          ref={(input) => { this[userField.name] = input; }}
          name={userField.name}
          onChange={onEnterTextHandler}
          floatingLabelText={userField.label}
          type={userField.type}
          errorText={errorText}
          value={savedValue}
          style={styles.field}
        />, userField.name);
    }
    return UserForm.wrapper(
      <DatePicker
        ref={(input) => { this[userField.name] = input; }}
        name={userField.name}
        onChange={onEnterDateHandler}
        container="inline"
        floatingLabelText={userField.label}
        autoOk
        value={new Date(savedValue)}
        textFieldStyle={styles.field}
      />, userField.name);
  }

  enterDateHandler(event, value) {
    this.setState({
      user: R.merge(this.state.user, { dateOfBirth: moment(value) }),
    });
  }

  enterTextHandler(event, value) {
    const { user, errorText } = this.state;
    this.setState({
      user: R.merge(user, { [event.target.name]: value }),
      errorText: R.merge(errorText, {
        [`${event.target.name}ErrorText`]: this.getErrorText(event.target.name, value),
      }),
    });
  }

  createUser() {
    return {
      id: uuidV4(),
      userName: this.userName.props.value,
      firstName: this.firstName.props.value,
      lastName: this.lastName.props.value,
      dateOfBirth: moment(this.dateOfBirth.props.value),
      email: this.email.props.value,
    };
  }

  saveUser(e) {
    e.preventDefault();
    const user = this.createUser();
    dataStore.newOrUpdateUser(user);
    this.props.userSaved(user);
  }

  render() {
    if (R.isEmpty(this.state.user)) {
      return <div>Loading...</div>;
    }

    return (
      <form onSubmit={this.saveUser}>
        {this.state.fieldConfig.map(field =>
            this.getUserFields(
              this.state.user[field.name],
              this.enterTextHandler,
              this.enterDateHandler,
              this.state.errorText[`${field.name}ErrorText`],
              field,
              ),
           )}
        <FlatButton type="submit" primary label="Save User" />
      </form>);
  }
 }

UserForm.propTypes = {
  userSaved: PropTypes.func,
};

UserForm.defaultProps = {
  userSaved: () => {},
};

export default UserForm;
