import request from '~/service'

const newsList = async (store, params) => {
  return await request.post('/news/list', params,true)
};
const newsDetail = async (store, params) => {
  return await request.post('/news/detail/' + params.id)
};
const getConfig = async (store) => {
  return await request.post('/config')
};
const home = async (store) => {
  return await request.post('/home')
};
//用户协议
const protocol = async (store) => {
  return await request.post('/protocol')
};
//注册协议
const register_protocols = async (store,params) => {
  return await request.post('/register_protocols',params)
};
//支付协议 /pay_protocol
const pay_protocol = async(store,params) => {
  return await request.post('/pay_protocol', params)
}
const toRegister = async (store, params) => {
  return await request.post('/user/register', params, true)
};
const checkRegId = async (store, params) => {
  return await request.post('/user/register/checkRegId', params)
};
const completeRegister = async (store, params) => {
  return await request.post('/user/register/complete', params, true)
};
const completeInfo = async (store, params) => {
  return await request.post('/user/complete', params, true)
};
const toLogin = async (store, params) => {
  return await request.post('/user/login', params, true)
};
const logout = async (store, params) => {
  return await request.post('/user/logout', params, true)
};

// 发送验证码
const sendLoginCode = async (store, params) => {
  return await request.post('/user/sendcode', params, true)
};

// 找回密码
const findpwd = async (store, params) => {
  return await request.post('/user/findpwd', params, true)
};
// 找回密码 发送验证码
const sendCodeInForget = async (store, params) => {
  return await request.post('/user/findpwd/send', params, true)
};
const setPassword = async (store, params) => {
  return await request.post('/user/setpwd', params, true)
};

const getUserInfo = async (store, params) => {
  // console.log(request);
  return await request.post('/user/info', params, true)
};
const changeMobile = async (store, params) => {
  return await request.post('/user/changemobile', params, true)
};
const sendMobileCode = async (store, params) => {
  return await request.post('/user/changemobile/send', params, true)
};
const changeEmail = async (store, params) => {
  return await request.post('/user/changeemail', params, true)
};
const sendEmailCode = async (store, params) => {
  return await request.post('/user/changeemail/send', params, true)
};
const changePassword = async (store, params) => {
  return await request.post('/user/changepassword', params, true)
};
// 修改用户信息
const saveInfo = async (store, params) => {
  return await request.post('/user/save', params, true)
};
// 上传头像
const uploadAvatar = async (store, params) => {
  return await request.post('/user/avatar', params, true)
};
// 联系我们
const contactus = async (store, params) => {
  return await request.post('/contactus', params, true)
};

// 线下会谈 大类
const talksCategory = async (store, params) => {
  return await request.post('/advisory/category', params, true)
};
// 线下会谈 小类
const talksList = async (store, params) => {
  return await request.post('/advisory/list', params, true)
};
const talksOrderDown = async (store, params) => {
  return await request.post('/order/advisory', params, true)
};

// 在线会议 大类
const meetingCategory = async (store, params) => {
  return await request.post('/meeting/category', params, true)
};
// 在线会议 小类
const meetingList = async (store, params) => {
  return await request.post('/meeting/list', params, true)
};
const meetingOrderDown = async (store, params) => {
  return await request.post('/order/meeting', params, true)
};

// 在线会议 大类
const questionCategory = async (store, params) => {
  return await request.post('/question/category', params, true)
};
// 在线会议 小类
const questionList = async (store, params) => {
  return await request.post('/question/list', params, true)
};
const questionImgUpload = async (store, params) => {
  return await request.post('/question/upload', params, true)
};
const questionOrderDown = async (store, params) => {
  return await request.post('/order/question', params, true)
};

const officeAddress = async (store, params) => {
  return await request.post('/office/address', params, true)
};
const officeList = async (store, params) => {
  return await request.post('/office/list', params, true)
};
const officeDiscount = async (store, params) => {
  return await request.post('/office/discount', params, true)
};
const officeOrderDown = async (store, params) => {
  return await request.post('/order/office', params, true)
};

const meetingroomAddress = async (store, params) => {
  return await request.post('/meetingroom/address', params, true)
};
const meetingroomList = async (store, params) => {
  return await request.post('/meetingroom/list', params, true)
};
const meetingroomOrderDown = async (store, params) => {
  return await request.post('/order/meetingroom', params, true)
};

