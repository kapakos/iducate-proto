import React from 'react';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import { Grid, Row, Col } from 'react-flexbox-grid';
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

  static wrapper(children, key) {
    return (
      <Row key={key}>
        <Col xs={3}>
          {children}
        </Col>
      </Row>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      fieldConfig: config,
      education: {
        schoolName: '',
        degree: '',
        fieldOfStudy: '',
        grade: '',
        fromDate: moment().day(-30).toString(),
        toDate: moment().toString(),
        description: '',
      },
    };
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
    this.handlerEnterText = this.handlerEnterText.bind(this);
    this.handlerSelectField = this.handlerSelectField.bind(this);
    this.getFields = this.getFields.bind(this);
    this.fieldCreator = this.fieldCreator.bind(this);
  }

  getFields(field) {
    return this.fieldCreator(this.state.education[field.name], field, this.handleFromDate, this.handleToDate, this.handlerEnterText, this.handlerSelectField);
  }

  fieldCreator(
    initialValue,
    field,
    onEnterFromDateHandler,
    onEnterToDateHandler,
    onEnterTextHandler,
    onSelectChange,
) {
    if (field.type === 'date') {
      return EducationForm.wrapper(
        <DatePicker
          ref={(input) => {
            this[field.name] = input;
          }}
          name={field.name}
          onChange={field.name === 'fromDate' ? onEnterFromDateHandler : onEnterToDateHandler}
          container="inline"
          floatingLabelText={field.label}
          autoOk
          value={R.isEmpty(initialValue) ? new Date() : new Date(initialValue)}
        />, field.name,
      );
    } else if (field.type === 'text') {
      return EducationForm.wrapper(
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
        />, field.name,
      );
    } else if (field.type === 'select') {
      return EducationForm.wrapper(
        <SelectField
          ref={(input) => {
            this[field.name] = input;
          }}
          floatingLabelText={field.label}
          value={0}
          onChange={onSelectChange}
        >
          {field.options.map((item, index) =>
            <MenuItem value={index} key={item.id} primaryText={item.name} />)}
        </SelectField>, field.name,
      );
    }
    return (<div />);
  }

  handleFromDate(event, value) {
    const { education } = this.state;
    this.setState({
      education: R.merge(education, { fromDate: moment(value) }),
    });
  }

  handleToDate(event, value) {
    this.setState({
      education: R.merge(this.state.education, { toDate: moment(value) }),
    });
  }

  handlerEnterText(event, value) {
    const { education } = this.state;
    this.setState({
      education: R.merge(education, { [event.target.name]: value }),
    });
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
          autoScrollBodyContent
          open={this.state.dialogOpen}
        >
          <Grid fluid>
            {this.state.fieldConfig.map(field => this.getFields(field))}
          </Grid>

        </Dialog>
      </div>
    );
  }
}

export default EducationForm;
