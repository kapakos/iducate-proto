import React from 'react';
import R from 'ramda';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import dataService from '../../../services/data';
import CoursesPage from '../';

const coursesList = dataService.getCourses();
const demoCourseList = [
  {
    title: 'R Platforms & Applications',
    partnerId: 'coursera',
  },
  {
    title: 'Server-Side Swift',
    partnerId: 'coursera',
  },
  {
    title: 'Gamification',
    partnerId: 'udacity',
  },
  {
    title: 'Vital Signs: Understanding What the Body Is Telling Us',
    partnerId: 'coursera',
  },
  {
    title: 'The Evolving Universe',
    partnerId: 'udacity',
  },
];

const demoProviderList = [
  {
    name: 'All',
    id: 'all',
  },
  {
    name: 'Coursera',
    id: 'coursera',
  },
  {
    name: 'Udacity',
    id: 'udacity',
  },
];

const state = {
  allCourses: demoCourseList,
  filteredCourses: demoCourseList,
  providers: demoProviderList,
};

describe('<CoursesPage/>', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<CoursesPage />);
  });

  afterEach(() => {
    wrapper = null;
  });

  describe('state filtredCourses', () => {
    it('shold return the courses filtered by partner', () => {
      const expectedCount = coursesList.length;
      const courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(expectedCount);
    });

    it('should maintain the same state when searchText is empty', () => {
      const coursesBefore = wrapper.state('filteredCourses');
      wrapper.instance().filterCourses('');
      const coursesAfter = wrapper.state('filteredCourses');
      expect(coursesAfter).to.deep.equal(coursesBefore);
    });

    it('should only return courses with the search Text in the title test 1', () => {
      wrapper.setState(Object.assign({}, state, { providerIndex: 0 }));
      wrapper.instance().filterCourses('gam');
      expect(wrapper.state('filteredCourses').length).equal(1);
      expect(wrapper.state('filteredCourses')[0].title).equal('Gamification');
    });

    it('should only return courses with the search Text in the title test 2', () => {
      wrapper.setState(Object.assign({}, state, { providerIndex: 0 }));
      wrapper.instance().filterCourses('si');
      expect(wrapper.state('filteredCourses').length).equal(2);
      expect(wrapper.state('filteredCourses')[0].title).equal('Server-Side Swift');
      expect(wrapper.state('filteredCourses')[1].title).equal('Vital Signs: Understanding What the Body Is Telling Us');
    });

    it('filters through all courses for selected Provider', () => {
      wrapper.setState(Object.assign({}, state, { providerIndex: 0 }));
      wrapper.instance().filterCourses('si');
      expect(wrapper.state('filteredCourses').length).equal(2);
      expect(wrapper.state('filteredCourses')[0].title).equal('Server-Side Swift');
      expect(wrapper.state('filteredCourses')[1].title).equal('Vital Signs: Understanding What the Body Is Telling Us');
      wrapper.instance().filterCourses('evo');
      expect(wrapper.state('filteredCourses').length).equal(1);
      expect(wrapper.state('filteredCourses')[0].title).equal('The Evolving Universe');
    });
  });

  describe('getFilteredCoursesByPartner', () => {
    it('returns the all current courses "all" is selected', () => {
      wrapper.setState(state);
      const result = wrapper.instance().getCoursesByPartner('all');
      expect(result).to.deep.equal(demoCourseList);
    });

    it('returns the current courses filtered by partner when "coursera" is selected', () => {
      wrapper.setState(state);
      const result = wrapper.instance().getCoursesByPartner('coursera');
      expect(result).to.deep.equal(demoCourseList.filter(course => course.partnerId === 'coursera'));
    });

    it('returns the current courses filtered by partner when "coursera" is selected', () => {
      wrapper.setState(state);
      const result = wrapper.instance().getCoursesByPartner('udacity');
      expect(result).to.deep.equal(demoCourseList.filter(course => course.partnerId === 'udacity'));
    });
  });
});
