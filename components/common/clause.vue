<template>
  <div class="clause">
    <span class="yuan" @click="isTony">
      <b v-if="isTy">
        <i class="iconfont icon-chenggong"></i>
      </b>
    </span>
    <p class="tk">
      <span @click="isTony">{{ $t('lang.common.clausetext') }}</span>
      <a :href="'/protocol?type='+type">《{{ title }}》</a>
    </p>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    model: {
      prop: 'value',
      event:'input'
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isTy: false,
        title:"",
        type:0
      }
    },
    watch: {
      isTy(val) {
        this.$emit('input', val)
      }
    },
    created() {
      if (this.$route.query.id != undefined) {
        this.isTy = true;
        this.pay_protocol().then(res=>{
          if(res.status === 'error'){
            return false;
          }
          this.title = res.data.title;
          this.type = 3
        })
      }else{
        this.protocol().then(res=>{
          if(res.status === 'error'){
            return false;
          }
          this.title = res.data.title;
          this.type = 4
        })
      }
    },
    methods: {
      ...mapActions(['protocol','pay_protocol']),
      isTony() {
        if (this.$route.query.id) {
          return;
        }
        this.isTy = !this.isTy;
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .clause {
    .yuan {
      position: relative;
      line-height: 1;
      display:inline-block;
      vertical-align: middle;
      width: 25px;
      height: 25px;
      border: 3px solid #dcdcdc;
      border-radius: 50%;
      margin-right:10px;
      position: relative;
      b {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 25px;
        height: 25px;
        background: #dd7116;
        border-radius: 50%;
        i {
          position: absolute;
          top: 5px;
          left: 2px;
          line-height: 1;
          text-align: center;
          font-size: 10px;
          color: #ffffff;
        }
      }
    }
    .tk {
      line-height: 1;
      display: inline-block;
      vertical-align: middle;
      font-size: 28px;
      color: #999999;
      width: 90%;
      a {
        font-size: 28px;
        color: #dd7116;
      }
    }
  }
</style>
