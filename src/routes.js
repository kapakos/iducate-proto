import DashboardPage from './container/DashboardPage';
import CoursesPage from './container/CoursesPage';
import SettingsPage from './container/SettingsPage';
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
    name: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    component: DashboardPage,
    type: 'navigation',
  },
  {
    name: 'settings',
    title: 'Settings',
    path: '/settings',
    component: SettingsPage,
    type: 'vertical-navigation',
  },
];
