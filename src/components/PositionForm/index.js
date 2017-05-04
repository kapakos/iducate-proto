import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Grid, Row } from 'react-flexbox-grid';
import R from 'ramda';
import moment from 'moment';
import fieldConfig from './fieldConfig';
import fieldBuilder from '../fieldBuilder';
import utilities from '../../utilities';

class PositionForm extends React.Component {
  constructor(props) {
    super(props);
    this.getFields = this.getFields.bind(this);
    this.handleEnterText = this.handleEnterText.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
    this.handleToggleCurrentPosition = this.handleToggleCurrentPosition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savePosition = this.savePosition.bind(this);
    this.fieldConfig = fieldConfig;

    const defaultPosition = {
      title: '',
      location: '',
      fromDate: moment().subtract(3, 'y').toJSON(),
      toDate: moment().subtract(2, 'y').toJSON(),
      description: '',
      currentPosition: false,
    };

    const position = R.isEmpty(this.props.positionInstance)
      ? defaultPosition
      : this.props.positionInstance;

    this.state = {
      position,
      toDateDisabled: false,
      errorText: {},
    };
  }

  getFields(field) {
    console.log(this.state.position);
    let options = {
      field,
      initialValue: this.state.position[field.name],
      errorText: this.state.errorText[field.name],
    };
    switch (field.type) {
      case 'text':
        options = R.merge(options, {
          onChange: this.handleEnterText,
        });
        break;
      case 'date':
        options = R.merge(options, {
          onChange: field.name === 'fromDate' ? this.handleFromDate : this.handleToDate,
          disabled: field.name === 'fromDate' ? false : this.state.position.currentPosition,
        });
        break;
      case 'toggle':
        options = R.merge(options, {
          onChange: this.handleToggleCurrentPosition,
        });
        break;
      default:
        return '';
    }
    return fieldBuilder(options);
  }

  handleChange(value, fieldName) {
    const { position, errorText } = this.state;
    this.setState({
      position: R.merge(position, { [fieldName]: value }),
      errorText: R.merge(errorText, {
        [fieldName]: utilities.getErrorText(fieldName, value, this.fieldConfig),
      }),
    });
  }

  handleToggleCurrentPosition(event, checked) {
    this.setState({
      toDateDisabled: checked,
    });
    this.handleChange(checked, event.target.name);
  }

  handleFromDate(event, value) {
    this.handleChange(moment(value).toJSON(), 'fromDate');
  }

  handleToDate(event, value) {
    this.handleChange(moment(value).toJSON(), 'toDate');
  }

  handleEnterText(event, value) {
    this.handleChange(value, event.target.name);
  }

  savePosition() {
    const { position } = this.state;
    const validation = utilities.validateFields(position, this.fieldConfig);
    if (!validation.isValid) {
      this.setState({ errorText: validation.errorText });
      return;
    }
    if (this.state.toDateDisabled) {
      position.toDate = '';
    }
    this.props.updatePosition(position);
    this.props.closeDialog();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Save"
        primary
        onTouchTap={this.savePosition}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add Position"
          actions={actions}
          modal
          autoScrollBodyContent
          open
        >
          <Grid fluid>
            <Row middle="xs">
              {this.fieldConfig.map(field => this.getFields(field))}
            </Row>
          </Grid>
        </Dialog>
      </div>
    );
  }
}


PositionForm.propTypes = {
  closeDialog: PropTypes.func,
  positionInstance: PropTypes.shape(),
  updatePosition: PropTypes.func,
};

PositionForm.defaultProps = {
  closeDialog: () => {},
  updatePosition: () => {},
  positionInstance: {},
};
export default PositionForm;
