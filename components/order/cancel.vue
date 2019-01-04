<template>
  <div class="cancelOrder" v-if="cancelShow">
    <div class="cancel-main">
      <h3 class="cancel-title">{{ $t('lang.model.model1.title') }}</h3>
      <div class="cancel-select" @click="selectCancel">{{ cancelValue || $t('lang.model.cause') }} <i class="iconfont icon-tubiaozhizuo-"></i>  </div>
      <div class="cancel-text" v-if="cancelValue === $t('lang.model.else')">
        <textarea v-model="introduction" :placeholder="$t('lang.model.causetext')" class="resaon"></textarea>
      </div>
      <div class="cancel-submit common-submit-btn" @click="submit">{{ $t('lang.btn.submit') }}</div>
      <div class="cancel-close iconfont icon-quxiao" @click="cancelClose"></div>
    </div>
    <mt-actionsheet :actions="cancel" v-model="showcancel"></mt-actionsheet>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import { toast,empty_obj } from '~/assets/js/tool';
    export default {
      props:{
        cancelShow:{
          type:Boolean,
          default : () =>{
            return false
          }
        },
        orderId:{
          type:String,
          default:()=>{
            return ""
          }
        },
        orderItem:{
          type:Object,
          default:()=>{
            return {}
          }
        }
      },
      data(){
        return {
          showcancel:false,
          cancel:[],
          cancelValue:"",
          introduction:""
        }
      },
      created(){
        this.cancel=[
          {
            name : this.$t('lang.model.wu'),
            method:val=>{
              this.cancelValue = val.name
            }
          },
          {
            name : this.$t('lang.model.lin'),
            method:val=>{
              this.cancelValue = val.name
            }
          },
          {
            name : this.$t('lang.model.else'),
            method:val=>{
              this.cancelValue = val.name
            }
          }
        ]
      },
      methods:{
        ...mapActions(['orderCancel']),
        selectCancel(){
          this.showcancel = true;
        },
        submit(){
          let param={
            order_id : this.$route.query.id || this.orderId
          };
          param.reason = this.cancelValue===this.$t('lang.model.else') ? this.introduction : this.cancelValue;
          if(!param.reason){
            toast(this.$t('lang.model.cause'));
            return false;
          }
          this.orderCancel(param).then(res =>{
            if (res.status === 'error') {
              return false;
            }
            toast(res.msg);
            if(!empty_obj(this.orderItem)){
              this.orderItem.cancel = 0;
            }
            this.cancelClose();
          })
        },
        cancelClose(){
          this.$emit('on-cancel',false)
          if (this.$route.query.user) {
            this.$router.push({
              path: '/user/order'
            })
          } else if (this.$route.query.type) {
            if (str === 'activity') {
              //  活动跳列表
              this.$router.push({
                path: '/book/activity'
              })
            } else {
              var str = this.$route.query.type;
              // 跳预约页面
              if (str === 'talks' || str === 'meeting' || str === 'question') {
                //  跳转
                this.$router.push({
                  path: '/book/appt/consult',
                  query: {
                    t: str
                  }
                })
              } else if (str === 'office' || str === 'room') {
                this.$router.push({
                  path: '/book/appt/field',
                  query: {
                    t: str
                  }
                })
              } else {
                //  跳转
                this.$router.push({
                  path: '/book/appt/' + str
                })
              }
            }
          }
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .cancelOrder{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 2;
    .cancel-main{
      position: absolute;
      width: 600px;
      padding:50px 20px 50px;
      background: #fff;
      border-radius:10px;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform:translate(-50%,-50%);
      .cancel-title{
        font-size:36px;
        color: #333;
        text-align: center;
        font-weight: normal;
      }
      .cancel-select{
        width: 440px;
        height: 80px;
        line-height:80px;
        background: #eeeeee;
        margin: 30px auto;
        font-size: 24px;
        color: #333;
        text-align: center;
        position: relative;
        i{
          position: absolute;
          font-size: 20px;
          right:10px;
          top: 0;
        }
      }
      .cancel-close{
        position: absolute;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        top: 20px;
        right: 20px;
      }
      .cancel-submit{
        width: 450px;
        margin:50px auto 0;
      }
    }
    .resaon{
      font-size: 24px;
      color: #666;
      background:#f7f7f7;
      outline: none;
      display: block;
      padding:20px;
      width: 390px;
      margin: 0 auto;
      height: 150px;
      border-color: #d7d7d7;
      resize: none;
      &::-webkit-input-placeholder{
        color: #999;
      }
    }
  }
</style>
