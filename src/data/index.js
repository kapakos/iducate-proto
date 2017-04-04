import R from 'ramda';
import utilities from '../utilities';

const storageKey = '__courses__iducate__';

const getStorage = () => new Promise((resolve, reject) => {
  if (utilities.isStorageAvailable('localStorage')) {
    resolve(global.window.localStorage);
  } else {
    reject('localStorage not available');
  }
});

const getCourses = async () => {
  const storage = await getStorage();
  const storedCourses = storage.getItem(storageKey);
  if (!R.isNil(storedCourses) && !R.isEmpty(storedCourses)) {
    return JSON.parse(storedCourses);
  }
  return [];
};

const saveCourse = async (id) => {
  const courseList = await getCourses();
  const storage = await getStorage();
  if(courseList.indexOf(id) === -1){
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
  getCourses,
  saveCourse,
  removeCourse,
};
