<template>
  <div class="information login-wrapper">
    <div class="inner-block">
      <div class="userImg">
        <div class="item">
          <img :src="userInfo.avatar">
          <avatar-upload @on-change="uploadFile"></avatar-upload>
        </div>
        <div class="userName">{{ form.nickname }}</div>
      </div>
      <div class="base-info">
        <p class="info-title">{{ $t('lang.user.replenish.title') }}</p>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.name') }}<em>{{ $t('lang.user.index.must') }}</em></div>
          <div class="answer">
            <input type="text" :placeholder="$t('lang.placeholder.name')" class="input" v-model="form.nickname">
            <div class="remark">
              <div v-for="(item,index) in userMark" :class="{'on':index+1==form.call}" :key="index" @click="call(index,'call')">{{ item }}</div>
            </div>
          </div>
        </div>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.member') }}</div>
          <div class="answer">{{ userInfo.vip_level }}</div>
        </div>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.email') }}<em>{{ $t('lang.user.index.must') }}</em></div>
          <div class="answer">
            <p>{{ userInfo.email }}</p>
          </div>
        </div>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.phone') }}<em>{{ $t('lang.user.index.must') }}</em></div>
          <div class="answer">
            <template v-if="!userInfo.mobile"><p class="text" @click="showDialog(0)">{{ $t('lang.placeholder.phone') }}</p></template>
            <template else><p @click="showDialog(0)">{{ userInfo.mobile }}</p></template>
          </div>
        </div>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.nationality') }}<em>{{ $t('lang.user.index.must') }}</em></div>
          <div class="answer">
            <input type="text" :placeholder="$t('lang.placeholder.nationality')" class="input" v-model="form.country">
          </div>
        </div>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.sex') }}</div>
          <div class="answer">
            <div class="remark sex">
              <div v-for="(item,index) in userSex" :class="{'on':index+1==form.sex}" :key="index" @click="call(index,'sex')">{{ item }}</div>
            </div>
          </div>
        </div>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.weixin') }}</div>
          <div class="answer">
            <input type="text" :placeholder="$t('lang.placeholder.weixin')" class="input" v-model="form.weixin">
          </div>
        </div>
        <div class="items">
          <div class="label">{{ $t('lang.user.index.skype') }}</div>
          <div class="answer">
            <input type="text" :placeholder="$t('lang.placeholder.skype')" class="input" v-model="form.skype">
          </div>
        </div>
      </div>
    </div>
    <div class="btn theme" @click="submit">{{ $t('lang.btn.submit') }}</div>
    <template v-if="dialogShow">
      <edit-dialog :title="dialogTitle" @on-close="dialogShow = false" @on-submit="onSubmit">
        <template v-if="dialogType === 0">
          <div class="dialog-input">
            <input :placeholder="dialogConfig[0].placeholder" v-model="editData.mobile.val" type="text">
          </div>
          <get-code @on-change="onInputChange($event, 'mobile')" :step="editData.mobile.codeStep"
                    @on-send="sendCode('mobile')" :cls="true"></get-code>
          <div class="dialog-input">
            <input :placeholder="dialogConfig[0].placeholder1" v-model="editData.mobile.password" type="password" >
          </div>
        </template>
        <template v-if="dialogType === 1">
          <div class="dialog-input">
            <input :placeholder="dialogConfig[1].placeholder" v-model="editData.email.val" type="text" >
          </div>
          <get-code @on-change="onInputChange($event, 'email')" :step="editData.email.codeStep"
                    @on-send="sendCode('email')" :cls="true"></get-code>
          <div class="dialog-input">
            <input :placeholder="dialogConfig[1].placeholder1" v-model="editData.email.password" type="password">
          </div>
        </template>
        <template v-if="dialogType === 2">
          <div class="dialog-input">
            <input :placeholder="dialogConfig[2].placeholder" v-model="editData.password.val" type="password">
          </div>
          <div class="dialog-input">
            <input :placeholder="dialogConfig[2].placeholder1" v-model="editData.password.pwd" type="password" >
          </div>
          <div class="dialog-input">
            <input :placeholder="dialogConfig[2].placeholder2" v-model="editData.password.repwd" type="password" >
          </div>
        </template>
      </edit-dialog>
    </template>
  </div>
</template>

