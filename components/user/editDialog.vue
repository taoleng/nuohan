<template>
  <transition name="fade">
    <div class="dialog" v-if="show">
      <div class="mask"></div>
      <div class="dialog-wrapper">
        <i class="iconfont icon-quxiao" @click="closeDialog"></i>
        <div class="title">{{ title }}</div>
        <div class="dialog-content">
          <slot></slot>
        </div>
        <div class="submit-btn" @click="onSubmit">
          <i class="iconfont icon-xiangyoujiaohuan"></i>
          <span>{{ $t('lang.btn.submit') }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      }
    },
    data() {
      return {
        show: true
      }
    },
    mounted() {

    },
    methods: {
      closeDialog() {
        this.$emit('on-close');
      },
      onSubmit() {
        this.$emit('on-submit');
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../assets/less/common";
  .dialog {
    position: relative;
    z-index: 10;
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: .5;
      background: #000;
    }
    .dialog-wrapper {
      position: fixed;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%,-50%,0);
      transform: translate3d(-50%,-50%,0);
      background-color: #fff;
      width: 75%;
      border-radius: 10px;
      font-size: 16px;
      -webkit-user-select: none;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transition: .2s;
      transition: .2s;
      padding: 60px;
      .icon-quxiao {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        line-height: 1;
        padding: 30px;
      }
      .title {
        font-size: 38px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 60px;
      }
      .dialog-content {
        .mint-cell-wrapper {
          min-height: auto;
          height: 80px;
          border-bottom: 1px solid #999999;
          .placeholder(#d2d1d1);
        }
        .mint-cell:last-child {
          background: none;
        }
        .validate-code {
          .send {
            top: -4px;
            right: 0;
            width: 220px;
            text-align: center;
            background: @themColor;
            color: #fff;
            padding: 24px 0 16px;
          }
        }
      }
      .submit-btn {
        font-size: @baseFont + 4px;
        text-align: center;
        color: #fff;
        background: @themColor;
        margin-top: 30px;
        height:100px;
        line-height:100px;
        .iconfont {
          position: relative;
          top: 6px;
          display: inline-block;
          vertical-align: middle;
          font-size: 60px;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
  }
</style>
