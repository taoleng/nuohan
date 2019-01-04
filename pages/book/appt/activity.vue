<template>
  <div class="activity-content appt-common">
    <img src="../../../assets/img/appt-active.jpg" class="img">
    <div class="inner-block">
      <div class="title" v-html="$t('lang.book.appt.activitytext')"></div>
      <div class="check-box">
        <div class="label">
          <i class="iconfont icon-leibie"></i>
          <span class="line"></span>
          <span>{{ $t('lang.book.appt.activity.form') }}</span>
        </div>
        <div class="box">
          <input type="text" v-model="formValue" :placeholder="$t('lang.book.appt.activity.item1place')" class="input">
        </div>
      </div>
      <div class="check-box">
        <div class="label">
          <i class="iconfont icon-qiapianxingshi"></i>
          <span class="line"></span>
          <span>{{ $t('lang.book.appt.activity.item2') }}</span>
        </div>
        <div class="box">
          <input type="text" v-model="categoryValue" :placeholder="$t('lang.book.appt.activity.item2place')" class="input">
        </div>
      </div>
      <div class="check-box">
        <div class="label">
          <i class="iconfont icon-xiugai"></i>
          <span class="line"></span>
          <span>{{ $t('lang.book.appt.activity.item3') }}</span>
        </div>
        <mt-field :placeholder="$t('lang.book.appt.activity.item3place')" type="textarea" rows="4" v-model="content"></mt-field>
      </div>
      <date-select @on-ok="getTime" ref="dateSelect"></date-select>
      <div class="check-box">
        <div class="label">
          <i class="iconfont icon-renshu"></i>
          <span class="line"></span>
          <span>{{ $t('lang.book.appt.activity.numberParticipants') }}</span>
        </div>
        <num @on-change="onNumChange"></num>
      </div>
      <div class="check-box">
        <div class="label">
          <i class="iconfont icon-wo"></i>
          <span class="line"></span>
          <span>{{ $t('lang.book.appt.activity.name') }}</span>
        </div>
        <div class="box">
          <input type="text" v-model="appellation" :placeholder="$t('lang.book.appt.activity.namePlace')" class="input">
        </div>
      </div>
      <div class="check-box">
        <div class="label">
          <i class="iconfont icon-wo"></i>
          <span class="line"></span>
          <span>{{ $t('lang.book.appt.activity.phone') }}</span>
        </div>
        <div class="box input-mobile">
          <input type="text" v-model="mobile" :placeholder="$t('lang.book.appt.activity.phoneandEmail')" class="input">
          <div class="input-yzm" @click="yzm">{{ yzmText }}</div>
        </div>
      </div>
      <div class="check-box">
        <div class="label">
          <i class="iconfont icon-faqihuodongchenggong"></i>
          <span class="line"></span>
          <span>{{ $t('lang.book.appt.activity.yzm') }}</span>
        </div>
        <div class="box input-mobileNum">
          <input type="text" v-model="mobileNum" :placeholder="$t('lang.book.appt.activity.yzm')" class="input">
        </div>
      </div>
      <div class="check-box lst">
        <clause v-model="isTy"></clause>
        <a href="javascript:;" class="common-submit-btn" @click="submit">
          <i class="iconfont icon-xiangyoujiaohuan"></i>
          <span>{{ $t('lang.btn.submit') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapActions,mapState,mapMutations} from 'vuex'
  import dateSelect from '../../../components/appt/dateSelect'
  import num from '../../../components/appt/num'
  import {isPhone, toast,isEmail} from '../../../assets/js/tool'
  import clause from '../../../components/common/clause'
  import md5 from 'md5';
  export default {
    components: {
      dateSelect, num,clause
    },
    data() {
      return {
        formValue:'',
        categoryValue: '',
        content: '',
        startTime: '',
        endTime: '',
        peopleNum:0,
        appellation: '',
        mobile: '',
        mobileNum:'',
        isTy: false,
        yzmText: this.$t('lang.common.sendYzm'),
        disable : true
      }
    },
    computed: {
      ...mapState(['webToken']),
    },
    head(){
      return {
        title:this.$t('lang.title.bookActivityPro')
      }
    },
    mounted() {
      if (!this.webToken) {
        this.SET_WEB_TOKEN(md5(Math.random()));
      }
    },
    methods: {
      ...mapActions(['activitySend','activityBook']),
      ...mapMutations(['SET_WEB_TOKEN']),
      getTime(obj) {
        this.startTime = obj.start;
        this.endTime = obj.end;
      },
      onNumChange(num) {
        this.peopleNum = num
      },
      submit(){
        // modus       活动形式
        // type        活动类别
        // content     活动内容
        // start_time  活动开始时间，格式：2018-10-15 15:11
        // end_time    活动结果时间，格式：2018-10-15 15:11
        // people      参与人数
        // realname    称谓
        // mobile      手机号或者邮箱
        // code        验证码
        let param={
          modus:this.formValue,
          type:this.categoryValue,
          content:this.content,
          start_time:this.startTime,
          end_time:this.endTime,
          people:this.peopleNum,
          realname:this.appellation,
          mobile:this.mobile,
          code:this.mobileNum
        };

        if (!this.isTy) {
          toast(this.$t('lang.model.model1.clause'));
          return false;
        }
        if(!(isPhone(this.mobile) || isEmail(this.mobile))){
          toast(this.$t('lang.placeholder.iphoneEmailError'));
          return false;
        }
        this.activityBook(param).then(res => {
          if (res.status === 'error') {
            return false;
          }
          toast(res.msg);
          this.$router.push('../actSuccess')
        })
      },
      yzm(){
        if(!(isPhone(this.mobile) || isEmail(this.mobile))){
          toast(this.$t('lang.placeholder.iphoneEmailError'));
          return false;
        }
        let timer = null;
        let time = 60;
        if(this.disable){
          this.disable = false;
          this.activitySend({mobile:this.mobile}).then(res => {
            if (res.status === 'error') {
              this.disable = true;
              return false;
            }
            timer = setInterval(()=>{
              time--;
              this.yzmText = time+'s';
              if(time === -1){
                this.yzmText = this.$t('lang.btn.gainyzm');
                clearInterval(timer);
                this.disable = true;
              }
            },1000)
            toast(res.msg);
          })
        }
      }
    }
  }
</script>

<style lang='less' type="text/less">
  .activity-content {
    color: #fff;
    background:#202020 url("../../../assets/img/common-bg.jpg");
    background-size:cover;
    .img{width: 100%;}
    .inner-block{
      margin-top: -240px;
    }
    .title {
      font-size: 60px;
      color: #fff;
      margin-bottom: 110px;
    }
    .common-submit-btn {
      width: 326px;
      margin-top: 50px;
    }
    .check-box{
      .input{
        height: 80px;
        line-height: 80px;
        outline: none;
        border: none;
        background:transparent;
        color: #ddd;
        width: 100%;
      }
      .input-mobileNum{
        width: 300px;
      }
      .box{
        position: relative;
        height: 80px;
      }
      .input-yzm{
        position: absolute;
        top: 0;
        right:0px;
        width: 200px;
        height: 80px;
        line-height:80px;
        text-align: center;
        font-size: 24px;
        color: #ffffff;
        background: #999999;
      }
    }

    .label{
      margin-bottom: 10px;
    }
    .lst{
      margin-top: 40px;
    }
  }
</style>
