import R from 'ramda';
import CryptoJS from 'crypto-js';
import utilities from '../utilities';
import uuidV4 from 'uuid/v4';

const coursesStorageKey = '__courses__iducate__';
const userStorageKey = '__user__iducate__';
const educationsStorageKey = '__educations__iducate__';
const skillsStorageKey = '__skills__iducate__';
const loginStorageKey = '__login__iducate__';
const positionsStorageKey = '__positions__iducate__';

const secretKey = 'very Secret Key';

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

const deleteUser = async () => {
  const storage = await getStorage();
  storage.removeItem(userStorageKey);
};

const handleCourse = async (id, prop) => {
  const courseList = await getCourses();
  const existingCourse = R.find(R.propEq('id', id))(courseList);
  const resetedCourse = { taken: false, toTake: false };
  if (R.isNil(existingCourse)) {
    const newCourse = R.merge(resetedCourse, { id, [prop]: true });
    courseList.push(newCourse);
  } else {
    const newList = R.map(
      course => (course.id === id
        ? R.mergeAll([course, resetedCourse, { [prop]: true }])
        : course), courseList);
    replaceData(coursesStorageKey, newList);
    return newList;
  }
  replaceData(coursesStorageKey, courseList);
  return courseList;
};

const courseTaken = async id => handleCourse(id, 'taken');

const courseToTake = async id => handleCourse(id, 'toTake');

const resetCourse = async (id) => {
  const courseList = await getCourses();
  const courseToRemove = course => course.id === id;
  const newCourseList = R.reject(courseToRemove, courseList);
  replaceData(coursesStorageKey, newCourseList);
  return newCourseList;
};

const getEducations = async () => {
  const educations = await getData(educationsStorageKey);
  return educations;
};

const getLatestEducation = async (educations) => {
  const sortByDate = R.sortBy(R.prop('toDate'));
  const latest = R.takeLast(1, sortByDate(educations));
  if (R.isEmpty(latest)) return {};
  return latest[0];
};

const newOrUpdateEducation = async (education) => {
  const educationList = await getEducations();
  const educationExists = R.propEq('id', education.id);
  const existingEducation = R.find(educationExists)(educationList);
  if (R.isNil(existingEducation)) {
    educationList.push(education);
    replaceData(educationsStorageKey, educationList);
    return educationList;
  }

  const updateEducation = (edu =>
    edu.id === existingEducation.id ? R.merge(existingEducation, education) : edu);

  const newEducationList = R.map(updateEducation, educationList);
  replaceData(educationsStorageKey, newEducationList);
  return newEducationList;
};

const deleteEducation = async (id) => {
  const educationList = await getEducations();
  const matchEducation = edu => edu.id !== id;
  const newList = R.filter(matchEducation, educationList);
  replaceData(educationsStorageKey, newList);
  return newList;
};

const getSkills = async () => {
  const skills = await getData(skillsStorageKey);
  return skills;
};

const deleteSkill = async (skillToDelete) => {
  const skillList = await getSkills();
  const index = R.indexOf(skillToDelete, skillList);
  const updatedSkillList = R.remove(index, 1, skillList);
  replaceData(skillsStorageKey, updatedSkillList);
  return updatedSkillList;
};

const addSkill = async (skill) => {
  const skillList = await getSkills();
  const newSkillsList = R.insert(skillList.length, skill, skillList);
  replaceData(skillsStorageKey, newSkillsList);
  return newSkillsList;
};

const loginUser = async (credentials, secret = secretKey) => {
  const storage = await getStorage();
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(credentials), secret);
  storage.setItem(loginStorageKey, encrypted);
};

const getLoginData = async (secret = secretKey) => {
  const storage = await getStorage();
  const encrypted = storage.getItem(loginStorageKey);
  if (R.isEmpty(encrypted) || R.isNil(encrypted)) return [];
  const bytes = CryptoJS.AES.decrypt(encrypted.toString(), secret);
  const decryptedLoginData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedLoginData;
};

const deleteLoginData = async () => {
  const storage = await getStorage();
  storage.removeItem(loginStorageKey);
};

const getPositions = async () => getData(positionsStorageKey);

const newOrUpdatePosition = async (position) => {
  const positions = await getPositions();
  const foundPos = R.find(R.propEq('id', position.id), positions);
  let newList = [];
  if (R.isNil(foundPos)) {
    const positionWithId = R.assoc('id', uuidV4(), position);
    newList = R.append(positionWithId, positions);
    replaceData(positionsStorageKey, newList);
  } else {
    newList = R.reject(pos => pos.id === foundPos.id, positions);
    const updatedPos = R.merge(foundPos, position);
    newList = R.append(updatedPos, newList);
    replaceData(positionsStorageKey, newList);
  }
  return newList;
};

const deletePosition = async (id) => {
  const positions = await getPositions();
  const newPositionList = R.reject(pos => pos.id === id, positions);
  replaceData(positionsStorageKey, newPositionList);
  return newPositionList;
};

export default {
  getUser,
  newOrUpdateUser,
  deleteUser,
  getCourses,
  courseTaken,
  resetCourse,
  courseToTake,
  getEducations,
  getLatestEducation,
  newOrUpdateEducation,
  deleteEducation,
  getSkills,
  deleteSkill,
  addSkill,
  loginUser,
  getLoginData,
  deleteLoginData,
  getPositions,
  newOrUpdatePosition,
  deletePosition,
};
