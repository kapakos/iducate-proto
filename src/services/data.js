import courses from '../data/courses';
import providers from '../data/providers';
import users from '../data/users';

const getCourses = () => courses;
const getProviders = () => providers;
const getUsers = () => users;

export default {
  getCourses,
  getProviders,
  getUsers,
};
