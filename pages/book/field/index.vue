<template>
  <div
    class="appointment appointment-field"
    :style = "{
      'background-image': 'url(' + imageUrl + ')'
    }"
  >
    <div class="inner-block">
      <div class="btn-control">
        <div class="item"
             v-for="(item, index) in list"
             :key="index"
             :class="{'on': active === index + ''}" @click="active = index + ''">
          <span>{{ item.btn_txt }}</span>
          <div class="dot"><span></span><span></span><span></span></div>
          <i class="iconfont icon-tubiaozhizuo-"></i>
        </div>
      </div>
    </div>
    <mt-tab-container v-model="active" :swipeable="true">
      <mt-tab-container-item
        :id="index + ''"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="inner-block">
          <div class="title">{{ item.title }}</div>
          <div class="text">{{ item.intro }}</div>
          <div @click="goFile(item)" class="btn">
            <span>{{ $t('lang.btn.reserve') }}</span>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        urlArr: [
          '/book/appt/field?t=office',
          '/book/appt/field?t=room'
        ],
        list: [],
        active: '0',
        imageUrl: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookSpace')
      }
    },
    watch: {
      active(idx) {
        this.imageUrl = this.list[idx].bg;
      }
    },
    created() {
      this.bookSpace().then((res) => {
        if (res.status === 'error') {
          return false;
        }
        let data = res.data;
        data.forEach((v, k) => {
          v.to = this.urlArr[k];
        })
        this.list = data;
        this.imageUrl = this.list[0].bg;
      })
    },
    methods: {
      ...mapActions(['bookSpace']),
      goFile(item){
        this.$router.push(item.to);
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .appointment-field {
    background-image: url("../../../assets/img/common-bg.jpg");
    background-size: cover;
    .btn-control {
      .item {
        width: 375px;
        padding: 0px 90px;
        .dot {
          right: 90px;
        }
      }
    }
  }
</style>
