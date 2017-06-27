import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

class Survey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: true,
      selectedOptions: {},
    };

    this.handleNextStep = this.handleNextStep.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  handleNextStep() {
    if (!R.isEmpty(this.state.selectedOptions)) {
      this.props.nextStep(this.state.selectedOptions);
    } else {
      this.props.nextStep({ [this.key]: {} });
    }
  }

  checkAnswer(event, checked) {
    const answers = this.state.selectedOptions[this.key];
    const answer = event.target.name;
    let checkedAnswers;
    if (checked) {
      checkedAnswers = R.uniq(R.append(answer, answers));
    } else {
      checkedAnswers = R.reject(a => a === answer, answers);
    }

    this.setState({
      selectedOptions: { [this.key]: checkedAnswers },
    });
  }

  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    this.key = R.keys(this.props.questions)[0];

    const actions = [
      <FlatButton
        label="Submit"
        primary
        onTouchTap={this.handleNextStep}
      />,
    ];
    if (!R.isEmpty(this.props.questions[this.key])) {
      return (
        <div>
          <Dialog
            title={this.props.title}
            actions={actions}
            modal
            open={this.state.openDialog}
          >
            {this.props.questions[this.key].map(q => <Checkbox
              key={q}
              label={q}
              style={styles.checkbox}
              onCheck={this.checkAnswer}
              name={q}
            />)}
          </Dialog>
        </div>
      );
    }
    return false;
  }
}

Survey.propTypes = {
  nextStep: PropTypes.func,
  questions: PropTypes.shape(),
  title: PropTypes.string,
};

Survey.defaultProps = {
  nextStep: () => {},
  questions: {},
  title: '',
};

export default Survey;
