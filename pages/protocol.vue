<template>
  <div class="protocol">
    <div class="protocol-head">
      <h2>{{ data.title }}</h2>
    </div>
    <div class="protocol-main">
      <div class="protocol-item">
        <div v-html="data.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
      data(){
        return {
          data : {}
        }
      },
      head(){
        return {
          title:this.$t('lang.title.order')
        }
      },
      created(){
        var type = this.$route.query.type;
        // type1上线协议,2隐私协议,3支付协议,4用户协议
        if(type==1 || type==2){
          this.register_protocols().then(res=>{
            if(res.status ==='error'){
              return false
            }
            if(type == 1){
              this.data = res.data[0]
            }else{
              this.data = res.data[1]
            }
          })
        }else if(type==3){
          this.pay_protocol().then(res=>{
            if(res.status === 'error'){
              return false;
            }
            this.data = res.data;
          })
        }else if(type==4){
          this.protocol().then(res=>{
            if(res.status ==='error'){
              return false
            }
            this.data = res.data
          })
        }
      },
      methods:{
        ...mapActions(['protocol','register_protocols','pay_protocol'])
      }
    }
</script>

<style lang='less' type="text/less">
  .protocol{
    .protocol-head{
      padding:0 48px;
      height: 350px;
      background: #1c1d22;
      h2{
        font-size: 48px;
        color: #fff;
        padding-top: 238px;
        font-weight: normal;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
      }
    }
    .protocol-main{
      padding:60px 48px;
      color: #333333;
      h3{
        font-size: 36px;
      }
      >p{
        margin-top: 40px;
        font-size: 24px;
        line-height: 50px;
      }
      >div{
        margin-top: 40px;
        font-size: 24px;
        line-height: 50px;
      }
      img{
        width: 100%;
      }
    }
  }
</style>
