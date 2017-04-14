import courses from './courses';
import providers from './providers';
import users from './users';

const getCourses = () => courses;
const getProviders = () => providers;
const getUsers = () => users;

export default {
  getCourses,
  getProviders,
  getUsers,
};
