const KEY = "localKey";

const LocalStoreCheck = () => {
  let check = localStorage.getItem(KEY);
  return check;
};

export default LocalStoreCheck;
