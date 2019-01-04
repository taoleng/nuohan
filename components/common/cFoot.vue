<template>
  <div class="footer">
    <share-btn></share-btn>
    <h2>{{ $t('lang.bottom.incoming') }}</h2>
    <ul class="footer_menu">
      <li>
        <span class="item-title">{{ $t('lang.bottom.advisoryTel') }}</span>
        <span class="item-text">{{ data.advisory_tel }}</span>
      </li>
      <li>
        <span class="item-title">{{ $t('lang.bottom.email') }}</span>
        <span class="item-text">{{ data.email }}</span>
      </li>
      <li>
        <span class="item-title">{{ $t('lang.bottom.bussTel') }}</span>
        <span class="item-text">{{ data.buss_tel }}</span>
      </li>
      <li>
        <span class="item-title">{{ $t('lang.bottom.address') }}</span>
        <span class="item-text">{{ data.address }}</span>
      </li>
    </ul>
    <p class="copyright">{{ data.icp }}</p>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
  import shareBtn from './shareBtn'

  export default {
    components: {
      shareBtn
    },
    data() {
      return {
        data: {}
      }
    },
    computed: {

    },
    mounted() {
      this.getConfigInfo();
    },
    methods: {
      ...mapActions(['getConfig']),
      ...mapMutations(['SET_CONFIG']),
      getConfigInfo() {
        this.getConfig().then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.data = res.data;
          this.SET_CONFIG(this.data);
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";

  .footer {
    background: #202020;
    padding: 48px 72px;
    position: relative;
    bottom: 0;
    left: 0;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    h2 {
      display: block;
      font-size: 36px;
      font-weight: normal;
      margin-top: 10px;
      color: #fff;
    }
    ul {
      font-size: 0;
      color: #fff;
      margin: 26px 0;
      li {
        width: 50%;
        display: inline-block;
        vertical-align: top;
        font-size: 0;
        span{
          font-size: 24px;
          /*text-align: left;*/
        }
        span.item-title {
          margin-right: 10px;
          width: 120px;
          color: #797979;
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
        }
        span.item-text{
          display: inline-block;
          vertical-align: top;
          width:280px;
          .line();
        }
      }
    }
    .copyright {
      font-size: 18px;
      color: #797979;
    }
  }
</style>
