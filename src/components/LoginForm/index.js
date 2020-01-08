import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { blue800 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import config from './fieldConfig';


class LoginForm extends React.Component {
  static wrapper(children, key) {
    return (
      <Row key={key}>
        <Col xs={12}>
          {children}
        </Col>
      </Row>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      credentials: {},
      errorText: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.createFields = this.createFields.bind(this);
    this.handleEnterText = this.handleEnterText.bind(this);
    this.getErrorText = this.getErrorText.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }


  getErrorText(name, value) {
    const errorText = R.isEmpty(value) || R.isNil(value) ? R.find(R.propEq('name', name))(config).errorText || 'This field is required' : '';
    return errorText;
  }

  handleEnterText(event, value) {
    const { credentials, errorText } = this.state;
    this.setState({
      credentials: R.merge(credentials, { [event.target.name]: value }),
      errorText: R.merge(errorText,
        { [event.target.name]: this.getErrorText(event.target.name, value) }),
    });
  }

  validateFields(form) {
    const requiredFields = config.filter(field => field.required === true);
    const isValid =
      R.none(el => R.isEmpty(form[el.name]) || R.isNil(form[el.name]))(requiredFields);
    if (!isValid) {
      const errorStates = {};
      const setErrorState = (field) => {
        errorStates[field.name] = this.getErrorText(field.name, form[field.name]);
      };
      R.forEach(setErrorState, requiredFields);
      this.setState({
        errorText: errorStates,
      });
    }
    return isValid;
  }

  createFields(field) {
    return LoginForm.wrapper(
      <TextField
        ref={(input) => {
          this[field.name] = input;
        }}
        name={field.name}
        onChange={this.handleEnterText}
        floatingLabelText={field.label}
        type={field.type}
        style={{ width: '100%' }}
        errorText={this.state.errorText[field.name]}
        multiLine={field.multiLine}
      />, field.name,
      );
  }

  handleLogin(event) {
    event.preventDefault();
    if (this.validateFields(this.state.credentials)) {
      this.props.loginHandler(this.state.credentials);
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle
            titleColor="white"
            subtitleColor="white"
            style={{ background: blue800 }}
            title="Welcome"
            subtitle="This is a demo. Use any username and password"
          />
          <CardText>
            <form onSubmit={this.handleLogin}>
              {config.map(field => this.createFields(field, this.state.credentials[field.name])) }
              <FlatButton
                label="Login"
                primary
                type="submit"
              />
            </form>
          </CardText>
        </Card>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func,
};

LoginForm.defaultProps = {
  loginHandler: () => {},
};

export default LoginForm;
