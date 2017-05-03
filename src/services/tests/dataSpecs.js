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

  const courseIds = ['1', '2', '3'];
  const courses = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }];
  it('returns an array', async () => {
    sandbox.stub(dataStore, 'getCourses').returns(
      Promise.resolve(courseIds),
      );

    const completedCourses = await dataService.getCompletedCourses(courses);
    expect(completedCourses).to.be.an('array');
  });

  it('returns an empty array if no courses are selected', async () => {
    sandbox.stub(dataStore, 'getCourses').returns(
      Promise.resolve(null),
      );

    const completedCourses = await dataService.getCompletedCourses(courses);
    expect(completedCourses).to.be.an('array');
    expect(completedCourses.length).equal(0);
  });

  it('returns only completed courses', async () => {
    sandbox.stub(dataStore, 'getCourses').returns(
      Promise.resolve(courseIds),
      );

    const completedCourses = await dataService.getCompletedCourses(courses);
    expect(completedCourses.length).equal(3);
  });

  describe('Degree Mapping', () => {
    it('maps the degree id to the degree name', () => {
      const degreeName = dataService.mapDegreeIdToDegreeName('masters');
      expect(degreeName).equal('Masters Degree');
    });
  });
});
