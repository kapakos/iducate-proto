import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import uuidV4 from 'uuid/v4';
import { Grid, Row, Col } from 'react-flexbox-grid';
import R from 'ramda';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EducationForm extends React.Component {
  static wrapper(children, key) {
    return (
      <Col xs={12} sm={6} key={key}>
        {children}
      </Col>
    );
  }

  constructor(props) {
    super(props);
    const defaultEducation = {
      id: '',
      schoolName: '',
      degree: 0,
      fieldOfStudy: '',
      grade: '',
      fromDate: moment().day(-30).toString(),
      toDate: moment().toString(),
      description: '',
    };
    this.state = {
      dialogOpen: true,
      education: R.isEmpty(this.props.educationInstance)
      ? defaultEducation
      : this.props.educationInstance,
      errorText: {},
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
    this.handlerEnterText = this.handlerEnterText.bind(this);
    this.handlerSelectField = this.handlerSelectField.bind(this);
    this.getFields = this.getFields.bind(this);
    this.fieldCreator = this.fieldCreator.bind(this);
    this.createEducation = this.createEducation.bind(this);
    this.saveEducation = this.saveEducation.bind(this);
    this.getErrorText = this.getErrorText.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  getErrorText(name, value) {
    return R.isEmpty(value) ? R.find(R.propEq('name', name))(this.props.fieldConfig).errorText || 'This field is required' : '';
  }

  getFields(field) {
    return this.fieldCreator(
      this.state.education[field.name],
      field, this.handleFromDate,
      this.handleToDate,
      this.handlerEnterText,
      this.handlerSelectField,
      this.state.errorText,
      );
  }

  fieldCreator(
    initialValue,
    field,
    onEnterFromDateHandler,
    onEnterToDateHandler,
    onEnterTextHandler,
    onSelectChange,
    errorText,
) {
    const style = {
      width: '100%',
    };

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
          textFieldStyle={style}
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
          errorText={errorText[field.name]}
          value={initialValue}
          style={style}
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
          value={initialValue}
          style={R.merge(style, { cursor: 'pointer' })}
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
    const { education, errorText } = this.state;
    this.setState({
      education: R.merge(education, { [event.target.name]: value }),
      errorText: R.merge(errorText, { [event.target.name]: this.getErrorText(event.target.name, value) }),
    });
  }

  handlerSelectField(event, index, value) {
    if (value != null) {
      this.setState({
        education: R.merge(this.state.education, { degree: value }),
      });
    }
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
    this.props.closeDialog();
  }

  async saveEducation() {
    const education = this.createEducation();
    if (this.validateFields(education)) {
      this.props.updateEducation(education);
      this.handleDialogClose();
    }
  }

  validateFields(form) {
    const requiredFields = this.props.fieldConfig.filter(field => field.required === true);
    const isValid = R.none(el => R.isEmpty(form[el.name]))(requiredFields);
    if (!isValid) {
      const errorStates = {};
      const setErrorState = (field) => {
        errorStates[field.name] = this.getErrorText(field.name, form[field.name]);
      };
      R.forEach(setErrorState, requiredFields);
      this.setState({
        errorText: errorStates,
      });
    }
    return isValid;
  }

  createEducation() {
    return {
      id: R.isEmpty(this.state.education.id) ? uuidV4() : this.state.education.id,
      schoolName: this.schoolName.props.value,
      degree: this.degree.props.value,
      fieldOfStudy: this.fieldOfStudy.props.value,
      grade: this.grade.props.value,
      fromDate: moment(this.fromDate.props.value),
      toDate: moment(this.toDate.props.value),
      description: this.description.props.value,
    };
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Save"
        primary
        onTouchTap={this.saveEducation}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add Education"
          actions={actions}
          modal
          autoScrollBodyContent
          open={this.state.dialogOpen}
        >
          <Grid fluid>
            <Row>
              {this.props.fieldConfig.map(field => this.getFields(field))}
            </Row>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

EducationForm.propTypes = {
  updateEducation: PropTypes.func,
  closeDialog: PropTypes.func,
  fieldConfig: PropTypes.arrayOf(PropTypes.shape()),
  educationInstance: PropTypes.shape(),
};

EducationForm.defaultProps = {
  updateEducation: () => {},
  closeDialog: () => {},
  fieldConfig: [],
  educationInstance: {},
};

export default EducationForm;
