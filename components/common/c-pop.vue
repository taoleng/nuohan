<template>
  <div class="common-pop" v-if="cShow">
    <div class="common-pop-main">
      <div class="pop-title"><i class="iconfont" :class="cTitleIcon" v-if="cTitleIconShow"></i><span>{{ cTitle }}</span></div>
      <slot></slot>
      <div class="pop-close iconfont icon-quxiao" @click="close"></div>
    </div>
    <div class="pop-bg" @click="close"></div>
  </div>
</template>

<script>
    export default {
      props:{
        cShow:{
          type:Boolean,
          default : ()=>{
            return false;
          }
        },
        cTitle:{
          type:String,
          default:()=>{
            return ""
            // return "订单评价成功"
          }
        },
        cTitleIcon:{
          type:String,
          default:()=>{
            return "icon-chenggong-"
          }
        },
        cTitleIconShow:{
          type:Boolean,
          default:()=>{
            return false
          }
        }
      },
      methods:{
        close(){
          this.$emit("cPopClose",false)
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .common-pop{
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin:0 auto;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .common-pop .pop-bg{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin:0 auto;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .common-pop .common-pop-main{
    position: absolute;
    width: 520px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 10px;
    text-align: center;
    color: #333;
    padding: 70px 0 80px 0;
    z-index: 101;
  }
  .common-pop .pop-close{
    position: absolute;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    top: 0;
    right: 0;
  }
  .common-pop .pop-title{
    font-size: 30px;
    height: 50px;
    line-height: 50px;
    span{
      display: inline-block;
      vertical-align: top;
      height: 50px;
      line-height: 50px;
    }
    i{
      color: #dd7116;
      font-size:50px;
      margin-right: 10px;
      vertical-align: top;
      display: inline-block;
    }
  }
  .common-pop .pop-inner{
    font-size: 26px;
    padding: 40px 0 70px 0;
    line-height:50px;
  }
  .common-pop .pop-btn{
    display: block;
    width:390px;
    height:88px;
    text-align: center;
    line-height: 88px;
    font-size: 24px;
    color: #fff;
    background: #dd7116;
    margin:0 auto;
  }
  .common-pop .pop-inner{
    input{
      display: block;
      margin: 0 auto;
      width: 390px;
      height: 60px;
      border: none;
      border-bottom: 1px solid #eee;
      line-height: 60px;
      font-size: 26px;
      color: #666;
      outline: none;
    }
  }
  .common-pop .text{
    padding: 40px 0 50px;
  }
  .common-pop .pop-menu-item{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 400px;
    margin:26px auto 0;
    li{
      width: 45%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 24px;
      color: #999999;
      background: #f6f6f6;
      margin-bottom:20px;
      &.item-on{
        background: #dd7116;
        color: #fff;
      }
      &:nth-child(n+3){
        margin-bottom: 0;
      }
    }
  }
</style>
