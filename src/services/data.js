import R from 'ramda';
import courses from './courses';
import enums from './enums';
import users from './users';
import degrees from './degrees';
import dataStore from '../data/store';
import courseraResponse from './courseraResponse';

const getCourses = () => courses;
const getProviders = () => enums.providers;
const getCourseStates = () => enums.courseStates;
const getUsers = () => users;
const getDegrees = () => degrees;

const getCoursesByFilter = async (allCourses, filterProp) => {
  const savedCourses = await dataStore.getCourses();
  if (R.isNil(savedCourses) || R.isEmpty(savedCourses)) return [];

  const filterSavedCourses = filterProp === 'all'
    ? savedCourses
    : R.filter(c => c[filterProp] === true, savedCourses);


  const pickIdFromsSavedCourses = R.map(R.pick(['id']), filterSavedCourses);


  return R.filter(
   R.compose(R.flip(R.contains)(pickIdFromsSavedCourses), R.pick(['id'])), allCourses);
};

const getTakenCourses = async allCourses => getCoursesByFilter(allCourses, 'taken');

const getToTakeCourses = async allCourses => getCoursesByFilter(allCourses, 'toTake');

const getAllMarkedCourses = async allCourses => getCoursesByFilter(allCourses, 'all');

const mapDegreeIdToDegreeName = (id) => {
  const degreeList = getDegrees();
  return R.find(R.propEq('id', id), degreeList).name;
};

const udadcityData = {
  courses: [],
  degrees: [],
  tracks: [],
};

const courseraData = {
  courses: [],
  categories: [],
};

const getUdacityData = () => {
  if (R.isEmpty(udadcityData.courses)) {
    return fetch('https://www.udacity.com/public-api/v0/courses')
      .then(response => response.json())
      .then((data) => {
        udadcityData.courses = R.uniqBy(c => c.key, data.courses);
        udadcityData.degrees = data.degrees;
        udadcityData.tracks = data.tracks;
        return udadcityData;
      });
  }
  return Promise.resolve(udadcityData);
};

const getCourseraData = () => {
  if (R.isEmpty(courseraData.courses)) {
    courseraData.categories = R.map(R.pick('domainTypes'), courseraResponse.elements);
    courseraData.courses = courseraResponse.elements;
    return courseraData;
  }
  return Promise.resolve(courseraData);
};

export default {
  getCourses,
  getProviders,
  getCourseStates,
  getUsers,
  getDegrees,
  getTakenCourses,
  getToTakeCourses,
  getAllMarkedCourses,
  mapDegreeIdToDegreeName,
  getUdacityData,
  getCourseraData,
};
