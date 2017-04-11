import React from 'react';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DatePicker from 'material-ui/DatePicker';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameErrorText: '',
      firstNameErrorText: '',
      lastNameErrorText: '',
      emailErrorText: '',
    };
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <TextField
              floatingLabelText="User Name"
              errorText={this.state.userNameErrorText}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TextField
              floatingLabelText="First Name"
              errorText={this.state.firstNameErrorText}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TextField
              floatingLabelText="Last Name"
              errorText={this.state.lastNameErrorText}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DatePicker
              container="inline"
              floatingLabelText="Date of Birth"
              autoOk
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TextField
              hintText="John@doe.com"
              floatingLabelText="Email"
              errorText={this.state.emailErrorText}
              type="email"
            />
          </Col>
        </Row>
      </Grid>);
  }
}

export default SettingsPage;
