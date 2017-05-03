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

const getCompletedCourses = async (allCourses) => {
  const courseIds = await dataStore.getCourses();
  if (R.isNil(courseIds) || R.isEmpty(courseIds)) return [];
  return R.filter(course => courseIds.indexOf(course.id) > -1, allCourses);
};

const mapDegreeIdToDegreeName = (id) => {
  const degreeList = getDegrees();
  return R.find(R.propEq('id', id), degreeList).name;
};

export default {
  getCourses,
  getProviders,
  getUsers,
  getDegrees,
  getCompletedCourses,
  mapDegreeIdToDegreeName,
};
