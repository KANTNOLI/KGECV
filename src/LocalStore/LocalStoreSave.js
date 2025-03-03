const KEY = "localKey";

const LocalStoreSave = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export default LocalStoreSave;
