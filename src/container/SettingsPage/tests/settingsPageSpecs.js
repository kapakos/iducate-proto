import React from 'react';
import R from 'ramda';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import dataService from '../../../services/data';
import SettingsPage from '../';

const content = [
  {
    errorText: 'Username field is required',
    required: true,
    label: 'User Name',
    type: 'text',
    name: 'userName',
  },
  {
    errorText: 'First name field is required',
    required: true,
    label: 'First Name',
    type: 'text',
    name: 'firstName',
  },
  {
    errorText: 'Last name field is required',
    required: true,
    label: 'Last Name',
    type: 'text',
    name: 'lastName',
  },
  {
    errorText: '',
    required: false,
    label: 'Date of Birth',
    type: 'date',
    name: 'dateOfBirth',
  },
  {
    errorText: 'Email field is required',
    required: true,
    label: 'Email',
    type: 'email',
    name: 'email',
  },
];


describe('<SettingsPage/>', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<SettingsPage />);
  });

  afterEach(() => {
    wrapper = null;
  });

  describe('create User', () => {
    it('creates and returns a user object', () => {
      wrapper.setState({ content });
      const user = wrapper.instance().createUser();

      // expect(user).to.have.property('userName');
    });
  });
});
