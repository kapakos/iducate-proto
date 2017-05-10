import R from 'ramda';
import courses from './courses';
import enums from './enums';
import users from './users';
import degrees from './degrees';
import dataStore from '../data/store';

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
};
