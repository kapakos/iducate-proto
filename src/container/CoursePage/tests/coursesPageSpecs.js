import React from 'react';
import R from 'ramda';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import dataService from '../../../services/data';
import CoursePage from '../';
import dataStore from '../../../data/store';

const coursesList = dataService.getCourses();
const demoCourseList = [
  {
    id: 0,
    title: 'R Platforms & Applications',
    partnerId: 'coursera',
  },
  {
    id: 1,
    title: 'Server-Side Swift',
    partnerId: 'coursera',
  },
  {
    id: 2,
    title: 'Gamification',
    partnerId: 'udacity',
  },
  {
    id: 3,
    title: 'Vital Signs: Understanding What the Body Is Telling Us',
    partnerId: 'coursera',
  },
  {
    id: 4,
    title: 'The Evolving Universe',
    partnerId: 'udacity',
  },
];

const demoSavedCourses = [
  { id: 2, taken: true, toTake: false },
  { id: 0, taken: true, toTake: false },
  { id: 4, taken: false, toTake: true },
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

const demoCourseStateList = [
  {
    name: 'All',
    id: 'all',
  },
  {
    name: 'Completed',
    id: 'taken',
  },
  {
    name: 'Planned',
    id: 'toTake',
  },
];

const state = {
  allCourses: demoCourseList,
  filteredCourses: demoCourseList,
  providers: demoProviderList,
  courseStateIndex: 0,

};

describe('<CoursePage />', () => {
  let wrapper = null;
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    wrapper = shallow(<CoursePage />);
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  describe('state filtredCourses', () => {
    it('should return the courses filtered by partner', () => {
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
      wrapper.instance().courses = demoCourseList;
      wrapper.instance().filterCourses('si');
      expect(wrapper.state('filteredCourses').length).equal(2);
      expect(wrapper.state('filteredCourses')[0].title).equal('Server-Side Swift');
      expect(wrapper.state('filteredCourses')[1].title).equal('Vital Signs: Understanding What the Body Is Telling Us');
    });

    it('filters through all courses for selected Provider', () => {
      wrapper.setState(Object.assign({}, state, { providerIndex: 0 }));
      wrapper.instance().courses = demoCourseList;
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
      wrapper.instance().courses = demoCourseList;
      const result = wrapper.instance().getCoursesByPartner('all');
      expect(result).to.deep.equal(demoCourseList);
    });

    it('returns the current courses filtered by partner when "coursera" is selected', () => {
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;
      const result = wrapper.instance().getCoursesByPartner('coursera');
      expect(result).to.deep.equal(demoCourseList.filter(course => course.partnerId === 'coursera'));
    });

    it('returns the current courses filtered by partner when "udacity" is selected', () => {
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;
      const result = wrapper.instance().getCoursesByPartner('udacity');
      expect(result).to.deep.equal(demoCourseList.filter(course => course.partnerId === 'udacity'));
    });
  });

  describe('getFilteredCoursesByCourseState', () => {
    // it('should return the courses filtered by courseState', async () => {
    //   wrapper.setState(state);
    //   sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(demoSavedCourses));
    //   const takenCourses = await wrapper.instance().getCoursesByCourseState('taken');
    //   expect(takenCourses.length).equal(2);
    //   const toTakeCourses = await wrapper.instance().getCoursesByCourseState('toTake');
    //   expect(toTakeCourses.length).equal(1);
    // });

    // it('should return return all courses when filter all is passed', async () => {
    //   wrapper.setState(state);
    //   sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(demoSavedCourses));
    //   const allCourses = await wrapper.instance().getCoursesByCourseState('all');

    //   expect(allCourses.length).equal(3);
    // });
  });

  describe('handle courseStateChange', () => {
    it('should return set the all Courses in the state when all is selected', async () => {
      sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(demoSavedCourses));
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;

      await wrapper.instance().handleCourseStateChange(null, 0, 0);
      const index = wrapper.state('courseStateIndex');
      expect(index).equal(0);
      const courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(3);
    });
    it('should return taken courses when taken is selected', async () => {
      sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(demoSavedCourses));
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;

      await wrapper.instance().handleCourseStateChange(null, 1, 1);
      const index = wrapper.state('courseStateIndex');
      expect(index).equal(1);
      const courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(2);
    });

    it('should return toTake courses when toTake is selected', async () => {
      sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(demoSavedCourses));
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;

      await wrapper.instance().handleCourseStateChange(null, 1, 1);
      const index = wrapper.state('courseStateIndex');
      expect(index).equal(1);
      const courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(2);
    });

    it('should consider already filtered provider selected courses', async () => {
      const savedCourses = [
        { id: 0, taken: true, toTake: false },
        { id: 1, taken: true, toTake: false },
        { id: 2, taken: true, toTake: false },
        { id: 3, taken: false, toTake: true },
      ];
      sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(savedCourses));
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;

      await wrapper.instance().handleProviderChange(null, 1, 1);
      let index = wrapper.state('providerIndex');
      expect(index).equal(1);
      let courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(3);

      await wrapper.instance().handleCourseStateChange(null, 1, 1); // select taken courses
      index = wrapper.state('courseStateIndex');
      expect(index).equal(1);
      courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(2);
    });

    it('should consider already filtered courseState selected courses', async () => {
      const savedCourses = [
        { id: 0, taken: true, toTake: false },
        { id: 1, taken: true, toTake: false },
        { id: 2, taken: true, toTake: false },
        { id: 3, taken: false, toTake: true },
      ];
      sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(savedCourses));
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;

      await wrapper.instance().handleCourseStateChange(null, 1, 1); // select taken courses
      let index = wrapper.state('courseStateIndex');
      expect(index).equal(1);
      let courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(3);

      await wrapper.instance().handleProviderChange(null, 2, 2);
      index = wrapper.state('providerIndex');
      expect(index).equal(2);
      courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(1);
    });

    it('should filter from all courses if filter is already selected', async () => {
      const savedCourses = [
        { id: 0, taken: true, toTake: false },
        { id: 1, taken: true, toTake: false },
        { id: 2, taken: true, toTake: false },
        { id: 3, taken: false, toTake: true },
      ];

      sandbox.stub(dataStore, 'getCourses').returns(Promise.resolve(savedCourses));
      wrapper.setState(state);
      wrapper.instance().courses = demoCourseList;

      await wrapper.instance().handleProviderChange(null, 1, 1); // select coursera courses
      let index = wrapper.state('providerIndex');
      expect(index).equal(1);
      let courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(3);

      await wrapper.instance().handleCourseStateChange(null, 1, 1); // select taken courses
      index = wrapper.state('courseStateIndex');
      expect(index).equal(1);
      courses = wrapper.state('filteredCourses');
      expect(courses.length).equal(2);

      // await wrapper.instance().handleCourseStateChange(null, 2, 2); // select totaken courses
      // index = wrapper.state('courseStateIndex');
      // expect(index).equal(2);
      // courses = wrapper.state('filteredCourses');
      // expect(courses.length).equal(1);
      // expect(courses[0].id).equal(3);
    });
  });
});
