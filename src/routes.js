import CoursePage from './container/CoursePage';
import SettingsPage from './container/SettingsPage';
import LoginPage from './container/LoginPage';
import SignOutPage from './container/SignOutPage';
import SurveyPage from './container/SurveyPage';
import CategoriesPage from './container/CategoriesPage';
import Main from './container/Main';

export default [
  {
    name: 'home',
    title: 'Iducate Prototype',
    path: '/',
    component: Main,
    type: 'logo',
    public: false,
    propsIds: [],
  },
  {
    name: 'categories',
    title: 'Categories',
    path: '/categories',
    component: CategoriesPage,
    type: 'navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'courses',
    title: 'Courses',
    path: '/courses',
    component: CoursePage,
    type: 'navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'settings',
    title: 'Settings',
    path: '/settings',
    component: SettingsPage,
    type: 'vertical-navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'survey',
    title: 'Survey',
    path: '/survey',
    component: SurveyPage,
    type: 'navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'signout',
    title: 'Signout',
    path: '/signout',
    component: SignOutPage,
    type: 'vertical-navigation',
    public: false,
    propsIds: [],
  },
  {
    name: 'login',
    title: 'Login',
    path: '/login',
    component: LoginPage,
    type: 'vertical-navigation',
    public: true,
    propsIds: [],
  },
];
