import {setCookie, getCookie, removeCookie} from '../assets/js/cookie';
import { windOpen,is_weixn,toast} from '../assets/js/tool';
import {_filterDateString} from '~/assets/js/filter';
import {wechat, reply, orderCancel, personinfo,getUserInfo} from './actions'
import * as key from './dataKey';

function mutationGetStore(key, state, filed) {
  let info = getStore(key);
  if (info) {
    state[filed] = info;
  }
}

function mutationGetCookie(key, state, filed) {
  let info = getCookie(key);
  if (info) {
    state[filed] = info;
  }
}

export function IS_MENU_SHOW(state, bool) {
  state.menuShow = bool !== false;
}

export function IS_THEME_COLOR(state, bool) {
  state.themeColor = bool !== false;
}

export function SET_HOME_PAGE_INDEX(state, num) {
  state.homePageIndex = num;
}

export function SET_CONFIG(state, obj) {
  state.config = obj || {};
}
export function REMOVE_TOKEN(state, token) {
  removeCookie(key.authToken);
  state.userInfo = {};
}
// token
export function SET_TOKEN(state, token) {
  if (token) {
    setCookie(key.authToken, token, 1);
  } else {
    setCookie(key.authToken, '', 1);
  }
  state.token = token;
}

export function GET_TOKEN(state) {
  mutationGetCookie(key.authToken, state, 'token');
}

export function SET_LOGIN_STATE(state, bool) {
  state.hasLogin = bool || false;
}

export function SET_USER_INFO(state, obj) {
  state.userInfo = obj || {};
}
// 微信 支付宝 支付成功判断接口
export function payPcIsEd(state, obj, fun) {
  //obj.order_id 订单ID
  reply(state, obj).then((res) => {
    if (res.status === 'ok') {
      fun && fun();
    }
  })
}
// // lang
export function SET_LANG(state, lang) {
  if (lang) {
    setCookie(key.lang, lang,2);
    state.lang = lang;
  }
}
export function orderCancelCommon(state, obj) {
  var _this = obj._this;
  var str = obj.str;
  var obj1 = {
    order_id: obj.order_id
  }
  orderCancel(state, obj1).then((res) => {
    if (res.status === 'error') {
      return false;
    }
    if (!_this.$route.query.user) {
      if (str === 'activity') {
        //  活动跳列表
        this.$router.push({
          path: '/book/activity'
        })
      } else {
        // 跳预约页面
        if (str === 'talks' || str === 'meeting' || str === 'question') {
          //  跳转
          this.$router.push({
            path: '/book/appt/consult',
            query: {
              t: str
            }
          })
        } else if (str === 'office' || str === 'room') {
          this.$router.push({
            path: '/book/appt/field',
            query: {
              t: str
            }
          })
        } else {
          //  跳转
          this.$router.push({
            path: '/book/appt/' + str
          })
        }
      }
    }
  })
}
// 微信 支付宝 支付
export function payPc(state, obj) {
  // obj 对象
  /*
  * @ _this VUE页面对象
  * @type 支付方式 1 微信 2 支付宝 3papel
  * @order_id 订单号
  * @fun 支付成功之后执行的回调函数
  * */

  var _this = obj._this;
  if(is_weixn()){
    toast(_this.$t('lang.common.wxsilde'));
    return
  };
  var pjson = {
    id: _this.orderData.order_id,
    type: obj.payedType
  }
  // 成功之后存储
  localStorage.removeItem('pjson');
  if (process.browser) {
    localStorage.setItem('pjson', JSON.stringify(pjson));
  }

  /*支付宝 微信 papel 弹出订单疑问弹窗*/
  if (obj.type === 5) {
    /*优惠码另外的逻辑 写*/
    // 优惠码付款
    state.isShwoyhm = true;
    return;
  }

  // 支付接口调用
  wechat(state, {order_id: obj.order_id, type: obj.type, client: 'mobile'}).then((res) => {
      if (res.status === 'error') {
        return false;
      }
      // state.payReplyTimer = null;
      var data = res.data;
      if (obj.type === 4) {
        //  会员卡不用监听直接判断
        getUserInfo().then(res=>{
          if(res.status == 'error'){
            return false
          }
          let userInfo = res.data;
          SET_USER_INFO(state, userInfo);
          _this.$router.push({
            path: '/book/payed',
            query: {
              id: _this.orderData.order_id,
              type: obj.payedType
            }
          })
        })
        return;
      } else if (obj.type === 5) {
        // clearInterval(state.payReplyTimer);
        // state.payReplyTimer = setInterval(() => {
        //   payPcIsEd(state, {order_id: _this.orderData.order_id}, () => {
        //     _this.$router.push({
        //       path: '/book/payed'
        //     })
        //     clearInterval(state.payReplyTimer);
        //   })
        // }, 500)
      } else {
        window.location.href = data.url;
      }
    // H5 端不需要判断是否支付成功


  })
}

