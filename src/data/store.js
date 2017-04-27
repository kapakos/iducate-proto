import R from 'ramda';
import CryptoJS from 'crypto-js';
import utilities from '../utilities';

const coursesStorageKey = '__courses__iducate__';
const userStorageKey = '__user__iducate__';
const educationsStorageKey = '__educations__iducate__';
const skillsStorageKey = '__skills__iducate__';
const loginStorageKey = '__login__iducate__';

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

const newOrUpdateEducation = async (education) => {
  const educationList = await getEducations();
  const educationExists = R.propEq('id', education.id);
  const existingEducation = R.find(educationExists)(educationList);
  if (R.isNil(existingEducation)) {
    educationList.push(education);
    replaceData(educationsStorageKey, educationList);
    return educationList;
  }

  const newEducationList = R.map(
      edu => edu.id === existingEducation.id
      ? R.merge(existingEducation, education)
      : edu, educationList);
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

export default {
  getUser,
  newOrUpdateUser,
  deleteUser,
  getCourses,
  saveCourse,
  removeCourse,
  getEducations,
  newOrUpdateEducation,
  deleteEducation,
  getSkills,
  deleteSkill,
  addSkill,
  loginUser,
  getLoginData,
  deleteLoginData,
};
