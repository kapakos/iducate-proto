import R from 'ramda';
import utilities from '../utilities';

const coursesStorageKey = '__courses__iducate__';
const userStorageKey = '__user__iducate__';
const educationsStorageKey = '__educations__iducate__';

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

const replaceData = async (key, data) => {
  const storage = await getStorage();
  storage.setItem(key, JSON.stringify(data));
};

const getCourses = async () => {
  const courses = await getData(coursesStorageKey);
  return courses;
};

const getUser = async () => {
  const user = await getData(userStorageKey);
  return user;
};

const newOrUpdateUser = async (user) => {
  replaceData(userStorageKey, user);
};

const saveCourse = async (id) => {
  const courseList = await getCourses();
  if (courseList.indexOf(id) === -1) {
    courseList.push(id);
    replaceData(coursesStorageKey, courseList);
  }
};

const removeCourse = async (id) => {
  const courseList = await getCourses();
  const newCourseList = R.without([id], courseList);
  replaceData(coursesStorageKey, newCourseList);
};

const getEducations = async () => {
  const educations = await getData(educationsStorageKey);
  return educations;
};

const addEducation = async (education) => {
  const educationList = await getEducations();
  const educationExists = R.propEq('id', education.id);
  const existingEducation = R.find(educationExists)(educationList);
  if (R.isNil(existingEducation)) {
    educationList.push(education);
    replaceData(educationsStorageKey, educationList);
  }
};

export default {
  getUser,
  newOrUpdateUser,
  getCourses,
  saveCourse,
  removeCourse,
  getEducations,
  addEducation,
};
