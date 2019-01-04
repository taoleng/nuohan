<template>
  <div class="service-detail order-detail">
    <div class="detail-title">
      <div class="point">
        <div class="inner-block">
          <img src="~/assets/img/order-icon.png" alt="">
          <span>订单详情</span>
        </div>
      </div>
    </div>
    <div class="inner-block">
      <div class="order-item">
        <i class="iconfont icon-dingdan"></i>
        <p>订单号</p>
        <div class="data">00015012623300</div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-huiyuanzhongxin_dingdanzhuangtai"></i>
        <p>订单状态</p>
        <div class="data">待审核</div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-leibie"></i>
        <div class="select-box">
          <p>请选择服务类别</p>
          <div>
            <span>签证服务</span>
            <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
          </div>
        </div>
        <div class="select-box">
          <p>请您选择需要办理的业务类型</p>
          <div>
            <span>签证服务</span>
            <span class="drop"><i class="iconfont icon-tubiaozhizuo-"></i></span>
          </div>
        </div>
      </div>
      <div class="order-item">
        <i class="iconfont icon-leixing"></i>
        <div class="btn-box">
          <p>请选择您需要办理的业务</p>
          <div class="on">工作就业</div>
          <div>创业投资</div>
          <div>商务活动</div>
          <div>旅游</div>
          <div>探亲访友</div>
          <div>团聚移民</div>
        </div>
      </div>
      <div class="order-item">
        <p>请选择您需要办理的业务</p>
        <img class="example" src="~/assets/img/file.jpg" alt="">
        <p class="date">预计完成时间为2019-10-29</p>
      </div>
      <div class="result">
        <div class="item">
          <p>受理人</p>
          <p>吴冰哲&emsp;15245878598</p>
        </div>
        <div class="item">
          <p class="title">业务流程</p>
          <div class="state">
            <span class="on">待审</span>
            <span>已审</span>
            <span>进行</span>
            <span>待评</span>
            <span>已完</span>
          </div>
        </div>
        <div class="item time-line-wrapper">
          <p class="title">业务消息</p>
          <div class="time-line">
            <span class="dot"></span>
            <div>
              <p class="time-p">2018-10-12   17:50:07</p>
              <p>这里显示回复内容</p>
            </div>
          </div>
          <div class="time-line">
            <span class="dot"></span>
            <div>
              <p class="time-p">2018-10-12   17:50:07</p>
              <p>这里显示回复内容</p>
            </div>
          </div>
        </div>
        <div class="item">
          <span>支付金额</span>
          <span class="pay-num">￥900</span>
        </div>
        <div class="item">
          <p class="title">支付方式</p>
          <div class="pay-methods">
            <div class="method">
              <img src="~/assets/img/alipay.png" alt="">
              <span>支付宝</span>
            </div>
          </div>
        </div>
        <div class="item">
          <p class="title agree">已同意《诺汉协议》《隐私政策》</p>
        </div>
        <a href="#" class="option-btn">取消订单</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      confirmOrder() {
        this.$router.push('/book/order/service')
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import "../../../assets/less/common";

  .service-detail {
    .order-item {
      .example {
        width: 212px;
        margin: 40px 0;
      }
      .date {
        color: @themColor;
      }
    }
    .result {
      .item {
        margin-bottom: 30px;
        &.time-line-wrapper {
          padding-top: 20px;
          .title {
            margin-bottom: 30px;
          }
        }
        .state {
          display: flex;
          justify-content: space-around;
          height: 50px;
          line-height: 56px;
          background: #eeeeee;
          border-radius: 25px;
          overflow: hidden;
          span {
            flex: 1;
            text-align: center;
            &.on {
              color: #fff;
              background: @themColor;
              border-radius: 25px;
            }
          }
        }
        .time-line {
          margin-bottom: 34px;
          .dot {
            float: left;
            display: inline-block;
            width: 18px;
            height: 18px;
            background: @themColor;
            border-radius: 50%;
          }
          > div {
            margin-left: 48px;
            padding-top: 2px;
            .time-p {
              color: @themColor;
              line-height: 18px;
              margin-bottom: 24px;
            }
          }
        }
      }
    }
  }
</style>
