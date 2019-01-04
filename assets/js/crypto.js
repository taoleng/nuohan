// import md5 from 'js-md5'
/**
 * md5加密
 */
export const md5Encrypt = (encryptStr) => {
  md5(encryptStr);
  let hash = md5.create();
  hash.update(encryptStr);
  return hash.hex();
};

/**
 * 加密
 */
export const compile = (code) => {
  if (code == null || code === 'undefined' || code === '') {
    return code;
  }
  code += '';
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
};

/**
 * 解密
 */
export const unCompile = (code) => {
  if (code == null || code === 'undefined' || code === '') {
    return code;
  }
  code += '';
  code = unescape(code);
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
};
