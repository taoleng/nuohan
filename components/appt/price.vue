<template>
  <div class="order-price">
    <div class="total">
      <i class="iconfont icon-jine"></i>
      <span class="line"></span>
      <span>{{ $t('lang.common.pricetatol') }}：</span>
      <span class="num">￥ {{ Number(price).toFixed(2) }}</span>
    </div>
    <clause v-model="isty"></clause>
    <a @click="submit" class="common-submit-btn">
      <!--<i class="iconfont icon-xiangyoujiaohuan"></i>-->
      <i></i>
      <span>{{ $t('lang.btn.submit') }}</span>
    </a>
  </div>
</template>

<script>
  import clause from '../common/clause'
  export default {
    components: {
      clause
    },
    model: {
      prop: 'tyValue',
      event:'input'
    },
    props: {
      price: {
        type: Number,
        default: 0,
      },
      tyValue: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isty: false
      }
    },
    watch: {
      isty(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      submit() {
        this.$emit('on-click');
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";

  .order-price {
    margin-top: 100px;
    .total {
      margin-bottom: 50px;
      i, span {
        line-height: 50px;
        vertical-align: middle;
        color: #ffffff;
      }
      i {

      }
      .num {
        vertical-align: bottom;
        color: @themColor;
        font-size: 50px;
        font-weight: bold;
      }
      .line {
        display: inline-block;
        width: 1PX;
        height: 10px;
        background: #fff;
        margin: 0 18px 0 12px;
      }
    }
    .common-submit-btn {
      width: 326px;
      margin-top: 40px;
      span {
        font-size: 38px;
      }
    }
  }
</style>
