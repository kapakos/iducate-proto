import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import R from 'ramda';
import { Col } from 'react-flexbox-grid';


const formWrapper = (children, key) => (
  <Col xs={12} sm={6} key={key}>
    {children}
  </Col>
    );

export default (options) => {
  const style = {
    textField: {
      width: '100%',
    },
    hide: {
      display: 'none',
    },
  };
  if (options.field.type === 'date') {
    console.log('options.disabled');
    console.log(options.disabled);
    return options.disabled ? formWrapper(<div />, options.field.name) : formWrapper(
      <DatePicker
        name={options.field.name}
        onChange={options.onChange}
        container="inline"
        floatingLabelText={options.field.label}
        autoOk
        style={options.disabled ? style.hide : {}}
        disabled={options.disabled}
        textFieldStyle={style}
        value={R.isEmpty(options.initialValue) ? new Date() : new Date(options.initialValue)}
      />, options.field.name,
      );
  } else if (options.field.type === 'text') {
    return formWrapper(
      <TextField
        name={options.field.name}
        onChange={options.onChange}
        floatingLabelText={options.field.label}
        type={options.field.type}
        errorText={options.errorText}
        value={R.isNil(options.initialValue) ? '' : options.initialValue}
        style={style.textField}
        multiLine={options.field.multiLine}
      />, options.field.name,
      );
  } else if (options.field.type === 'select') {
    return formWrapper(
      <SelectField
        floatingLabelText={options.field.label}
        value={options.initialValue}
        style={R.merge(style.textField, { cursor: 'pointer' })}
        onChange={options.onSelectChange}
      >
        {options.field.options.map(item =>
          <MenuItem value={item.id} key={item.id} primaryText={item.name} />)}
      </SelectField>, options.field.name,
      );
  } else if (options.field.type === 'toggle') {
    return formWrapper(
      <Toggle
        name={options.field.name}
        label={options.field.label}
        labelPosition="right"
        toggled={options.initialValue}
        onToggle={options.onChange}
      />, options.field.name,
      );
  }
  return (false);
};

