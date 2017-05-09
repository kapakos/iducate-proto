import R from 'ramda';
import dataService from '../data';
import dataStore from '../../data/store';

global.window = {};
global.window.localStorage = localStorage;


describe('Data provider', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
    localStorage.clear();
    localStorage.itemInsertionCallback = null;
  });

  const coursesSavedInStorage = [
    { id: '1', taken: true, toTake: false },
    { id: '2', taken: false, toTake: true },
    { id: '3', taken: true, toTake: false },
  ];

  const allCoursesFromApi = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }];
  it('returns an array', async () => {
    sandbox.stub(dataStore, 'getCourses').returns(
      Promise.resolve(coursesSavedInStorage),
      );

    const completedCourses = await dataService.getTakenCourses(allCoursesFromApi);
    expect(completedCourses).to.be.an('array');
  });

  it('returns an empty array if no courses are selected', async () => {
    sandbox.stub(dataStore, 'getCourses').returns(
      Promise.resolve(null),
      );

    const completedCourses = await dataService.getTakenCourses(allCoursesFromApi);
    expect(completedCourses).to.be.an('array');
    expect(completedCourses.length).equal(0);
  });

  it('returns only completed courses', async () => {
    sandbox.stub(dataStore, 'getCourses').returns(
      Promise.resolve(coursesSavedInStorage),
      );

    const completedCourses = await dataService.getTakenCourses(allCoursesFromApi);
    expect(completedCourses.length).equal(2);
    expect(completedCourses).deep.equal([{ id: '1' }, { id: '3' }]);
  });

  it('returns only courses to take', async () => {
    sandbox.stub(dataStore, 'getCourses').returns(
      Promise.resolve(coursesSavedInStorage),
      );
    const coursesToTake = await dataService.getToTakeCourses(allCoursesFromApi);
    expect(coursesToTake.length).equal(1);
  });

  describe('Degree Mapping', () => {
    it('maps the degree id to the degree name', () => {
      const degreeName = dataService.mapDegreeIdToDegreeName('masters');
      expect(degreeName).equal('Masters Degree');
    });
  });
});
