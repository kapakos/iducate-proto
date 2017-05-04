import R from 'ramda';

const isStorageAvailable = (type) => {
  try {
    const storage = global.window[type];
    const x = '__storagetest__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

const formatEnumerationIntoMessage = (arr) => {
  const cleanArr = R.filter(el => !R.isEmpty(el) && !R.isNil(el), arr);
  if (cleanArr.length === 1) {
    return ` ${cleanArr.join()}`;
  }
  if (cleanArr.length === 2) {
    return cleanArr.join(' and ');
  }
  return cleanArr.join(', ').replace(/\,(?=[^,]*$)/, ' and');
};

const getErrorText = (name, value, fieldConfig) => R.isEmpty(value) ? R.find(R.propEq('name', name))(fieldConfig).errorText || 'This field is required' : '';

const validateFields = (form, fieldConfig) => {
  const requiredFields = fieldConfig.filter(field => field.required === true);
  const isValid = R.none(el => R.isEmpty(form[el.name]))(requiredFields);
  const errorStates = {};
  if (!isValid) {
    const setErrorState = (field) => {
      errorStates[field.name] = getErrorText(field.name, form[field.name], fieldConfig);
    };
    R.forEach(setErrorState, requiredFields);
  }
  return {
    isValid,
    errorText: errorStates,
  };
};

export default {
  isStorageAvailable,
  formatEnumerationIntoMessage,
  validateFields,
  getErrorText,
};
