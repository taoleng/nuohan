// 默认一个天
const cacheTime = 1;

let domainName = '';
if (process.browser) {
  domainName = window.document.domain;
}
domainName = domainName.substring(domainName.indexOf('.') + 1);

export const setCookie = (key, val, cTime) => {
  if (!navigator.cookieEnabled) {
    return false;
  }
  if (!key) {
    return false;
  }
  if (cTime === 0) {
    cTime = cacheTime;
  }

  let time = new Date();
  // cTime * 24 * 60 * 60 * 1000
  time.setTime(time.getTime() + (cTime * 24 * 60 * 60 * 1000));
  let expires = 'expires=' + time.toGMTString();
  let domain = 'domain=' + domainName;

  // if (process.env.NODE_ENV === 'production') {
    window.document.cookie = key + '=' + val + '; ' + expires + '; ' + domain + '; path=/';
  // } else {
  //   window.document.cookie = key + '=' + val + '; ' + expires + '; path=/';
  // }
};

export const getCookie = key => {
  if (!navigator.cookieEnabled) {
    return false;
  }
  if (!key) {
    return false;
  }
  let name = key + '=';
  let item = window.document.cookie.split(';');
  for (let i = 0; i < item.length; i++) {
    let c = item[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
};

export const removeCookie = key => {
  let domain = 'domain=' + domainName;
  // if (!navigator.cookieEnabled) {
  //   return false;
  // }
  // if (!key) {
  //   return false;
  // }
  // if (process.env.NODE_ENV === 'production') {
    window.document.cookie = key + '=;' + domain + ';expires='+(new Date(0)).toGMTString();
  // } else {
  //   window.document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  // }
};
