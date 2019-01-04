<template>
  <div
    class="appointment appointment-consult"
    :style = "{
      'background-image': 'url(' + imageUrl + ')'
    }"
  >
    <div class="inner-block">
      <div class="btn-control">
        <div class="item"
             v-for="(item, index) in list"
             :key="index"
             :class="{'on': active === index + '' }" @click="active = index + ''">
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
          <div @click="goCon(item)" class="btn">
            <i></i>
            <span>{{ $t('lang.btn.reserve') }}</span>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        active: '0',
        urlArr: [
          '/book/appt/consult?t=talks',
          '/book/appt/consult?t=meeting',
          '/book/appt/consult?t=question'
        ],
        list: [],
        idx: 0,
        imageUrl: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookCon')
      }
    },
    watch: {
      active(idx) {
        this.imageUrl = this.list[idx].bg;
      }
    },
    created() {
      this.bookAdvisory().then((res) => {
        if (res.status === 'error') {
          return false;
        }
        let data = res.data;
        data.forEach((v, k) => {
          v.to = this.urlArr[k];
        })
        this.list = data;
        this.imageUrl = data[0].bg;
      })
    },
    mounted() {

    },
    methods: {
      // 预约会面
      ...mapActions(['bookAdvisory']),
      goCon(item){
        this.$router.push(item.to);
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../../assets/less/common";

  .appointment-consult {
    background: #4b5c6d top center no-repeat;
    background-size: cover;
  }
</style>
