import R from 'ramda';
import utilities from '../utilities';

const storageKey = '__courses__iducate__';
const userStorageKey = '__user__iducate__';

const getStorage = () => new Promise((resolve, reject) => {
  if (utilities.isStorageAvailable('localStorage')) {
    resolve(global.window.localStorage);
  } else {
    reject('localStorage not available');
  }
});

const getData = async (key) => {
  const storage = await getStorage();
  const storedData = storage.getItem(key);
  if (!R.isNil(storedData) && !R.isEmpty(storedData)) {
    return JSON.parse(storedData);
  }
  return [];
};

const getCourses = async () => {
  const courses = await getData(storageKey);
  return courses;
};

const getUser = async () => {
  const user = await getData(userStorageKey);
  return user;
};

const newOrUpdateUser = async (user) => {
  const storage = await getStorage();
  storage.setItem(userStorageKey, JSON.stringify(user));
};

const saveCourse = async (id) => {
  const courseList = await getCourses();
  const storage = await getStorage();
  if (courseList.indexOf(id) === -1) {
    courseList.push(id);
    storage.setItem(storageKey, JSON.stringify(courseList));
  }
};

const removeCourse = async (id) => {
  const courseList = await getCourses();
  const storage = await getStorage();
  const newCourseList = R.without([id], courseList);
  storage.setItem(storageKey, JSON.stringify(newCourseList));
};

export default {
  getUser,
  newOrUpdateUser,
  getCourses,
  saveCourse,
  removeCourse,
};
