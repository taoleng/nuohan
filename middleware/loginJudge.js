import {getUserInfo} from '../store/actions'
import {authToken, lang} from '../store/dataKey'
import { _filterUserInfo } from '../assets/js/filter';
function getcookiesInServer(req) {
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
}

// 不需要登录跳转的路由
let noNeedJudge = [
  '/',
  '/news',
  '/news/detail',
  '/news/list',
  '/clients',
  '/contact',
  '/user/login',
  '/user/register',
  '/user/forget',
  '/user/reset',
  '/user/pw',
  '/protocol',
  '/book',
  '/book/consult',
  '/book/field',
  '/book/appt/consult',
  '/book/appt/field',
  '/book/appt/service',
  '/book/appt/activity',
  '/book/activity',
  '/book/actSuccess',
  '/book/activity/detail',
  '/book/order/talks',
  '/book/order/meeting',
  '/book/order/question',
  '/book/order/office',
  '/book/order/room',
  '/book/order/service',
  '/book/order/activity'
];

export default function ({route, store, req, redirect,app}) {
  // console.log(route.path)
  // console.log(process.browser, process.server)

  let flag = false;
  let url = route.fullPath.split('?')[0];
  noNeedJudge.forEach(item => {
    if (url === item) {
      flag = true;
    }
  });
  if (process.browser) {
    if (flag) return false;
    if (store.state.hasLogin) return false;
    redirect('/user/login');
  } else {
    // 刷新页面 请求user/info
    let cookies = getcookiesInServer(req);
    store.state.token = cookies[authToken] ? cookies[authToken] : '';
    store.state.lang = cookies[lang] ? cookies[lang] : 'cn';
    return getUserInfo().then(res => {

      if (res.code === -1) {
        // 未登陆
        store.state.userInfo = {
          vip_data: {}
        };
        store.state.hasLogin = false;
        // console.log('res...',res,store.state.userInfo);
        // 判断是否需要跳转
        if (flag) return false;
        redirect('/user/login');
      } else {
        // 登录
        let userInfo = res.data;
        store.state.userInfo = store.state.lang == 'cn' ? _filterUserInfo(userInfo,1) : _filterUserInfo(userInfo,2)
        // store.state.userInfo = _filterUserInfo(userInfo);
        store.state.hasLogin = true;
        // if (route.path === '/user/login') {
        //   redirect('/user');
        // }
      }
    });
  }
}


