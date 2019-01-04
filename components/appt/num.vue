<template>
  <div class="num-controller">
    <span @click="reduce" class="controller reduce"><i class="iconfont icon-jiansvg"></i></span>
    <mt-field type="number" v-model="num" @input="inp"></mt-field>
    <span @click="add" class="controller add"><i class="iconfont icon-jia"></i></span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 0
      }
    },
    methods: {
      inp(){
        this.$emit('on-change', this.num);
      },
      reduce() {
        if (this.num > 0) {
          this.num --;
        } else {
          this.num = 0;
        }
        this.$emit('on-change', this.num);
      },
      add() {
        this.num ++;
        this.$emit('on-change', this.num);
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../assets/less/common";

  .num-controller {
    font-size: 0;
    .controller {
      display: inline-block;
      vertical-align: middle;
      width: 70px;
      height: 60px;
      line-height: 64px;
      text-align: center;
      background: #eeeeee;
      .iconfont {
        font-size: 40px;
        color: #b5b5b5;
      }
    }
    .mint-cell {
      display: inline-block;
      vertical-align: middle;
      width: 160px;
      height: 60px;
      min-height: auto;
      background: #535353;
      input {
        line-height: 64px;
        text-align: center;
        font-size: @baseFont;
        color: #fff;
        background: transparent;
      }
    }
  }
</style>
