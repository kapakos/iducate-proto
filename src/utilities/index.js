const isStorageAvailable = (type) => {
  try {
    const storage = global.window[type];
    const x = '__storagetest__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  isStorageAvailable,
};
