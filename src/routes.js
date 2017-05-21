import CoursePage from './container/CoursePage';
import SettingsPage from './container/SettingsPage';
import LoginPage from './container/LoginPage';
import SignOutPage from './container/SignOutPage';
import CategoriesPage from './container/CategoriesPage';
import Main from './container/Main';

export default [
  {
    name: 'home',
    title: 'Iducate Prototype',
    path: '/',
    component: Main,
    parentComponent: null,
    type: 'logo',
    public: false,
    propsIds: [],
  },
  {
    name: 'categories',
    title: 'Categories',
    path: '/categories',
    component: CategoriesPage,
    parentComponent: null,
    type: 'navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'courses',
    title: 'Courses',
    path: '/courses',
    component: CoursePage,
    parentComponent: null,
    type: 'navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'settings',
    title: 'Settings',
    path: '/settings',
    component: SettingsPage,
    parentComponent: null,
    type: 'vertical-navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'signout',
    title: 'Signout',
    path: '/signout',
    component: SignOutPage,
    parentComponent: null,
    type: 'vertical-navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'login',
    title: 'Login',
    path: '/login',
    component: LoginPage,
    parentComponent: null,
    type: 'vertical-navigation',
    public: true,
    propsIds: [],
  },
];
