import moment from 'moment';
import CryptoJS from 'crypto-js';
import R from 'ramda';
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

    it('returns data from local storage', async () => {
      global.window.localStorage.setItem('__courses__iducate__', JSON.stringify([{ id: '66666', taken: true, toTake: false }]));
      const courses = await dataStore.getCourses();
      expect(courses[0].id).equal('66666');
      expect(courses[0].taken).to.be.true;
      expect(courses[0].toTake).to.be.false;
    });

    it('saves saved course to the localStorage', async () => {
      await dataStore.courseTaken(mockedCourseList[0].id);
      const courseList = await dataStore.getCourses();
      expect(courseList[0].id).equal('66666');
      expect(courseList[0].taken).to.be.true;
    });

    it('appends data to the localStorage', async () => {
      await dataStore.courseTaken(mockedCourseList[0].id);
      await dataStore.courseTaken(mockedCourseList[1].id);
      await dataStore.courseTaken(mockedCourseList[2].id);
      const courses = await dataStore.getCourses();
      expect(courses.length).equal(3);
      expect(courses[0].id).equal('66666');
      expect(courses[1].id).equal('ud1016');
      expect(courses[2].id).equal('ud1014');
    });

    it('only adds an id to the storage if it does not already exist', async () => {
      await dataStore.courseTaken(mockedCourseList[0].id);
      await dataStore.courseTaken(mockedCourseList[0].id);
      const courses = await dataStore.getCourses();
      console.log(courses);
      expect(courses.length).equal(1);
      expect(courses[0].id).equal('66666');
      expect(courses[0].taken).to.be.true;
    });

    it('returns the courses when action is being processed', async () => {
      let courses = await dataStore.courseTaken('66666');
      expect(courses.length).equal(1);
      courses = await dataStore.courseToTake('77777');
      expect(courses.length).equal(2);
    });
  });

  describe('Reserve Courses', () => {
    it('reserves a course and saves it in the localstorage', async () => {
      await dataStore.courseToTake(mockedCourseList[0].id);
      const courses = await dataStore.getCourses();
      expect(courses[0].id).equal('66666');
      expect(courses[0].toTake).to.be.true;
    });

    it('sets taken to false when course is being reserved', async () => {
      await dataStore.courseTaken('66666');
      let courses = await dataStore.getCourses();
      expect(courses[0].id).equal('66666');
      expect(courses[0].taken).to.be.true;
      await dataStore.courseToTake('66666');
      courses = await dataStore.getCourses();
      expect(courses[0].id).equal('66666');
      expect(courses[0].toTake).to.be.true;
      expect(courses[0].taken).to.be.false;
    });

    it('sets reservation to false when course is being set on taken', async () => {
      await dataStore.courseToTake('66666');
      let courses = await dataStore.getCourses();
      expect(courses[0].id).equal('66666');
      expect(courses[0].toTake).to.be.true;
      await dataStore.courseTaken('66666');
      courses = await dataStore.getCourses();
      expect(courses[0].id).equal('66666');
      expect(courses[0].taken).to.be.true;
      expect(courses[0].toTake).to.be.false;
    });
  });

  describe('Remove courses', () => {
    it('removes reserved course when resetted', async () => {
      let courses = await dataStore.courseToTake(mockedCourseList[0].id);
      expect(courses.length).equal(1);
      courses = await dataStore.resetCourse('66666');
      expect(courses.length).equal(0);
    });

    it('returns the remaining saved courses, when course is resetted', async () => {
      await dataStore.courseToTake('66666');
      let courses = await dataStore.courseToTake('77777');
      expect(courses.length).equal(2);
      courses = await dataStore.resetCourse('66666');
      expect(courses.length).equal(1);
      expect(courses[0].id).equal('77777');
    });

    it('leaves courses unchanged if wrong id is passed', async () => {
      await dataStore.courseToTake('66666');
      let courses = await dataStore.courseToTake('77777');
      expect(courses.length).equal(2);
      courses = await dataStore.resetCourse('bla bla');
      expect(courses.length).equal(2);
      expect(courses[0].id).equal('66666');
      expect(courses[1].id).equal('77777');
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

    it('deletes the user from localstorage', async () => {
      global.window.localStorage.setItem('__user__iducate__', JSON.stringify(mockedUser));
      let user = await dataStore.getUser();
      expect(user).to.deep.equal(mockedUser);
      // global.window.localStorage.removeItem('__user__iducate__');
      await dataStore.deleteUser();
      user = await dataStore.getUser();
      expect(user).to.be.empty;
    });
  });

  describe('Educations', () => {
    const mockedEducations = [
      {
        id: 0,
        schoolName: 'Bauhaus Universitaet Weimar',
        degree: 'masters',
        fieldOfStudy: 'IT',
        grade: '70%',
        fromDate: '2001-03-16T05:00:00.000Z',
        toDate: '2008-07-26T04:00:00.000Z',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et jus',
      },
      {
        id: 1,
        schoolName: 'Technische Oberschule Ulm',
        degree: 'highschool',
        fieldOfStudy: '',
        grade: '2,8',
        fromDate: '1999-09-01T04:00:00.000Z',
        toDate: '2001-07-31T04:00:00.000Z',
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

      await dataStore.newOrUpdateEducation(edu);
      const educations = await dataStore.getEducations();
      expect(educations.length).equal(3);
    });

    it('saves the degree ID in the education instance', async () => {
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

      await dataStore.newOrUpdateEducation(edu);
      const educations = await dataStore.getEducations();

      const isPhd = R.propEq('degree', 'phd');
      const isMasters = R.propEq('degree', 'masters');
      const isHishschool = R.propEq('degree', 'highschool');
      const isOfDegree = R.anyPass([isPhd, isMasters, isHishschool]);

      const shouldBeAnId = e => expect(isOfDegree(e)).to.be.true;

      R.forEach(shouldBeAnId, educations);
    });

    it('updates the an existing education', async () => {
      const updatedEducation = {
        id: 1,
        schoolName: 'Technische Oberschule Ulm',
        degree: 'highschool',
        fieldOfStudy: '',
        grade: '2,0',
        fromDate: moment('19991001').toString(),
        toDate: moment('20010630').toString(),
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et jus',
      };
      await dataStore.newOrUpdateEducation(updatedEducation);
      const educations = await dataStore.getEducations();
      expect(educations[1].grade).equal('2,0');
    });

    it('removes an education from the list', async () => {
      const id = 0;
      await dataStore.deleteEducation(id);
      const educations = await dataStore.getEducations();
      expect(educations.length).equals(1);
      expect(educations[0].id).equals(1);
    });

    it('returns the an emprty object if there are no Education objects', async () => {
      const latestEducation = await dataStore.getLatestEducation([]);
      expect(latestEducation).to.be.an('object');
      expect(latestEducation).to.be.emppty;
    });

    it('returns the latest Education', async () => {
      const latestEducation = await dataStore.getLatestEducation(mockedEducations);
      expect(latestEducation.id).equal(0);
    });
  });

  describe('Skills', () => {
    const mockedSkills = ['React.js', 'Web Development', 'Web Design', 'JavaScript', 'Redux', 'Golang'];
    beforeEach(() => {
      global.window.localStorage.setItem('__skills__iducate__', JSON.stringify(mockedSkills));
    });

    afterEach(() => {
      global.window.localStorage.clear();
    });

    it('returns a skills list from the storage', async () => {
      const skills = await dataStore.getSkills();
      expect(skills).to.be.an('array');
      expect(skills.length).equal(6);
      expect(skills).to.deep.equal(mockedSkills);
    });

    it('removes a skill from the list', async () => {
      const skillToDelete = 'Web Design';
      await dataStore.deleteSkill(skillToDelete);
      const newSkillList = await dataStore.getSkills();
      expect(newSkillList.length).equal(5);
      expect(skillToDelete).to.not.be.oneOf(newSkillList);
    });

    it('adds a new skill to the list', async () => {
      const newSkill = 'coding';
      await dataStore.addSkill(newSkill);
      const newList = await dataStore.getSkills();
      expect(newList.length).equal(7);
    });
  });

  describe('Login', () => {
    const credentials = {
      username: 'pkapako',
      password: 'password',
    };

    it('saves the login data to the store', async () => {
      // global.window.localStorage.setItem('__login__iducate__', JSON.stringify(credentials));
      dataStore.loginUser(credentials, 'secret');
      const loginData = await dataStore.getLoginData('secret');
      expect(loginData).to.deep.equal(credentials);
    });

    it('decrypts the login data', async () => {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(credentials), 'some secret key');
      global.window.localStorage.setItem('__login__iducate__', encrypted);
      const loginData = await dataStore.getLoginData('some secret key');
      expect(loginData).to.deep.equal(credentials);
    });

    it('returns an empty array if there is no data stored', async () => {
      const loginData = await dataStore.getLoginData('some secret');
      expect(loginData).to.be.empty;
    });

    it('deletes the login data from storage', async () => {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(credentials), 'some secret key');
      global.window.localStorage.setItem('__login__iducate__', encrypted);
      let loginData = await dataStore.getLoginData('some secret key');
      expect(loginData).to.deep.equal(credentials);
      dataStore.deleteLoginData();
      loginData = await dataStore.getLoginData('some secret key');
      expect(loginData).to.be.empty;
    });
  });

  describe('Positions', () => {
    const mockPosition = [
      {
        id: 0,
        title: 'Software Engineer',
        location: 'Munich',
        fromDate: moment('20140101').toString(),
        toDate: moment('20150202').toString(),
        currentPosition: false,
        description: 'bla bla bla coding bla bla software bla bla computer',
      },
    ];

    const newPos = R.dissoc('id', R.merge(
      R.take(1, mockPosition)[0],
      { title: 'Senior Software Engineer', currentPosition: false, toDate: '' },
      ));

    beforeEach(() => {
      global.window.localStorage.setItem('__positions__iducate__', JSON.stringify(mockPosition));
    });

    afterEach(() => {
      global.window.localStorage.clear();
    });

    it('gets the an empty array when there are no positions in the storage', async () => {
      const positions = await dataStore.getPositions();
      expect(positions).to.be.an('array');
      expect(positions.length).equal(1);
    });

    it('adds a new position object to the local storage', async () => {
      await dataStore.newOrUpdatePosition(newPos);
      const pos = await dataStore.getPositions();
      expect(pos.length).equal(2);
      const newPosition = R.find(R.propEq('title', 'Senior Software Engineer'), pos);
      expect(newPosition).not.be.empty;
    });

    it('adds an id when none is present', async () => {
      await dataStore.newOrUpdatePosition(newPos);
      const positions = await dataStore.getPositions();
      const isNotEmpty = x => !R.isEmpty(x) && !R.isNil(x);
      const pred = R.where({
        id: isNotEmpty,
      });
      const test = (x) => { expect(pred(x)).equal(true); };
      R.forEach(test, positions);
    });

    it('replaces an existing Position', async () => {
      global.window.localStorage.setItem('__positions__iducate__', JSON.stringify(R.append(newPos, mockPosition)));
      let rawPositions = global.window.localStorage.getItem('__positions__iducate__');
      rawPositions = JSON.parse(rawPositions);
      expect(rawPositions.length).equal(2);

      const updatedPosition = R.merge(newPos, { title: 'Principal Software Engineer' });
      await dataStore.newOrUpdatePosition(updatedPosition);
      const positions = await dataStore.getPositions();

      expect(positions.length).equal(2);

      const retrieveUpdatedPos = R.find(R.propEq('title', 'Principal Software Engineer'), positions);
      expect(retrieveUpdatedPos).not.be.empty;
    });

    it('deletes an existing Position', async () => {
      global.window.localStorage.setItem('__positions__iducate__', JSON.stringify(R.append(R.merge(newPos, { id: 1 }), mockPosition)));
      let positions = await dataStore.getPositions();
      expect(positions.length).equal(2);
      await dataStore.deletePosition(1);
      positions = await dataStore.getPositions();
      expect(positions.length).equal(1);
    });

    it('does not modify the positions if position to delete does not exist', async () => {
      await dataStore.deletePosition(5);
      const positions = await dataStore.getPositions();
      expect(positions.length).equal(1);
      expect(positions).to.deep.equal(mockPosition);
    });
  });
});
