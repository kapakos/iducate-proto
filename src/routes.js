import DashboardPage from 'container/DashboardPage';
import CoursesPage from 'container/CoursesPage';
import Main from 'container/Main';

export default [
  {
    name: 'home',
    title: 'Iducate Prototype',
    path: '/',
    component: Main,
  },
  {
    name: 'courses',
    title: 'Courses',
    path: '/courses',
    component: CoursesPage,
  },
  {
    name: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    component: DashboardPage,
  },
];
