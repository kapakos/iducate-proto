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


export default {
  isStorageAvailable,
  formatEnumerationIntoMessage,
};
