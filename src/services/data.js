import courses from './courses';
import providers from './providers';
import users from './users';
import degrees from './degrees';

const getCourses = () => courses;
const getProviders = () => providers;
const getUsers = () => users;
const getDegrees = () => degrees;

export default {
  getCourses,
  getProviders,
  getUsers,
  getDegrees,
};
