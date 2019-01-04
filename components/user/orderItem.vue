<template>
  <div class="order-main">
    <div class="order-items" v-for="item in list" :key="item.order_id">
      <div class="order-num">
        <span>{{ $t('lang.book.order.activity.number') }} {{ item.order_id }}</span>
        <!--<span v-if="item.cancel" class="cancel">取消订单</span>-->
      </div>
      <div class="info-wrapper">
        <div class="img-wrapper">
          <img src="~/assets/img/orderimg.jpg">
        </div>
        <div class="info">
          <p class="title"><span>{{ typeFormat(item.type) }}</span></p>
          <p class="text" v-if="item.data.category || item.data.title">{{ item.data.category || "" }}<span v-if="item.data.category">&nbsp;</span>{{ item.data.title || "" }}</p>
          <p class="time">{{ $t('lang.user.order.cTime') }}&nbsp;{{ item.create_time }}</p>
          <p class="state"><span>{{ stateFormat(item.state == 5 ? 4 : item.state) }}</span><span class="price">￥{{ item.price }}</span></p>
        </div>
      </div>
      <div class="btn-box">
        <a class="left" href="javascrpt:;" v-if="item.cancel" @click="cancel(item.order_id,item)">{{ $t('lang.btn.cancelOrder') }}</a>
        <a class="left" href="javascrpt:;" v-if="item.state===4" @click="goPJ(item)">{{ $t('lang.user.order.evaluate') }}</a>
        <a class="theme common-submit-btn" href="javascrpt:;" @click="goDetail(item)"><i></i>{{ $t('lang.btn.orderdetail') }}</a>
      </div>
    </div>

    <cancel :cancelShow="cancelShow" @on-cancel="onCancel" :orderId="orderId" :orderItem="orderItem"></cancel>
  </div>
</template>

<script>

    import {mapActions} from 'vuex'
    import cancel from '../../components/order/cancel';

    export default {
      components:{
        cancel
      },
      props: {
        list: {
          type: Array,
          default: () => {
            return []
          }
        },
        order:{
          type: Boolean,
          default: () => {
            return true
          }
        }
      },
      data(){
        return {
          cancelShow:false,
          orderId:"",
          orderItem:{}
        }
      },
      methods:{
        ...mapActions(['orderList','cancelOrder','getOrderDetail']),
        // 0待支付，1待审核，2已审核，3进行中，4已完成，5已评价，6已取消，7申请取消中
        cancel(id,item){ //去取消订单
          // order_id      订单ID
          // reason        取消订单的原因，已支付订单必传
          this.cancelShow = true;
          this.orderId = id;
          this.orderItem = item;
        },
        goDetail(item){ //去订单详情
          var arr = [
            '',
            'office',
            'room',
            'talks',
            'meeting',
            'question',
            'service',
            'activity'
          ]
          this.$router.push({
            path: '/book/order/' + arr[item.type],
            query: {
              id: item.order_id,
              state: 'details',
              user: 'true'
            }
          })
        },
        onCancel(bool){
          this.cancelShow = bool ;
        },
        goPJ(item){ //去评价
          localStorage.setItem('goOrderPosition',document.documentElement.scrollTop)

          // let category = [];
          let category_str = '';
          switch (item.type) {
            case 7:
              category_str = item.data.title;
              break;
            case 6:
              category_str = item.data.first + '——' +  item.data.second + '——' +  item.data.title;
              break;
            case 5:
            case 4:
            case 3:
              category_str = item.data.category + '——' +  item.data.title;
              break;
            case 2:
              category_str = item.data.title; // TODO  <p>{{ typearr[item.data.size] }}（{{ item.data.people }}）{{ $t('lang.common.person') }}</p>
              break;
            case 1:
              category_str = item.data.title; // TODO <p>{{ huiyiarr[item.data.type] }}</p>     <p>{{ item.data.station }}{{ $t('lang.common.station') }}</p>
            default:
              break;
          }
          // item.data.first && category.push(item.data.first);
          // item.data.second && category.push(item.data.second);
          // item.data.title && category.push(item.data.title);

          let orderP = {
            id : item.order_id,
            time : item.create_time,
            state:item.state,
            type : item.type,
            category: category_str,
            flag : false,
            item : item
          }
          this.$emit('orderFlag',orderP)
        },
        stateFormat(val){
          return this.$t('lang.common.orderState')[val];
        },
        typeFormat(val) {
          return this.$t('lang.common.orderArr')[val];
        },
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .order-main{
    width: 100%;
  }
</style>