// 处理 订单详情 and 确认订单 的数据接口
export function setOrderData(state, obj) {
  // var payState = ['待支付', '待审核', '已审核', '进行中', '待评价', '已完成'];
  var self = obj.__this;
  // var payState = ['待支付', '待审核', '已审核', '进行中', '已完成', '已评价','已取消','申请取消中'];
  var payState = self.$t('lang.common.orderState');
  // 0待支付，1待审核，2已审核，3进行中，4已完成，5已评价，6已取消，7申请取消中
  // var hometype = ['', '独立办公室', '固定工位', '流动工位'];
  var hometype = self.$t('lang.common.huiyiarr');
  // var roomtype = ['', '小型会议室', '中型会议室', '大型会议室'];
  var roomtype = self.$t('lang.common.typearr');
  var paytype = ['noPay', 'zhifubao', 'weixin', 'paypal', 'vip', 'youhuima'];
  var connectType = {
    'weixin':self.$t('lang.compon.patt.wx'),
    'skype': 'skype'
  };
  var langObj = {
    en: 'English',
    cn: '中文'
  }
  if (obj.lang) {
    var lang = langObj[obj.lang] || '--'
  }
  if (obj.connect) {
    var connect = {
      type: connectType[obj.connect.type],
      account: obj.connect.account
    }
  }
  var start = '--';
  var end = '--';
  if (obj.start && obj.end) {
    start = _filterDateString(obj.start * 1000);
    end = _filterDateString(obj.end * 1000);
  }
  if (obj.start_time && obj.end_time) {
    start = _filterDateString(obj.start_time * 1000);
    end = _filterDateString(obj.end_time * 1000);
  }
  var h="";
  if(obj.state==5){
    h =payState[4]
  }else{
    h =payState[obj.state]
  }
  var data = {
    needtimes: obj.needtimes,
    connect: obj.connect,// 沟通方式
    order_id: obj.order_id || '--', // 订单号
    homeType: hometype[obj.type] || '--', // 办公室类型
    roomType: roomtype[obj.size] + '(' + obj.people + ')' || '--', // 会议室类型
    address: obj.address || '--', // 地址
    place_title: obj.place_title || '--', // 会谈地址
    station: obj.station || '--', // 工位数
    times: obj.times || '--', //租赁时长
    total_price: obj.total_price || 0, //金额
    payType: paytype[obj.paytype] || '--', // 支付方式的字符床 ‘noPay’ 代表未支付
    manage: obj.manage, //  受理人
    message: obj.message, // 推送的消息
    isPay: obj.pay || '--', // 是否可以支付
    isQuxiao: obj.cancel || '--', // 是否可以取消
    payState: h || '--',
    numstate: obj.state, //订单状态：0待支付，1待审核，2已审核，3进行中，4已完成，5已评价，6已取消，7申请取消中
    type_title: obj.type_title, //咨询类型
    place_map_link: obj.place_map_link || '/', // 导航链接
    question: obj.question || '--', // 问题描述文字,
    lang: lang, // 语言
    start: start,
    end: end,
    people: obj.people, // 人数
    cover: obj.cover, // 图片
    title: obj.title, // 活动标题
    content: obj.content, // 活动内容
    first_title: obj.first_title, // 服务项目内容
    second_title: obj.second_title, // 服务项目类别
    imgs: obj.imgs, // 图片列表
    information: obj.information,// 资料上传的要求
    informationList: obj.informationList// 资料上传的要求
  }
  state.orderData = data;
}

export function setpayurl(state, obj) {
  state.payurl = obj.url
}
export function SET_WEB_TOKEN(state, webToken) {
  if (webToken) {
    setCookie(key.webToken, webToken,1);
    state.webToken = webToken;
  }
}
export function setIsShwoyhm(state, obj) {
  state.isShwoyhm = obj.bool;
}

