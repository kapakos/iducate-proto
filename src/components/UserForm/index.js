import React from 'react';
import PropTypes from 'prop-types';
import uuidV4 from 'uuid/v4';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Row, Col } from 'react-flexbox-grid';
import DatePicker from 'material-ui/DatePicker';
import dataStore from '../../data/store';

class UserForm extends React.Component {
  static wrapper(children, fieldName) {
    return (<Row key={fieldName}>
      <Col xs={12}>
        {children}
      </Col>
    </Row>);
  }
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
    };
    this.getUserFields = this.getUserFields.bind(this);
    this.createUser = this.createUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
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
      />, userField.name);
  }

  createUser() {
    return {
      id: uuidV4(),
      userName: this.userName.input.value,
      firstName: this.firstName.input.value,
      lastName: this.lastName.input.value,
      dateOfBirth: moment(this.dateOfBirth.state.date),
      email: this.email.input.value,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.createUser();
    dataStore.newOrUpdateUser(user);
    this.setState({
      snackbar: true,
    });
  }

  handleSnackbarClose() {
    this.setState({
      snackbar: false,
    });
  }

  render() {
    const {
    fieldConfig,
    user,
    onTextEnterHandler,
    onDateEnterHandler,
    errorText } = this.props;
    return (<form key={'submitform'} onSubmit={this.handleSubmit}>
      {fieldConfig.map(field =>
        this.getUserFields(
          user[field.name],
          onTextEnterHandler,
          onDateEnterHandler,
          errorText[`${field.name}ErrorText`],
          field,
          ),
       )}
      <RaisedButton key="submit" label="Save" primary type="submit" />
      <Snackbar
        open={this.state.snackbar}
        message="User Data saved"
        autoHideDuration={3000}
        onRequestClose={this.handleSnackbarClose}
      />
    </form>);
  }
 }

UserForm.propTypes = {
  fieldConfig: PropTypes.arrayOf(PropTypes.shape()),
  user: PropTypes.shape(),
  onTextEnterHandler: PropTypes.func,
  onDateEnterHandler: PropTypes.func,
  errorText: PropTypes.shape(),
};

UserForm.defaultProps = {
  fieldConfig: {},
  user: {},
  onTextEnterHandler: () => {},
  onDateEnterHandler: () => {},
  errorText: '',
};

export default UserForm;
