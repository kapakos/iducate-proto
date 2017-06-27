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
      return <Survey questions={R.pick(['goals'], this.questions)} nextStep={this.goToNextStep} title="What are your goals?" />;
    } else if (this.state.step === 1) {
      return <Survey questions={R.pick(['timeSpend'], this.questions)} nextStep={this.goToNextStep} title="How much time do you want to spend?" />;
    } else if (this.state.step === 2) {
      return <Survey questions={R.pick(['classType'], this.questions)} nextStep={this.goToNextStep} title="What type of classes do you prefer?" />;
    } else if (this.state.step === 3) {
      return <Survey questions={R.pick(['fees'], this.questions)} nextStep={this.goToNextStep} title="How much are you able to spend on your education?" />;
    } else if (this.state.step === 4) {
      return <Survey questions={R.pick(['fields'], this.questions)} nextStep={this.goToNextStep} title="What fields are you interested in?" />;
    } else if (this.state.step === 5) {
      return <UserForm />;
    }
    return <div />;
  }
}

export default SurveyPage;
