import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const FieldCreator = ({
  initialValue,
  field,
  onEnterDateHandler,
  onEnterTextHandler,
  onSelectChange,
}) => {
  if (field.type === 'date') {
    return (
      <DatePicker
        ref={(input) => {
          field.value = input;
        }}
        name={field.name}
        onChange={onEnterDateHandler}
        container="inline"
        floatingLabelText={field.label}
        autoOk
        value={R.isEmpty(initialValue) ? moment() : moment(initialValue)}
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
      />
    );
  } else if (field.type === 'select') {
    <SelectField
      floatingLabelText={field.label}
      value={0}
      onChange={onSelectChange}
    >
      {field.options.map((item, index) =>
        <MenuItem value={index} key={item} primaryText={item} />)}
    </SelectField>;
  }
  return (<div />);
};

FieldCreator.propTypes = {
  initialValue: PropTypes.string,
  field: PropTypes.shape(),
  onEnterDateHandler: PropTypes.func,
  onEnterTextHandler: PropTypes.func,
  onSelectChange: PropTypes.func,
};

FieldCreator.defaultProps = {
  initialValue: '',
  field: {},
  onEnterDateHandler: () => {},
  onEnterTextHandler: () => {},
  onSelectChange: () => {},
};

export default FieldCreator;
