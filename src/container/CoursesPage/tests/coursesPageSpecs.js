import React from 'react';
import R from 'ramda';
import { mount, shallow } from 'enzyme';
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
      wrapper.setState({ filteredCourses: demoCourseList });
      wrapper.instance().filterCourses('gam');
      expect(wrapper.state('filteredCourses').length).equal(1);
      expect(wrapper.state('filteredCourses')[0].title).equal('Gamification');
    });

    it('should only return courses with the search Text in the title test 2', () => {
      wrapper.setState({ filteredCourses: demoCourseList });
      wrapper.instance().filterCourses('si');
      expect(wrapper.state('filteredCourses').length).equal(2);
      expect(wrapper.state('filteredCourses')[0].title).equal('Server-Side Swift');
      expect(wrapper.state('filteredCourses')[1].title).equal('Vital Signs: Understanding What the Body Is Telling Us');
    });
  });

  describe('showCourses', () => {
    it('returns all courses when id == "all"', () => {
      wrapper.setState({ allCourses: demoCourseList });
      wrapper.instance().showCourses('all');
      const result = wrapper.state('filteredCourses');
      expect(result).to.deep.equal(demoCourseList);
    });

    it('returns 3 courses when id = coursera', () => {
      wrapper.setState({ allCourses: demoCourseList });
      wrapper.instance().showCourses('coursera');
      const result = wrapper.state('filteredCourses');
      expect(wrapper.state('filteredCourses').length).equal(3);
      expect(result).to.deep.equal(R.filter(course => course.partnerId === 'coursera', demoCourseList));
    });
  });
});
