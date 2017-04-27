import CoursesPage from './container/CoursesPage';
import SettingsPage from './container/SettingsPage';
import LoginPage from './container/LoginPage';
import Main from './container/Main';

export default [
  {
    name: 'home',
    title: 'Iducate Prototype',
    path: '/',
    component: Main,
    type: 'logo',
  },
  {
    name: 'courses',
    title: 'Courses',
    path: '/courses',
    component: CoursesPage,
    type: 'navigation',
  },
  {
    name: 'settings',
    title: 'Settings',
    path: '/settings',
    component: SettingsPage,
    type: 'vertical-navigation',
  },
  {
    name: 'login',
    title: 'Login',
    path: '/login',
    component: LoginPage,
    type: 'vertical-navigation',
  },
];
