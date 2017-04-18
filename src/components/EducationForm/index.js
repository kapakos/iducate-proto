import React from 'react';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import { blue800 } from 'material-ui/styles/colors';
import R from 'ramda';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import config from './fieldConfig';
import dataStore from '../../data/store';

class EducationForm extends React.Component {
  static getDefaultEducation() {
    return {
      id: 0,
      schoolName: '',
      degree: '',
      fieldOfStudy: '',
      grade: '',
      fromDate: moment().day(-30).toString(),
      toDate: moment().toString(),
      description: '',
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      fieldConfig: config,
      education: {},
    };
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handlerEnterDate = this.handlerEnterDate.bind(this);
    this.handlerEnterText = this.handlerEnterText.bind(this);
    this.handlerSelectField = this.handlerSelectField.bind(this);
    this.getFields = this.getFields.bind(this);
    this.fieldCreator = this.fieldCreator.bind(this);
  }

  getFields(field) {
    return this.fieldCreator('', field, this.handlerEnterDate, this.handlerEnterText, this.handlerSelectField);
  }

  fieldCreator(
    initialValue,
    field,
    onEnterDateHandler,
    onEnterTextHandler,
    onSelectChange,
) {
    if (field.type === 'date') {
      return (
        <DatePicker
          ref={(input) => {
            this[field.name] = input;
          }}
          name={field.name}
          onChange={onEnterDateHandler}
          container="inline"
          floatingLabelText={field.label}
          autoOk
          value={R.isEmpty(initialValue) ? moment() : moment(initialValue)}
          key={field.name}
        />
      );
    } else if (field.type === 'text') {
      return (
        <TextField
          ref={(input) => {
            this[field.name] = input;
          }}
          name={field.name}
          onChange={onEnterTextHandler}
          floatingLabelText={field.label}
          type={field.type}
          errorText={field.errorText}
          value={initialValue}
          multiLine={field.multiLine}
          key={field.name}
        />
      );
    } else if (field.type === 'select') {
      return (
        <SelectField
          ref={(input) => {
            this[field.name] = input;
          }}
          floatingLabelText={field.label}
          value={0}
          onChange={onSelectChange}
          key={field.name}
        >
          {field.options.map((item, index) =>
            <MenuItem value={index} key={item.id} primaryText={item.name} />)}
        </SelectField>
      );
    }
    return (<div />);
  }

  handlerEnterDate(event, value) {
    console.log('value');
    console.log(value);
    this.setState({
      education: R.merge(this.state.education, { [fieldName]: moment(value) }),
    });
  }

  handlerEnterText(fieldName, value) {

  }

  handlerSelectField(fieldName, option) {

  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled
        onTouchTap={this.handleDialogClose}
      />,
    ];

    return (
      <div>
        <IconButton tooltip="Add Education" onTouchTap={this.handleDialogOpen}>
          <ContentAddCircleOutline color={blue800} />
        </IconButton>
        <Dialog
          title="Add Education"
          actions={actions}
          modal
          open={this.state.dialogOpen}
        >
          {this.state.fieldConfig.map(field => this.getFields(field))}
        </Dialog>
      </div>
    );
  }
}

export default EducationForm;