<script>
    import {mapMutations, mapActions,mapState} from 'vuex'
    import {isPhone, toast} from '../../assets/js/tool'
    import editDialog from '../../components/user/editDialog'
    import getCode from '../../components/user/getCode'
    import avatarUpload from '../../components/user/avatarUpload'
    export default {
      components:{
        avatarUpload,editDialog,getCode
      },
      data(){
        return {
          userMark :this.$t('lang.user.replenish.call'),
          userSex:[this.$t('lang.user.index.man'),this.$t('lang.user.index.woman'),this.$t('lang.user.index.noman')],
          editData: {
            type:1,
            // vip_level: "个人会员",
            mobile: {
              val: '',
              code: '',
              codeStep: 1,
              password: ''
            },
            email: {
              val: '',
              code: '',
              codeStep: 1,
              password: ''
            },
            password: {
              val: '',
              pwd: '',
              repwd: ''
            }
          },
          form:{
            nickname: '', // 姓名
            call: "1", // 称呼
            country : '中国', // 国籍
            sex: "1", // 性别
            weixin : '', //微信号
            skype: '' //skype账号
          },
          dialogShow: false,
          dialogTitle: '',
          dialogType: 0,
          dialogConfig: [
            {title: this.$t('lang.placeholder.phone'), placeholder: this.$t('lang.placeholder.phone'), placeholder1: this.$t('lang.placeholder.setNewPass')},
            {title: this.$t('lang.placeholder.email'), placeholder: this.$t('lang.placeholder.email'), placeholder1: this.$t('lang.placeholder.setNewPass')},
            {title: this.$t('lang.placeholder.changePassword'), placeholder: this.$t('lang.placeholder.oldpassword'), placeholder1: this.$t('lang.placeholder.newpassword'), placeholder2: this.$t('lang.placeholder.newpassword')}
          ],
        }
      },
      head(){
        return {
          title:this.$t('lang.title.PersonalCenter')
        }
      },
      computed:{
        ...mapState(['userInfo'])
      },
      created(){
        this.init()
      },
      methods:{
        ...mapActions([
          'completeInfo',
          'getUserInfo',
          'uploadAvatar',
          'sendMobileCode',
          'sendEmailCode',
        ]),
        ...mapMutations(['SET_USER_INFO']),
        uploadFile(file) {
          let self = this ;
          let param = new FormData();
          param.append('file', file, 'file_' + Date.parse(new Date()) + '.jpg');
          this.uploadAvatar(param).then(res => {
            if (res.status === 'error') {
              return false;
            }
            toast(res.msg);
            self.init()
            this.$emit('on-update');
          })
        },
        showDialog(type) {
          this.dialogShow = true;
          this.dialogType = type;
          this.dialogTitle = this.dialogConfig[type].title;
        },
        onInputChange(val, type) {
          this.editData[type].code = val;
        },
        sendCode(type) {
          let fn = type === 'mobile' ? 'sendMobileCode' : 'sendEmailCode';
          if (!this.editData[type].val) {
            toast(type === 'mobile' ? this.$t('lang.placeholder.phone') : this.$t('lang.placeholder.email'));
            return false;
          }
          let prams = {};
          if (type === 'mobile') {
            if (!isPhone(this.editData.mobile.val)) {
              toast(this.$t('lang.placeholder.iphoneError'));
              return false;
            }
            prams = {mobile: this.editData.mobile.val};
          } else {
            if (
                !isEmail(this.editData.email.val)) {
                toast(this.$t('lang.placeholder.emailError'));
                return false;
              }
              prams = {email: this.editData.email.val};
            }

          this[fn](prams).then(res => {
            if (res.status === 'error') {
              return false;
            }
            toast(res.msg);
          })
        },
        onSubmit() {
          if (this.dialogType === 0) {
            this.editMobile();
          } else if (this.dialogType === 1) {
            this.editEmail();
          } else if (this.dialogType === 2) {
            this.editPassword();
          }
        },
        init(){
          this.getUserInfo().then(res => {
            if (res.status === 'error') {
              return false;
            }
            this.data = res.data || {};
            let userInfo = res.data;
            this.SET_USER_INFO(userInfo);
          })
        },
        submit(){
          let info = this.editData;
          let form = this.form;
          if(!form.nickname.length){
            toast(this.$t('lang.user.replenish.mustName'));
            return false
          }
          if(!form.country.length){
            toast(this.$t('lang.user.replenish.contry'));
            return false
          };
          this.completeInfo(this.form).then(res => {
            if (res.status === 'error') {
              return false;
            }
            this.$router.push('/user');
          })

        },
        call(index,type){
          if(type === 'call'){
            this.form.call = index+1 ;
          }else if(type ==='sex'){
            this.form.sex = index+1 ;
          }
        },
        editMobile() {
          if (!this.editData.mobile.val) {
            toast(this.$t('lang.placeholder.phone'));
            return false;
          }
          if (!isPhone(this.editData.mobile.val)) {
            toast(this.$t('lang.placeholder.iphoneError'));
            return false;
          }
          if (this.editData.mobile.code.length !== 6) {
            toast(this.$t('lang.common.email6'));
            return false;
          }
          if (!this.editData.mobile.password) {
            toast(this.$t('lang.placeholder.importpass'));
            return false;
          }
          this.changeMobile({
            mobile: this.editData.mobile.val,
            code: this.editData.mobile.code,
            password: this.editData.mobile.password
          }).then(res => {
            if (res.status === 'error') {
              return false;
            }
            toast(res.msg);
            this.dialogShow = false;
            this.init();
          })
        },
        editEmail() {
          if (!this.editData.email.val) {
            toast(this.$t('lang.placeholder.email'));
            return false;
          }
          if (!isEmail(this.editData.email.val)) {
            toast(this.$t('lang.placeholder.emailError'));
            return false;
          }
          if (this.editData.email.code.length !== 6) {
            toast(this.$t('lang.common.email6'));
            return false;
          }
          if (!this.editData.email.password) {
            toast(this.$t('lang.placeholder.importpass'));
            return false;
          }
          this.changeEmail({
            email: this.editData.email.val,
            code: this.editData.email.code,
            password: this.editData.email.password
          }).then(res => {
            if (res.status === 'error') {
              return false;
            }
            toast(res.msg);
            this.dialogShow = false;
            this.init();
          })
        },
        editPassword() {
          if (!this.editData.password.val) {
            toast(this.$t('lang.common.oldpassword'));
            return false;
          }
          if (!this.editData.password.pwd) {
            toast(this.$t('lang.common.newpassword'));
            return false;
          }
          if (this.editData.password.pwd.length < 6) {
            toast(this.$t('lang.common.pass6'));
            return false;
          }
          if (this.editData.password.pwd !== this.editData.password.repwd) {
            toast(this.$t('lang.common.passMsgerr'));
            return false;
          }
          this.changePassword({
            oldpassword: this.editData.password.val,
            newpassword: this.editData.password.pwd
          }).then(res => {
            if (res.status === 'error') {
              return false;
            }
            toast(res.msg);
            this.dialogShow = false;
          })
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";
  .information {
    .dialog-input{
      height: 100px;
      display: flex;
      position: relative;
      &:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height:2px;
        background: #eee;
      }
      input{
        flex: 1;
        line-height: 100px;
        background: transparent;
        border: none;
        outline: none;
        text-indent: 20px;
        font-size: 36px;
        color: #333;
        &::-webkit-input-placeholder{
          color: #999;
        }
      }
    }
    background: #f6f6f6;
    padding-top: 135px;
    .btn{
      margin:44px 50px 0;
    }
    .userImg{
      display: block;
      width: 120px;
      margin: 0 auto 58px;
      .userName{
        font-size: 30px;
        color: #333;
        text-align: center;
        margin-top: 20px;
        line-height: 30px;
        min-height: 30px;
      }
      .item{
        position:relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
      }
      img{
        width: 100%;
        height: 100%;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .base-info {
      background: #fff;
      padding: 22px 22px 52px;
      border: 1px solid #e5e5e5;
      .info-title {
        font-size: 40px;
        margin: 10px 0 20px;
        color:#333;
      }
      .items {
        font-size: 0;
        line-height: 85px;
        border-top: 1px solid #f6f6f6;
        text-align: left;
        position: relative;
        display: flex;
        justify-content: space-between;
        * {
          font-size: @baseFont;
        }
        .label {
          display: inline-block;
          vertical-align: middle;
          width:30%;
          color: #999999;
          em{
            color: #de7116;
            font-style: normal;
          }
        }
        .answer{
          line-height: 85px;
          font-size: 28px;
          color: #dd7116;
          flex: 1;
          .text{
            color: #d8d8d8;
          }
        }
        .remark{
          display: flex;
          justify-content: space-between;
          flex-wrap:wrap;
          margin-top: 20px;
          &.sex{
            flex-wrap: nowrap;
            div{
              width: 30%;
            }
          }
          div{
            width: 48%;
            height: 56px;
            text-align: center;
            line-height: 56px;
            font-size: 24px;
            color: #999999;
            background: #f6f6f6;
            margin-bottom: 16px;
            &.on{
              background: #de7116;
              color: #fff;
            }
          }
        }
        .input{
          display: block;
          width: 100%;
          height: 60px;
          line-height: 60px;
          margin-top: 10px;
          border: none;
          font-size: 28px;
          color: #999999;
          outline: none;
          &:focus{
            border: none;
          }
          &::-webkit-input-placeholder{
            color: #d8d8d8;
          }
        }
      }
    }
  }
  .dialog{
    color: #333;
    .title{
      font-weight:normal;
    }
    /*.mint-cell{*/
      /*background:transparent;*/
      /*.mint-field-core {*/
        /*appearance: none;*/
        /*border-radius: 0;*/
        /*border: 0;*/
        /*flex: 1;*/
        /*outline: 0;*/
        /*line-height: 1.6;*/
        /*font-size: inherit;*/
        /*width: 100%;*/
      /*}*/
    /*}*/

  }
</style>
