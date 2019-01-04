import axios from 'axios'
import config from './config'
import store from '../store'
import {getCookie, getcookiesInServer} from '../assets/js/cookie'
import {loadingHide, loadingShow, toast} from "../assets/js/tool";
import {authToken,webToken, lang} from '../store/dataKey'

const service = axios.create(config);

// POST 传参序列化
service.interceptors.request.use(
  config => {
    let token = '';
    if (process.browser) {
      config.headers['token'] = getCookie(authToken) || '';
      config.headers['temptoken'] = getCookie(webToken) || '';
      config.headers['language'] = getCookie(lang) || '';
    }else {
      config.headers['token'] = store().state.token || '';
      config.headers['language'] = store().state.lang || '';
      config.headers['temptoken'] = store().state.webToken || '';
    }
    // console.log('tttoken: ', config.headers);
    // console.log(config.headers);
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
// 返回结果处理
service.interceptors.response.use(
  res => {

    if (process.browser) {
      loadingHide();
      if (res.data.code === 200) {

      } else if (res.data.code === -1) {
        if (process.browser) {
          window.location( window.location.href = '/user/login')
          return;
        }
        // Router().redirect('/user/login');
        return false;
      } else if (res.data.code === -2) {
        if (process.browser) {
          toast('您的账号被禁用，请联系管理员！');
          window.location( window.location.href = '/user/login')
          return;
        }
        // Router().push('/user/login');
        return false;
      }else if (res.data.code === 413) {
        if (process.browser) {
          toast("文件太大");
          return;
        }
      } else {
        if (process.browser) {
          toast(res.data.msg);
          return res.data;
        }
      }
    }
    console.log(res.data);
    return res.data
  },
  error => {
    console.log(error);
    return Promise.reject(error)
  }
);

export default {
  // post 方法
  post(url, data, isLoading) {
    console.log('post request url', url);
    if (process.browser) {
      if (isLoading) {
        loadingShow();
      }
    }
    return service({
      method: 'post',
      url,
      data: data
    })
  },
  // get 方法
  get (url, data) {
    console.log('get request url', url);
    return service({
      method: 'get',
      url,
      data: data
    })
  },
  config: config.headers.post
}
