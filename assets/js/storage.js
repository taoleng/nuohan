import {compile, unCompile} from './crypto'

// 默认缓存时间，单位分钟
const cacheTime = 60;

let compileFlag = 'NOCOMPILE';
let compileLen = 3000;

function supportsHtml5Sstorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

export const setStore = (key, val, cTime) => {
  if (!supportsHtml5Sstorage) {
    return false;
  }
  if (!key) {
    return false;
  }
  if (cTime !== 0) {
    cTime = cacheTime;
  }
  cTime = cTime * 60 * 1000;

  val = JSON.stringify({val: val, cTime: cTime, time: new Date().getTime()});

  if (process.env.NODE_ENV === 'production') {
    key = compile(key);
    if (val.length < compileLen) {
      val = compile(val)
    } else {
      val += compileFlag;
    }
  }

  try {
    localStorage.setItem(key, val);
  } catch (oException) {
    if (oException.name === 'QuotaExceededError') {
      console.log('超出本地存储限额！');
      // 如果历史信息不重要了，可清空后再设置
      localStorage.clear();
      localStorage.setItem(key, val);
    }
  }
};

export const getStore = (key) => {
  if (!supportsHtml5Sstorage) {
    return false;
  }
  if (!key) {
    return false;
  }
  if (process.env.NODE_ENV === 'production') {
    key = compile(key);
  }
  let val = localStorage.getItem(key);
  if (!val) {
    return null;
  }
  if (process.env.NODE_ENV === 'production') {
    if (val.indexOf(compileFlag) <= -1) {
      val = unCompile(val);
    } else {
      val = (val || '').replace(compileFlag, '');
    }
  }
  val = JSON.parse(val);
  if ((val.exp > 0 && new Date().getTime() - val.time > val.cTime) || val.v !== baseConfig.version) {
    removeStore(key);
    return null;
  }
  return val.val;
};

/**
 * 删除localStorage
 */
export const removeStore = key => {
  if (!supportsHtml5Sstorage) {
    return false;
  }
  if (!key) {
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    key = compile(key);
  }
  window.localStorage.removeItem(key);
};


