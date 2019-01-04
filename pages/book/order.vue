<template>
  <!--订单详情 订单页面父路由-->
  <div class="order-detail">
    <div class="detail-title">
      <div class="point">
        <div class="inner-block">
          <img src="~/assets/img/order-icon.png" alt="">
          <span v-if="$route.query.state === 'details'">{{ $t('lang.book.order.title1') }}</span>
          <span v-else>{{ $t('lang.book.order.title2') }}</span>
        </div>
      </div>
      <p class="text" v-if="$route.query.state !== 'details'">{{ $t('lang.book.order.content') }}</p>
    </div>
    <nuxt-child @show-model="cancelShow = true"></nuxt-child>
    <!--<edit-dialog title="请选择取消订单的原因"></edit-dialog>-->
    <c-pop :cShow="isShwoyhm" @cPopClose="cPopClose" :cTitle="$t('lang.model.model1.title3')">
      <div class="pop-inner">
        <input type="text" v-model="text" :placeholder="$t('lang.model.model1.title3')">
      </div>
      <div class="pop-btn" @click="tijiao">{{ $t('lang.btn.submit') }}</div>
    </c-pop>
    <cancel :cancelShow="cancelShow" @on-cancel="cancelShow = false"></cancel>
  </div>
</template>

<script>
  import {toast} from "~/assets/js/tool";
  import editDialog from '~/components/user/editDialog';
  import { mapActions, mapMutations, mapState } from 'vuex';
  import cPop from '~/components/common/c-pop';
  import cancel from '~/components/order/cancel';
  export default {
      components: {
        editDialog,
        cPop,
        cancel
      },
      data() {
        return {
          // 优惠码
          text: '',
          cancelShow: false
        }
      },
      computed: {
        ...mapState(['payurl', 'isShwoyhm'])
      },
      created() {
        this.orderDetailApi();
      },
      mounted(){
        setTimeout(()=>{
          document.documentElement.scrollTop = 0
        },60)
      },
      methods: {
        ...mapActions([ 'orderDetail', 'wechat']),
        ...mapMutations([ 'setOrderData', 'setIsShwoyhm']),
        tijiao() {
          if (!this.text) {
            toast(this.$t('lang.placeholder.yhm'))
            return;
          }
          var obj = JSON.parse(localStorage.getItem('pjson'));
          // 提交二维码
          this.wechat({ order_id: obj.id, type: 5, client: 'mobile', code: this.text }).then((res) => {
            if (res.status === 'error') {
              return false;
            }
            var data = res.data;
            this.setIsShwoyhm({ bool: false })
            this.$router.push({
              path: '/book/payed',
              query: {
                id: obj.id,
                type: obj.type
              }
            })
          })
        },
        cPopClose() {
          this.setIsShwoyhm({ bool: false })
        },
        orderDetailApi() {
          this.orderDetail({ order_id: this.$route.query.id,msg: true }).then((res) => {
            if (res.status == 'error') {
              return false;
            }
            let data = res.data;
            data.__this = this;
            this.setOrderData(data);
          })
        },
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .text {
    font-size: 24px;
    color: #333;
    padding-left:50px;
  }
</style>
