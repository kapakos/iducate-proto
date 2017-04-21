import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import UserForm from '../../components/UserForm';
import EducationList from '../../components/EducationList';
import SkillList from '../../components/SkillList';

class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      snackBar: false,
    };
    this.steps = 3;
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.userSaved = this.userSaved.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.renderStepActions = this.renderStepActions.bind(this);
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

  handleSnackbarClose() {
    this.setState({
      snackBar: false,
    });
  }

  userSaved(user) {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= this.steps,
      snackBar: true,
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
          open={this.state.snackBar}
          message="User Data saved"
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbarClose}
        />
        <Grid fluid>
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
                    <StepLabel>{'Skills'}</StepLabel>
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

export default DashboardPage;
