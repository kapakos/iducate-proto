import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SettingsPage from '../SettingsPage';

class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Personal data';
      case 1:
        return 'Education';
      case 2:
        return 'Courses';
      case 2:
        return 'Future Courses';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }


  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <div style={{ width: '100%', margin: 'auto' }}>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Add you're personal data</StepLabel>

                </Step>
                <Step>
                  <StepLabel>You're educational details</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Online courses you've taken</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Online courses you plan to take</StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
                {finished ? (
                  <p>
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
                    >Click here
                    </a> to reset the example.
                  </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DashboardPage;
