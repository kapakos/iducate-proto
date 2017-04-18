import sinon from 'sinon';
import moment from 'moment';
import { expect } from 'chai';
import dataStore from '../store';

global.window = {};
global.window.localStorage = localStorage;

const mockedCourseList = [{
  id: '66666',
  title: 'Shell Workshop',
  description: 'A quick, one-lesson introduction to the Unix-style command-line environment. This course is intended to get you up to speed on the shell — using a terminal, managing files and directories, and running command-line programs.',
  photoUrl: 'https://lh3.googleusercontent.com/s2S7Q8NyH4OlJ8Evfgdm08DDn9xyT6gUsbxZd3eN9Fpr9p_QAnZZfocSbgFG0uwvBQC4vElFS_zJ5btSRg=s0#w=1440&h=780',
  partnerId: 'udacity',
  saved: false,
},
{
  id: 'ud1016',
  title: 'Designing in VR',
  description: 'Learn stuff.',
  photoUrl: '',
  partnerId: 'udacity',
},
{
  id: 'ud1014',
  title: 'VR Software Development',
  description: 'This course is designed to teach you how to make your VR experience more dynamic and responsive to your users. You will be exposed to C# programming and using it in the Unity interface. Upon completing this course,, you will have learned basic programming constructs such as methods, loops, variables, and using events and how to apply them in a VR environment.',
  photoUrl: 'https://lh3.googleusercontent.com/8OcQ_YMQSsZN83C4hMQJkrSIQX4_r5AYnUM5QOBx_t4v8fdqqwqa-9p5hpBVKY9ili-9uEzdKisuNNXyymwj=s0#w=1552&h=1012',
  partnerId: 'udacity',
},
];

const mockedUser = {
  id: 0,
  userName: 'pkapako',
  firstName: 'Petros',
  lastName: 'Kapakos',
  dob: moment('19770116').toString(),
  email: 'kapakospetros@gmail.com',
};

describe('Data Provider', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
    localStorage.clear();
    localStorage.itemInsertionCallback = null;
  });

  describe('localStorage mocking library', () => {
    it('localStorage length test', () => {
      expect(localStorage.length).equal(0);
    });

    it('localStorage save item', () => {
      localStorage.setItem('item', 'hello');
      const result = localStorage.getItem('item');
      expect(result).equal('hello');
    });
  });

  describe('Save and Get Courses from localStorage', () => {
    it('returns the localStorage', () => {
      const courses = dataStore.getCourses();
      return courses.then((courseList) => {
        expect(courseList).to.be.an('Array');
      });
    });

    it('returns data from local storage', () => {
      global.window.localStorage.setItem('__courses__iducate__', JSON.stringify([mockedCourseList[0]]));
      const courses = dataStore.getCourses();
      return courses.then((courseList) => {
        expect(courseList[0].id).equal('66666');
      });
    });

    it('saves data to the localStorage', async () => {
      await dataStore.saveCourse(mockedCourseList[0].id);
      const courseList = await dataStore.getCourses();
      expect(courseList[0]).equal('66666');
    });

    it('appends data to the localStorage', async () => {
      await dataStore.saveCourse(mockedCourseList[0].id);
      await dataStore.saveCourse(mockedCourseList[1].id);
      await dataStore.saveCourse(mockedCourseList[2].id);
      const courses = await dataStore.getCourses();
      expect(courses.length).equal(3);
      expect(courses[0]).equal('66666');
      expect(courses[1]).equal('ud1016');
      expect(courses[2]).equal('ud1014');
      await dataStore.removeCourse('ud1016');
      const newCourses = await dataStore.getCourses();
      expect(newCourses.length).equal(2);
    });

    it('only adds an id to the storage if it does not already exist', async () => {
      await dataStore.saveCourse(mockedCourseList[0].id);
      await dataStore.saveCourse(mockedCourseList[0].id);
      const courses = await dataStore.getCourses();
      expect(courses.length).equal(1);
      expect(courses[0]).equal('66666');
    });
  });

  describe('Save new or update user from localstorage', () => {
    it('returns the user from the local storage', async () => {
      global.window.localStorage.setItem('__user__iducate__', JSON.stringify(mockedUser));
      const user = await dataStore.getUser();
      expect(user).to.deep.equal(mockedUser);
    });

    it('returns an empty array/object if user is not in local storage', async () => {
      global.window.localStorage.setItem('__user__iducate__', '');
      const user = await dataStore.getUser();
      expect(user).to.be.empty;
    });

    it('returns an empty array/object if user key is not in local storage', async () => {
      const user = await dataStore.getUser();
      expect(user).to.be.empty;
    });
  });

  describe('Save and load education from localstorage', () => {
    const mockedEducations = [
      {
        id: 0,
        schoolName: 'Bauhaus Universitaet Weimar',
        degree: 'masters',
        fieldOfStudy: 'IT',
        grade: '70%',
        fromDate: moment('20011001').toString(),
        toDate: moment('20080830').toString(),
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et jus',
      },
      {
        id: 1,
        schoolName: 'Technische Oberschule Ulm',
        degree: 'highschool',
        fieldOfStudy: '',
        grade: '2,8',
        fromDate: moment('19991001').toString(),
        toDate: moment('20010630').toString(),
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et jus',
      },
    ];

    beforeEach(() => {
      global.window.localStorage.setItem('__educations__iducate__', JSON.stringify(mockedEducations));
    });

    afterEach(() => {
      global.window.localStorage.clear();
    });

    it('returns a list of education items from the storage', async () => {
      const educations = await dataStore.getEducations();
      expect(educations).to.deep.equal(mockedEducations);
    });

    it('adds a new education to the educations list', async () => {
      const edu = {
        id: 2,
        schoolName: 'Fraunhofer Institut',
        degree: 'phd',
        fieldOfStudy: 'Virtual Reality Systems',
        grade: '2,2',
        fromDate: moment('20101001').toString(),
        toDate: moment('20120630').toString(),
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et jus',
      };

      await dataStore.addEducation(edu);
      const educations = await dataStore.getEducations();
      expect(educations.length).equal(3);
    });

    it('does not add anything if id already existst', async () => {
      const edu = {
        id: 1,
        schoolName: 'Fraunhofer Institut',
        degree: 'phd',
        fieldOfStudy: 'Virtual Reality Systems',
        grade: '2,2',
        fromDate: moment('20101001').toString(),
        toDate: moment('20120630').toString(),
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et jus',
      };

      await dataStore.addEducation(edu);
      const educations = await dataStore.getEducations();
      expect(educations).to.deep.equal(mockedEducations);
    });
  });
});
