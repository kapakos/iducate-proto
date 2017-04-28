import CryptoJS from 'crypto-js';
import auth from '../authService';
import dataStore from '../../data/store';

global.window = {};
global.window.localStorage = localStorage;

describe('Authentication Service', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
    localStorage.clear();
    localStorage.itemInsertionCallback = null;
  });
  const credentials = {
    username: 'pkapako',
    password: 'password',
  };

  it('returns true if user is authenitcated', async () => {
    await dataStore.loginUser(credentials);
    const isAuthenticated = await auth.isAuthenticated();

    expect(isAuthenticated).to.be.true;
  });

  it('returns false when user is logged out', async () => {
    await dataStore.loginUser(credentials);
    await dataStore.deleteLoginData();

    const isAuthenticated = await auth.isAuthenticated();
    expect(isAuthenticated).to.be.false;
  });
});
