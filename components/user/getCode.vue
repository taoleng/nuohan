<template>
  <div class="validate-code" :class="{'cls':cls}">
    <!--mt-field placeholder="请输入验证码"
              v-model="value"
              :attr="{ maxlength: 6 }">

    </mt-field -->
    <div class="form-input">
      <input v-model="value" :placeholder="$t('lang.placeholder.yanzheng')" maxlength="6" type="text">
      <span class="send">
        <span v-if="countTime.step === 1" @click="getCode">{{ $t('lang.btn.gainyzm') }}</span>
        <span v-else>{{ countTime.currentTime }}s</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      step: {
        type: Number,
        default: 1
      },
      cls:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        value: '',
        countTime: {
          time: 60,
          currentTime: 0,
          step: 1,
          lock: false,
          setIntervalFun: null
        }
      }
    },
    watch: {
      step(val) {
        this.countTime.step = val;
        if (val === 2) {
          this.startCountDown();
        } else if (val === 1) {
          clearInterval(this.countTime.setIntervalFun);
          this.countTime.lock = false;
        }
      },
      value(val) {
        this.$emit('on-change', val);
      }
    },
    mounted() {

    },
    methods: {
      getCode() {
        if (this.countTime.lock) {
          return false;
        }
        this.$emit('on-send');
      },
      startCountDown() {
        this.countTime.lock = true;
        this.countTime.currentTime = this.countTime.time;
        let _this = this;
        this.countTime.setIntervalFun = setInterval(function () {
          if (_this.countTime.currentTime > 0) {
            _this.countTime.currentTime--;
          } else {
            clearInterval(_this.countTime.setIntervalFun);
            _this.countTime.lock = false;
            _this.countTime.step = 1;
          }
        }, 1000);
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .cls{
    .form-input{
      background: none;
      &:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height:2px;
        background: #eee;
      }
      .send{
        padding: 0!important;
        height: 94px;
        top: 2px!important;
      }
      input{
        text-indent: 20px;
        font-size: 36px;
        color: #333;
        &::-webkit-input-placeholder{
          color: #999;
        }
      }
    }
  }
  .form-input{
    position: relative;
    width: 100%;
    display: flex;
    height: 100px;
    background: rgba(13, 13, 13, 0.4);
    margin-bottom: 20px;
    border-radius:10px;
    .send {
      position: absolute;
      display: inline-block;
      height: 100px;
      line-height: 110px;
      top: 0;
      right: 28px;
      font-size: 32px;
      text-align: right;
      span {
        display: inline-block;
      }
    }
    input{
      flex: 1;
      height: 100px;
      background: transparent;
      outline: none;
      border: none;
      color: #fff;
      text-indent: 30px;
    }
  }
</style>
