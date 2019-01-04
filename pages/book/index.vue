<template>
  <div class="appointment-home">
    <div class="inner-block">
      <ul class="appointment-home-list">
        <li
          class="appointment-home-list-li"
          v-for="(item, index) in list"
          :key="index"
        >
          <router-link :to="urlArr[index]">
            <img :src="item.img" alt="">
            <div class="appointment-home-list-li-content">
              <h3 class="text">{{ item.title }}</h3>
              <!--router-link to="/book/payed">
                订单成功
              </router-link -->
              <p>{{ $t('lang.book.index.more') }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        list: [],
        urlArr: [
          '/book/consult',
          '/book/field',
          '/book/appt/service',
          '/book/activity'
        ]
      }
    },
    head(){
      return {
        title:this.$t('lang.title.book')
      }
    },
    created() {
      this.bookHomeApi();
    },
    methods: {
      ...mapActions(['bookHome']),
      bookHomeApi() {
        this.bookHome().then((res) => {
          if (res.status === 'error') {
            return false;
          }
          this.list = res.data;
        })
      }
    },
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";
  .appointment-home {
    background: #e2e2e2 url('../../assets/img/vipbg.jpg') top center no-repeat;
    background-size: cover;
    .inner-block {
      .default-margin;
    }
    &-list {
      min-height: 300px;
      width: 570px;
      margin: 0 auto;
      padding-top: 50px;
      overflow: hidden;
      &-li {
        float: left;
        width: 280px;
        background: #ffffff;
        margin-right: 10px;
        margin-bottom: 10px;
        img {
          display: block;
          width: 100%;
        }
        &-content {
          padding: 20px 10px;
          text-align: center;
          h3 {
            line-height: 55px;
            height: 55px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 30px;
            color: #333333;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          p {
            line-height: 42px;
            font-size: 14px;
            color: #333333;
          }
        }
      }
      &-li:nth-child(2n) {
        margin-right: 0px;
      }
    }
  }
</style>
