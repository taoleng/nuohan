<template>
  <div class="common-user-head">
    <div class="inner-block">
      <user-title type="user"></user-title>
      <div class="avatar" v-if="userInfo">
        <div class="img">
          <img :src="userInfo.avatar" alt="">
          <avatar-upload @on-change="uploadFile"></avatar-upload>
        </div>
        <p>{{ userInfo.nickname || '--' }}</p>
      </div>
      <ul>
        <li v-for="item in config" :key="item.url" :class="{'on': item.exact? item.url === routeName: routeName.indexOf(item.url)===0}">
          <nuxt-link :to="item.url">{{ item.text }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import userTitle from '../../components/user/userTitle'
  import avatarUpload from '../../components/user/avatarUpload'
  import {toast} from '../../assets/js/tool'

  export default {
    components: {
      userTitle, avatarUpload
    },
    data() {
      return {
        config: [
          {url: '/user',exact:true, text: this.$t('lang.user.news.hyxx')},
          {url: '/user/equity',exact:false, text: this.$t('lang.user.news.hyqy')},
          {url: '/user/order',exact:false, text: this.$t('lang.user.news.ddgl')},
          {url: '/user/news',exact:false, text: this.$t('lang.user.news.xxgl')}
        ],
        routeName: ''
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
      this.routeName = this.$route.fullPath;
    },
    methods: {
      ...mapActions(['uploadAvatar']),
      uploadFile(file) {
        let param = new FormData();
        param.append('file', file, 'file_' + Date.parse(new Date()) + '.jpg');
        this.uploadAvatar(param).then(res => {
          if (res.status === 'error') {
            return false;
          }
          toast(res.msg);
          this.$emit('on-update');
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";

  .common-user-head {
    height: 500px;
    color: #fff;
    background: #1c1d22;
    .user-title {
      h1 {
        margin-bottom: 10px;
      }
      p {
        font-size: 26px;
      }
    }
    .inner-block {
      position: relative;
      height: 100%;
    }
    .avatar {
      position: absolute;
      left: 0;
      bottom: -80px;
      width: 118px;
      color: #333;
      text-align: center;
      .img {
        position: relative;
        width: 100%;
        height: 118px;
        border-radius: 50%;
        background: #ccc;
        margin-bottom: 10px;
        overflow: hidden;
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        img {
          width: 100%;
        }
      }
      p {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    ul {
      position: absolute;
      right: -10px;
      bottom: 0;
      font-size: 0;
      margin-top: 12px;
      li {
        display: inline-block;
        margin:0 16px;
        a {
          color: #999999;
          font-size: 32px;
          border-bottom: 4px solid transparent;
        }
        &.on {
          a {
            display: inline-block;
            color: @themColor;
            font-weight: bold;
            border-color: @themColor;
            padding-bottom: 16px;
          }
        }
      }
    }
  }
</style>
