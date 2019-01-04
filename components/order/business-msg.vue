<template>
  <div class="business-msg" v-if="message[0]">
    <div class="business-msg-title">
      {{ $t('lang.common.orderMsg') }}
    </div>
    <ul class="business-msg-text">
      <li v-for="(item, index) in message" :key="index">
        <p :class="{ readed: !item.unread }" class="business-msg-text-time">
          <i/>
          <span>{{ item.create_time }}</span>
        </p>
        <p class="business-msg-text-content" v-html="item.message">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .business-msg {
    color: #333333;
    line-height: 1;
    margin-bottom: 25px;
    &-title {
      color: #333333;
      line-height: 1;
      margin-bottom: 25px;
    }
    &-text {
      li {
        margin-bottom: 25px;
        &:last-child {
          margin-bottom: 0px;
        }
      }
      &-time {
        color: #dd7116;
        font-size: 0px;
        line-height: 1;
        margin-bottom: 10px;
        &.readed {
          i {
            background: #999999;
          }
          color: #999999;
        }
        i {
          display: inline-block;
          position: relative;
          top: 1px;
          height: 20px;
          width: 20px;
          border-radius: 10px;
          background: #dd7116;
          margin-right: 18px;
        }
        span {
          font-size: 26px;
          margin-right: 12px;
        }
        b {
          font-size: 22px;
          font-weight: normal;
        }
      }
      &-content {
        padding-left: 30px;
        width: 600px;
        color: #333333;
        font-size: 34px;
        line-height:50px;
      }
    }
  }
</style>
