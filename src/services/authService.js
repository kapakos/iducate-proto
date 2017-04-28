import R from 'ramda';
import dataStore from '../data/store';

const isAuthenticated = async () => !R.isEmpty(await dataStore.getLoginData());

export default {
  isAuthenticated,
};
