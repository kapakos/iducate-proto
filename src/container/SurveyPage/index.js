import React, { Component } from 'react';
import R from 'ramda';
import Survey from '../../components/Survey';
import UserForm from '../../components/UserForm';
import questions from './content';
import dataStore from '../../data/store';

class SurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
    this.steps = R.keys(questions).length;
    this.questions = questions;
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  goToNextStep(selectedAnswers) {
    dataStore.saveSurveyAnswers(selectedAnswers);
    const currentStep = this.state.step;
    this.setState({
      step: currentStep + 1,
    });
  }

  render() {
    if (this.state.step === 0) {
      return <Survey content={this.questions.goals} nextStep={this.goToNextStep} />;
    } else if (this.state.step === 1) {
      return <Survey content={this.questions.timeSpend} nextStep={this.goToNextStep} />;
    } else if (this.state.step === 2) {
      return <Survey content={this.questions.classType} nextStep={this.goToNextStep} />;
    } else if (this.state.step === 3) {
      return <Survey content={this.questions.fees} nextStep={this.goToNextStep} />;
    } else if (this.state.step === 4) {
      return <Survey content={this.questions.fields} nextStep={this.goToNextStep} />;
    } else if (this.state.step === 5) {
      return <UserForm />;
    }
    return <div />;
  }
}

export default SurveyPage;
