<template>
  <div class="business">
    <div class="business-title">
      {{ $t('lang.compon.busin.order') }}
    </div>
    <ul>
      <li v-for="(item, index) in arr" :key="index" :class="{ 'checked': item.includes(value) }">{{ item[0] }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        arr: [
          [this.$t('lang.compon.busin.arr')[1]],
          [this.$t('lang.compon.busin.arr')[2]],
          [this.$t('lang.compon.busin.arr')[3]],
          [this.$t('lang.compon.busin.arr')[4],this.$t('lang.compon.busin.arr')[5]] // 已经评，已完成 时显示已完成
        ]
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .business {
    margin-bottom: 50px;
    .business-title {
      color: #333333;
      line-height: 1;
      margin-bottom: 25px;
    }
    ul {
      overflow: hidden;
      border-radius: 25px;
      background: #eeeeee;
      li {
        float: left;
        width: 25%;
        height: 50px;
        border-radius: 25px;
        text-align: center;
        line-height: 50px;
        &.checked {
          color: #ffffff;
          background: #dd7116;
        }
      }
    }
  }
</style>
