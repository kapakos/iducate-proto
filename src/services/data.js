import R from 'ramda';
import courses from './courses';
import providers from './providers';
import users from './users';
import degrees from './degrees';
import dataStore from '../data/store';

const getCourses = () => courses;
const getProviders = () => providers;
const getUsers = () => users;
const getDegrees = () => degrees;

const getCoursesByFilter = async (allCourses, filterProp) => {
  const savedCourses = await dataStore.getCourses();
  if (R.isNil(savedCourses) || R.isEmpty(savedCourses)) return [];

  const filterTakenCourses = R.filter(c => c[filterProp] === true, savedCourses);
  const pickIdFromsTakenCourses = R.map(R.pick(['id']), filterTakenCourses);

  return R.filter(
   R.compose(R.flip(R.contains)(pickIdFromsTakenCourses), R.pick(['id'])),
         allCourses);
};

const getTakenCourses = async allCourses => getCoursesByFilter(allCourses, 'taken');

const getToTakeCourses = async allCourses => getCoursesByFilter(allCourses, 'toTake');

const mapDegreeIdToDegreeName = (id) => {
  const degreeList = getDegrees();
  return R.find(R.propEq('id', id), degreeList).name;
};

export default {
  getCourses,
  getProviders,
  getUsers,
  getDegrees,
  getTakenCourses,
  getToTakeCourses,
  mapDegreeIdToDegreeName,
};
