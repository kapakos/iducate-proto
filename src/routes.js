import CoursesPage from './container/CoursesPage';
import SettingsPage from './container/SettingsPage';
import LoginPage from './container/LoginPage';
import SignOutPage from './container/SignOutPage';
import Main from './container/Main';

export default [
  {
    name: 'home',
    title: 'Iducate Prototype',
    path: '/',
    component: Main,
    type: 'logo',
    public: false,
  },
  {
    name: 'courses',
    title: 'Courses',
    path: '/courses',
    component: CoursesPage,
    type: 'navigation',
    public: false,
  },
  {
    name: 'settings',
    title: 'Settings',
    path: '/settings',
    component: SettingsPage,
    type: 'vertical-navigation',
    public: false,
  },
  {
    name: 'signout',
    title: 'Signout',
    path: '/signout',
    component: SignOutPage,
    type: 'vertical-navigation',
    public: false,
  },
  {
    name: 'login',
    title: 'Login',
    path: '/login',
    component: LoginPage,
    type: 'vertical-navigation',
    public: true,
  },
];
