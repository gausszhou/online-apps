// localStorage
let debug = process.env.NODE_ENV != "production";
debug = false;

const get = key => {
  let json = localStorage.getItem(key);
  let result;
  try {
    result = JSON.parse(json);
  } catch (error) {
    result = false;
  }
  return result;
};

const set = (key, data) => {
  let value = JSON.stringify(data);
  if (debug) console.log("[debug] local.set", key, data);
  return localStorage.setItem(key, value);
};

const remove = key => {
  if (debug) console.log("[debug] local.remove", key);
  return localStorage.removeItem(key);
};

const clear = () => {
  if (debug) console.log("[debug] local.clear");
  return localStorage.clear();
};

const local = {
  get,
  set, 
  remove,
  clear
};

export default local;
