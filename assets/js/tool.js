import {Indicator, Toast, MessageBox} from "mint-ui";

function isPhone(val) {
  return val.length > 4 && /^[\d]+$/.test(val);
}
function isEmail(val) {
  // eslint-disable-next-line
  return val.length > 6 && /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(val);
}
function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}
function toast(text,time) {
  var time = time || 1500
  if (text) {
    Toast({message: text, position: 'middle',duration:time});
  }
}
function loadingShow() {
  Indicator.open({spinnerType: 'fading-circle'});
}
function loadingHide() {
  Indicator.close();
}
function messageBox(text) {
  if (text) {
    MessageBox('提示', text);
  }
}
//判断对象是否为空值
function empty_obj(obj){
  var key;
  for(key in obj){
    return false ;
  }
  return true
}

// 时间对象转换为整点
function _filterToWholePoint(date) {
  if (!date) return '';
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
  // return new Date(date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours());
}

// 时间对象转换成时间字符串
function _filterDateString(date) {
  // 根据时间戳生成的时间对象
  if (!date) return '';
  let d = _filterToWholePoint(date);
  let result = (d.getFullYear()) + '-' +
    (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' +
    (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' +
    (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' +
    (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
    // (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  return result;
}


function towString(m) {
  return m < 10 ? "0" + m : m;
}

function isDate(obj){
  return Object.prototype.toString.call(obj) === '[object Date]';
}

/**
 * 处理时间
 */
function getDateInfo(obj) {
  if (!obj) {
    obj = {};
  }
  if (typeof(obj) == "string") {
    obj = {date: obj};
  }
  var def = {
    sign: "-",
    date: "",
    format: "yyyy-mm-dd",
    w: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    wa: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    d: ["前天", "昨天", "今天", "明天", "后天"],
    o: ["年", "月", "日"]
  };

  Object.assign(def, obj);

  if (def.date && !isDate(def.date)) {
    def.date = (def.date+"").replace("T", " ");
    def.date = (def.date+"").replace(/\.\d{3}\+\d{4}/, "");
  }
  def.date = (def.date+"").replace(/-/g,"/");
  if (def.date && (/\d{10}/g).test(def.date)) {
    def.date = parseInt(def.date + "", 10);
  }
  var d = def.date ? (new Date(def.date)) : (new Date());
  if (d == "Invalid Date") {
    d = new Date();
  }
  var y = d.getFullYear();
  var m = towString(d.getMonth() + 1);
  var dd = towString(d.getDate());

  var h = towString(d.getHours());
  var mm = towString(d.getMinutes());
  var s = towString(d.getSeconds());

  var week = d.getDay();
  var thisTime = d.getTime();

  var returnObj = {};
  returnObj.day = dd;
  returnObj.date = y + def.sign + m + def.sign + dd;
  returnObj.dateCN = y + def.o[0] + m + def.o[1] + dd + def.o[2];
  returnObj.dateAbbCN = m + def.o[1] + dd + def.o[2];
  returnObj.dateAbb = m + def.sign + dd;
  returnObj.dateMonthCN = y + def.o[0] + m + def.o[1];
  returnObj.time = h + ":" + mm + ":" + s;
  returnObj.shortTime = h + ":" + mm;
  returnObj.week = def.w[week];
  returnObj.weekAbb = def.wa[week];
  returnObj.weekNum = week;
  returnObj.millisecond = thisTime;


  var nowD = new Date();
  nowD.setHours(0);
  nowD.setMinutes(0);
  nowD.setSeconds(0);
  var nowT = (nowD).getTime();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  var thisT = d.getTime();
  var iDays = Math.ceil((thisT - nowT) / 1000 / 60 / 60 / 24);
  if (iDays >= -2 && iDays <= 2) {
    returnObj.weekAbb = def.d[iDays + 2];
  }

  return returnObj;
}

/**
 * 强制转换成数字
 */
function getParseInt(n) {
  n = Number(n);
  n = isNaN(parseInt(n, 10)) ? 0 : n;
  return n;
}

/**
 * 增加N天
 */
function addDate(n, date) {
  var d = date ? (new Date((date + "").replace(/-/g, "/"))) : (new Date());

  var thisTime = d.getTime();
  var addTime = getParseInt(n) * 24 * 60 * 60 * 1000;
  return getDateInfo({date: new Date(thisTime + addTime)}).dateCN;
}

// 订单类型
function typeFormat(val) {
  // 订单类型，1-办公室，2会议室，3线下会谈，4在线会议，5问题，6预约服务，7预约活动
  let result = '';
  switch(val) {
    case 1:
      result = '办公室';
      break;
    case 2:
      result = '会议室';
      break;
    case 3:
      result = '商务会谈';
      break;
    case 4:
      result = '在线会议';
      break;
    case 5:
      result = '问题';
      break;
    case 6:
      result = '预约服务';
      break;
    case 7:
      result = '预约活动';
      break;
  }
  return result;
}
// 订单类型
function stateFormat(val) {
  // 订单状态：0待支付，1待审核，2已审核，3进行中，4待评价，5已完成，6已取消
  let result = '';
  switch(val) {
    case 0:
      result = '待支付';
      break;
    case 1:
      result = '待审核';
      break;
    case 2:
      result = '已审核';
      break;
    case 3:
      result = '进行中';
      break;
    case 4:
      result = '待评价';
      break;
    case 5:
      result = '已完成';
      break;
    case 6:
      result = '已取消';
      break;
    case 7:
      result = '取消中';
      break;
  }
  return result;
}
// 新开open
function windOpen(url) {
  var a = document.createElement('a');
  a.href = url;
  a.target="_Blank"
  a.click()
}
export {
  isPhone,
  isEmail,
  toast,
  loadingShow,
  loadingHide,
  messageBox,
  _filterToWholePoint,
  _filterDateString,
  getDateInfo,
  addDate,
  typeFormat,
  stateFormat,
  empty_obj,
  windOpen,
  is_weixn
}