const serviceCategory = async (store, params) => {
  return await request.post('/service/category', params, true)
};
const serviceSecond = async (store, params) => {
  return await request.post('/service/second', params, true)
};
const serviceList = async (store, params) => {
  return await request.post('/service/list', params, true)
};
const serviceOrderDown = async (store, params) => {
  return await request.post('/order/service', params, true)
};
const serviceUpload = async (store, params) => {
  return await request.post('/service/upload', params, true)
};
const serviceSubmit = async (store, params) => {
  return await request.post('/order/submit', params, true)
};
//预约订单资料提交 /order/submit
export const orderSubmit = async(store,params) => {
  return await request.post('/order/information_list', params)
}
const activityList = async (store, params) => {
  return await request.post('/activity/list', params, true)
};
const activityDetail = async (store, params) => {
  return await request.post('/activity/detail', params, true)
};
// 发送活动验证码
const activitySend = async (store, params) => {
  return await request.post('/activity/booking/sendsms', params)
};
// 发起活动
const activityBook = async (store, params) => {
  return await request.post('/activity/booking', params)
};
const activityOrderDown = async (store, params) => {
  return await request.post('/order/activity', params, true)
};
//预定首页配置 /book/home
const bookHome = async (store, params) => {
  return await request.post('/book/home', params, true)
};
// 确认订单 / 订单详情
const getOrderDetail = async (store, params) => {
  return await request.post('/order/detail', params, true)
};
const cancelOrder = async (store, params) => {
  return await request.post('/order/cancel', params, true)
};
const orderList = async (store, params) => {
  return await request.post('/order/list', params, true)
};
// 订单评价
const orderEvaluation = async (store, params) => {
  return await request.post('/order/evaluate', params, true)
};
// 评价上传图片
const evaluationUpload = async (store, params) => {
  return await request.post('/evaluate/upload', params, true)
};

const clients = async (store, params) => {
  return await request.post('/clients', params, true)
};
// 会员购买 /order/member
const orderMember = async(store,params) => {
  return await request.post('/order/member', params)
}
//支付成功消息 /pay/message
const payMessage = async(store,params) => {
  return await request.post('/pay/message', params)
}
const userMessage = async (store, params) => {
  return await request.post('/user/message', params, true)
};
//商务会面配置 /book/advisory 二级
const bookAdvisory = async(store,params) => {
  return await request.post('/book/advisory', params)
}
//预约场地配置 /book/space 二级
const bookSpace = async(store,params) => {
  return await request.post('/book/space', params)
}
/*----------------------------订单详情 与 确认订单 公共接口---------------------------------*/
// 订单详情 /order/detail
const orderDetail = async(store,params) => {
  return await request.post('/order/detail', params)
}
// 订单详情 /order/detail
const readmsg = async(store,params) => {
  return await request.post('/order/readmsg', params)
}
//PC微信 支付宝支付 /pay/order
const wechat = async(store,params) => {
  return await request.post('/pay/order', params)
}
// 支付请求是否成功 /pay/reply
const reply = async(store,params) => {
  return await request.post('/pay/reply', params)
}
// 取消订单 /order/detail
const orderCancel = async(store,params) => {
  return await request.post('/order/cancel', params)
}

export {
  newsList, newsDetail,

  getConfig, home,protocol,register_protocols,pay_protocol,completeInfo,

  toRegister, checkRegId, completeRegister, toLogin, logout, sendLoginCode, findpwd, sendCodeInForget, setPassword,

  getUserInfo, changeMobile, sendMobileCode, changeEmail, sendEmailCode, changePassword, saveInfo, uploadAvatar,

  talksCategory, talksList, talksOrderDown,
  meetingCategory, meetingList, meetingOrderDown,
  questionCategory, questionList, questionImgUpload, questionOrderDown,

  officeAddress, officeList, officeDiscount, officeOrderDown,
  meetingroomAddress, meetingroomList,meetingroomOrderDown,

  serviceCategory, serviceSecond, serviceList, serviceOrderDown,
  serviceUpload, serviceSubmit,

  activityList, activityDetail, activityOrderDown,

  getOrderDetail, cancelOrder,

  orderList,

  clients,orderMember,

  userMessage,
  bookHome,
  bookAdvisory,
  bookSpace,
  orderDetail,
  wechat,
  reply,
  orderCancel,
  activitySend,
  activityBook,
  contactus,
  evaluationUpload,
  orderEvaluation,
  payMessage,readmsg
}
