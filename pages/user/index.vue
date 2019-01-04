<template>
  <div class="user-center user-center-wrapper">
    <c-head @on-update="init"></c-head>
    <div class="inner-block">
      <div class="base-info">
        <p class="info-title">{{ $t('lang.user.index.basic') }}</p>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.name') }}<em>{{ $t('lang.user.index.must') }}</em></span>
          <span class="text">{{ data.nickname }} <em>{{ callText(data.call) || "" }}</em></span>
          <i class="edit iconfont icon-xiugai" @click="editNickname"></i>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.member') }}</span>
          <span class="text">{{ data.vip_level }}</span>
          <span class="leaveVip" @click="toVip">{{ $t('lang.user.index.upgrade') }}</span>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.email') }}<em>{{ $t('lang.user.index.must') }}</em></span>
          <span v-if="data.email" class="text">{{ data.email }}</span>
          <span v-else class="unset">{{ $t('lang.user.index.nowrite') }}</span>
          <i class="edit iconfont icon-xiugai" @click="showDialog(1)"></i>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.phone') }}<em>{{ $t('lang.user.index.must') }}</em></span>
          <span v-if="data.mobile&&data.mobile!==$t('lang.user.index.nowrite')" class="text">{{ data.mobile }}</span>
          <span v-else class="unset">{{ $t('lang.user.index.nowrite') }}</span>
          <i class="edit iconfont icon-xiugai" @click="showDialog(0)"></i>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.nationality') }}<em>{{ $t('lang.user.index.must') }}</em></span>
          <template v-if="isEditCountry">
            <!--<mt-field placeholder="国籍" v-model="editData.country"></mt-field>-->
            <input type="text" :placeholder="$t('lang.user.index.nationality')" v-model="editData.country" class="items-input">
          </template>
          <template v-else>
            <span v-if="data.country" class="text">{{ data.country }}</span>
            <span v-else class="unset">{{ $t('lang.user.index.nowrite') }}</span>
          </template>
          <i v-if="!isEditCountry" class="edit iconfont icon-xiugai" @click="editCountry"></i>
          <span class="save" v-else>
            <em @click="cancelBaseInfo('country')">{{ $t('lang.btn.off') }}</em>
            <em @click="saveBaseInfo('country')">{{ $t('lang.btn.save') }}</em>
          </span>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.password') }}<em>{{ $t('lang.user.index.must') }}</em></span>
          <span class="text pw">******</span>
          <i class="edit iconfont icon-xiugai" @click="showDialog(2)"></i>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.sex') }}</span>
          <span v-if="data.sex" class="text">{{ (data.sex === 1 || data.sex === $t('lang.user.index.man')) ? $t('lang.user.index.man') : $t('lang.user.index.woman') }}</span>
          <span v-else class="unset">{{ $t('lang.user.index.nowrite') }}</span>
          <i class="edit iconfont icon-xiugai" @click="sheetVisible = true"></i>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.weixin') }}</span>
          <template v-if="isEditWechat">
            <!--<mt-field placeholder="请输入微信账号" v-model="editData.wechat"></mt-field>-->
            <input type="text" :placeholder="$t('lang.placeholder.weixin')" v-model="editData.wechat" class="items-input">
          </template>
          <template v-else>
            <span v-if="data.weixin" class="text">{{ data.weixin }}</span>
            <span v-else class="unset">{{ $t('lang.user.index.nowrite') }}</span>
          </template>
          <i v-if="!isEditWechat" class="edit iconfont icon-xiugai" @click="editWechat"></i>
          <span class="save" v-else>
            <em @click="cancelBaseInfo('wechat')">{{ $t('lang.btn.off') }}</em>
            <em @click="saveBaseInfo('wechat')">{{ $t('lang.btn.save') }}</em>
          </span>
        </div>
        <div class="items">
          <span class="label">{{ $t('lang.user.index.skype') }}</span>
          <template v-if="isEditSkype">
            <!--<mt-field placeholder="请输入Skype账号" v-model="editData.skype"></mt-field>-->
            <input type="text" placeholder="$t('lang.placeholder.skype')" v-model="editData.skype" class="items-input">
          </template>
          <template v-else>
            <span v-if="data.skype" class="text">{{ data.skype }}</span>
            <span v-else class="unset">{{ $t('lang.user.index.nowrite') }}</span>
          </template>
          <i v-if="!isEditSkype" class="edit iconfont icon-xiugai" @click="editSkype"></i>
          <span class="save" v-else>
            <em @click="cancelBaseInfo('skype')">{{ $t('lang.btn.off') }}</em>
            <em @click="saveBaseInfo('skype')">{{ $t('lang.btn.save') }}</em>
          </span>
        </div>
      </div>
    </div>
    <template v-if="dialogShow">
      <edit-dialog :title="dialogTitle" @on-close="dialogShow = false" @on-submit="onSubmit">
        <template v-if="dialogType === 0">
          <!--mt-field :placeholder="dialogConfig[0].placeholder" v-model="editData.mobile.val"></mt-field-->
          <div class="dialog-input">
            <input :placeholder="dialogConfig[0].placeholder" v-model="editData.mobile.val" type="text">
          </div>
          <get-code @on-change="onInputChange($event, 'mobile')" :step="editData.mobile.codeStep"
                    @on-send="sendCode('mobile')" :cls="true"></get-code>
          <!--mt-field type="password" :placeholder="dialogConfig[0].placeholder1"
                    v-model="editData.mobile.password"></mt-field-->
          <div class="dialog-input">
            <input :placeholder="dialogConfig[0].placeholder1" v-model="editData.mobile.password" type="password" >
          </div>
        </template>
        <template v-if="dialogType === 1">
          <div class="dialog-input">
            <input :placeholder="dialogConfig[1].placeholder" v-model="editData.email.val" type="text" >
          </div>
          <!--<mt-field type="password" :placeholder="dialogConfig[1].placeholder" v-model="editData.email.val"></mt-field>-->
          <get-code @on-change="onInputChange($event, 'email')" :step="editData.email.codeStep"
                    @on-send="sendCode('email')" :cls="true"></get-code>
          <!--mt-field type="password" :placeholder="dialogConfig[1].placeholder1"
                    v-model="editData.email.password"></mt-field-->
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
          <!--mt-field type="password" :placeholder="dialogConfig[2].placeholder"
                    v-model="editData.password.val"></mt-field-->
          <!--mt-field type="password" :placeholder="dialogConfig[2].placeholder1"
                    v-model="editData.password.pwd"></mt-field-->
          <!--mt-field type="password" :placeholder="dialogConfig[2].placeholder2"
                    v-model="editData.password.repwd"></mt-field-->
        </template>
      </edit-dialog>
    </template>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>

    <c-pop :cShow="cShow" @cPopClose="cPopClose" :cTitle="$t('lang.user.index.name')">
      <div class="pop-inner">
        <input type="text" v-model="editName" :placeholder="$t('lang.placeholder.name')">
        <ul class="pop-menu-item">
          <li :class="{'item-on':index===editNameIndex}" v-for="(item,index) in editNameArr" :key="index" @click="editNameChoose(index)">{{ item }}</li>
        </ul>
      </div>
      <div class="pop-btn" @click="saveEditName">{{ $t('lang.btn.submit') }}</div>
    </c-pop>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import editDialog from '../../components/user/editDialog'
  import getCode from '../../components/user/getCode'
  import {isPhone, isEmail, toast} from '../../assets/js/tool'
  import cHead from '../../components/user/cHead'
  import cPop from '../../components/common/c-pop'

  export default {
    components: {
      editDialog, getCode, cHead,cPop
    },
    data() {
      return {
        data: {},

        cShow:false,
        editName:"",
        editNameArr:this.$t('lang.user.replenish.call'),
        editNameIndex:0,

        isEditName: false,
        isEditWechat: false,
        isEditSkype: false,
        isEditCountry: false,

        dialogShow: false,
        dialogTitle: '',
        dialogType: 0,
        dialogConfig: [
          {title: this.$t('lang.placeholder.phone'), placeholder: this.$t('lang.placeholder.phone'), placeholder1: this.$t('lang.placeholder.setNewPass')},
          {title: this.$t('lang.placeholder.email'), placeholder: this.$t('lang.placeholder.email'), placeholder1: this.$t('lang.placeholder.setNewPass')},
          {title: this.$t('lang.placeholder.changePassword'), placeholder: this.$t('lang.placeholder.oldpassword'), placeholder1: this.$t('lang.placeholder.newpassword'), placeholder2: this.$t('lang.placeholder.confirmpassword')}
        ],
        editData: {
          nickname: '',
          wechat: '',
          skype: '',
          sex: '',
          country:"",
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

        sheetVisible: false,
      }
    },
    middleware:'loginJudge',
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created(){
      let _this = this;
      this.actions = [
        {
          name: this.$t('lang.user.index.man'), method: val => {
            _this.saveBaseInfo('sex', val.name);
          }
        },
        {
          name: this.$t('lang.user.index.woman'), method: val => {
            _this.saveBaseInfo('sex', val.name);
          }
        }
      ]
    },
    mounted() {
      if ((this.userInfo || {}).avatar) {
        this.data = this.userInfo;
      } else {
        this.init();
      }
    },
    methods: {
      ...mapMutations(['SET_USER_INFO']),
      ...mapActions([
        'getUserInfo',
        'changeMobile',
        'changeEmail',
        'changePassword',
        'sendMobileCode',
        'sendEmailCode',
        'saveInfo'
      ]),
      callText(num){
        return this.$t('lang.user.replenish.call')[num-1]
      },
      init() {
        this.getUserInfo().then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.data = res.data || {};
          let userInfo = res.data;
          this.SET_USER_INFO(userInfo);
        })
      },
      toVip() {
        this.$router.push('/clients');
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
        let prams = '';
        if (type === 'mobile') {
          if (!isPhone(this.editData.mobile.val)) {
            toast(this.$t('lang.placeholder.iphoneError'));
            return false;
          }
          prams = {mobile: this.editData.mobile.val};
        } else {
          if (!isEmail(this.editData.email.val)) {
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
      editNickname() {
        // this.editData.nickname = this.data.nickname;
        this.cShow = true;
      },
      editWechat() {
        this.editData.wechat = this.data.weixin;
        this.isEditWechat = true;
      },
      editCountry() {
        this.editData.country = this.data.country;
        this.isEditCountry = true;
      },
      editSkype() {
        this.editData.skype = this.data.skype;
        this.isEditSkype = true;
      },
      cancelBaseInfo(type){
        if (type === 'wechat') {
          this.isEditWechat = false;
        } else if (type === 'skype') {
          this.isEditSkype = false;
        } else if (type === 'country') {
          this.isEditCountry = false;
        }
      },
      saveBaseInfo(type, val) {
        let prams = {};
        if (type === 'nickname') {
          prams = {nickname: this.editData.nickname};
        } else if (type === 'wechat') {
          prams = {weixin: this.editData.wechat};
        } else if (type === 'skype') {
          prams = {skype: this.editData.skype};
        } else if (type === 'country') {
          prams = {country: this.editData.country};
        } else {
          if (!val) {
            return false;
          }
          prams = {sex: val === this.$t('lang.user.index.man') ? 1 : 2};
        }
        let self = this;
        this.saveInfo(prams).then(res => {
          if (res.status === 'error') {
            return false;
          }
          toast(res.msg);
          if (type === 'nickname') {
            this.isEditName = false;
          } else if (type === 'wechat') {
            this.isEditWechat = false;
          } else if (type === 'skype') {
            this.isEditSkype = false;
          } else if (type === 'country') {
            this.isEditCountry = false;
          }
          self.init();
        })
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
      },
      cPopClose(bool){
        this.cShow = bool;
      },
      editNameChoose(index){
        this.editNameIndex = index ;
      },
      saveEditName(){
        if(!this.editName.length){
          toast(this.$t('lang.placeholder.name'));
          return false;
        }
        let param = {//call 1先生 2小姐 3 女士 4教授
          nickname:this.editName,
          call:this.editNameIndex+1
        }
        this.saveInfo(param).then(res => {
          if (res.status === 'error') {
            return false;
          }
          toast(res.msg);
          this.cShow = false;
          this.init();
        })
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../assets/less/common";

  .user-center {
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
    .base-info {
      padding: 22px 22px 20px;
      .info-title {
        font-size: 40px;
        margin: 10px 0 20px;
      }
      .items {
        /*height: 85px;*/
        font-size: 0;
        line-height: 100px;
        border-top: 1px solid #f6f6f6;
        position: relative;
        * {
          font-size: @baseFont;
        }
        .label {
          display: inline-block;
          vertical-align: middle;
          white-space: nowrap;
          width: 33%;
          color: #999999;
          font-size:26px;
          em{
            font-style: normal;
            color: #dd7116;
          }
        }
        .save {
          color: @themColor;
          display: block;
          text-align:right;
          em{
            font-style: normal;
            display: inline-block;
            margin-right: 30px;
          }
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          width: 60%;
          &.pw {
            position: relative;
            top: 6px;
            line-height: 1;
          }
          em{
            font-style: normal;
            color: #dd7116;
          }
        }
        .unset {
          display: inline-block;
          vertical-align: middle;
          color: #cfcfcf;
        }
        .edit {
          position: absolute;
          top: 0;
          right: 0;
          text-align: right;
          &.iconfont {
            color: #cfcfcf;
            font-size: 40px;
          }
        }
        .leaveVip{
          position: absolute;
          top:20px;
          right: 0;
          white-space: nowrap;
          height: 44px;
          border: 1px solid #f3801a;
          text-align: center;
          line-height: 44px;
          color: #dd7116;
          font-size:26px;
          padding: 0 10px;
        }
        .items-input{
          display: inline-block;
          vertical-align: top;
          font-size: @baseFont;
          border:none;
          height: 96px;
          line-height:96px;
          border-bottom: 1px solid #f3f3f3;
          outline: none;
          background: transparent;
        }
        /*
        .mint-cell {
          display: inline-block;
          width:50%;
          vertical-align: middle;
          height: 85px;
          min-height: auto;
          line-height: 85px;
          .mint-cell-wrapper {
            padding: 0;
            margin-top: 20px;
            .placeholder(#cfcfcf);
            input {
              font-size: @baseFont;
              border-bottom: 1px solid #f3f3f3;
            }
          }
        }*/
      }
    }
  }
</style>
