import sinon from 'sinon';
import { expect } from 'chai';
import dataProvider from '../';

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
      const courses = dataProvider.getCourses();
      return courses.then((courseList) => {
        expect(courseList).to.be.an('Array');
      });
    });

    it('returns data from local storage', () => {
      global.window.localStorage.setItem('__courses__iducate__', JSON.stringify([mockedCourseList[0]]));
      const courses = dataProvider.getCourses();
      return courses.then((courseList) => {
        expect(courseList[0].id).equal('66666');
      });
    });

    it('saves data to the localStorage', async () => {
      await dataProvider.saveCourse(mockedCourseList[0].id);
      const courseList = await dataProvider.getCourses();
      expect(courseList[0]).equal('66666');
    });

    it('appends data to the localStorage', async () => {
      await dataProvider.saveCourse(mockedCourseList[0].id);
      await dataProvider.saveCourse(mockedCourseList[1].id);
      await dataProvider.saveCourse(mockedCourseList[2].id);
      const courses = await dataProvider.getCourses();
      expect(courses.length).equal(3);
      expect(courses[0]).equal('66666');
      expect(courses[1]).equal('ud1016');
      expect(courses[2]).equal('ud1014');
      await dataProvider.removeCourse('ud1016');
      const newCourses = await dataProvider.getCourses();
      expect(newCourses.length).equal(2);
    });

    it('only adds an id to the storage if it does not already exist', async () => {
      await dataProvider.saveCourse(mockedCourseList[0].id);
      await dataProvider.saveCourse(mockedCourseList[0].id);
      const courses = await dataProvider.getCourses();
      expect(courses.length).equal(1);
      expect(courses[0]).equal('66666');
    });
  });
});
