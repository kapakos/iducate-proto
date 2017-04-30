import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import R from 'ramda';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import UserForm from '../../components/UserForm';
import EducationList from '../../components/EducationList';
import SkillList from '../../components/SkillList';
import Message from '../../components/Message';

class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.steps = 3;
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.userSaved = this.userSaved.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.renderStepActions = this.renderStepActions.bind(this);
    this.closeMessagePanel = this.closeMessagePanel.bind(this);
    this.showMessage = this.showMessage.bind(this);

    this.state = {
      finished: false,
      stepIndex: 0,
      snackBar: { status: false, message: '' },
      message: '',
      messageShowed: false,
    };
  }

  componentWillMount() {
    this.setState({
      message: R.pathOr('', ['location', 'state', 'message'], this.props, ''),
    });
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <UserForm userSaved={this.userSaved} />
        );
      case 1:
        return (
          <div>
            <EducationList />
          </div>
        );
      case 2:
        return 'Courses';
      case 3:
        return 'Future Courses';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  closeMessagePanel(event) {
    event.preventDefault();
    this.context.router.setState({
      message: '',
    });
    this.props.location.key = 'tet234t';
    this.setState({
      message: '',
    });
  }

  handleSnackbarClose() {
    this.setState({
      snackBar: { status: false, message: '' },
    });
  }

  userSaved() {
    this.setState({
      snackBar: {
        status: true,
        message: 'User Data saved',
      },
    });
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= this.steps,
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  showMessage() {
    if (!R.isEmpty(this.state.message) && !this.state.messageShowed) {
      return true;
    }
    return false;
  }

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === this.steps ? 'Finish' : 'Next'}
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
        <FlatButton
          label="Back"
          disabled={stepIndex === 0}
          disableTouchRipple
          disableFocusRipple
          onTouchTap={this.handlePrev}
        />
        )}
      </div>
    );
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '20px 0', textAlign: 'center' };

    return (
      <div>
        <Snackbar
          open={this.state.snackBar.status}
          message={this.state.snackBar.message}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbarClose}
        />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              {
               this.showMessage()
                && <Message message={this.state.message} handleClose={this.closeMessagePanel} />
              }
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div style={{ width: '100%', margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                  <Step>
                    <StepLabel>{'Add you\'re personal data'}</StepLabel>
                    <StepContent>
                      <UserForm userSaved={this.userSaved} />
                      {this.renderStepActions(0)}
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel>{'You\'re educational details'}</StepLabel>
                    <StepContent>
                      <EducationList />
                      {this.renderStepActions(1)}
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel>{'What you\'re good at'}</StepLabel>
                    <StepContent>
                      <SkillList />
                      {this.renderStepActions(2)}
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel>{'Online courses you plan to take'}</StepLabel>
                    <StepContent>
                      {this.renderStepActions(3)}
                    </StepContent>
                  </Step>
                </Stepper>
                {finished && (
                <p style={contentStyle}>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState({ stepIndex: 0, finished: false });
                    }}
                  >
              Click here
            </a> to reset the example.
          </p>
        )}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
DashboardPage.contextTypes = {
  router: PropTypes.shape().isRequired,
};
DashboardPage.propTypes = {
  location: PropTypes.shape(),
};

DashboardPage.defaultProps = {
  location: {},
};
export default DashboardPage;
