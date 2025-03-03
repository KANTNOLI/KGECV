const KEY = "localKey";

const LocalStoreGet = () => {
  let data = localStorage.getItem(KEY);
  return JSON.parse(data)
};

export default LocalStoreGet;
