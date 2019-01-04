<template>
  <div class="block-wrap">
    <div class="block" v-for="(item,index) in list" :key="index" @click="viewDetail(item.id)" :class="{'end':item.state === 0}" >
      <div class="block-img">
        <img :src="item.cover" :alt="item.title">
      </div>
      <div class="inner">
        <div class="main">
          <div class="date">
            <span class="day">{{ day(item.start_time) }}</span>
            <span class="mon">{{ mon(item.start_time) }}</span>
          </div>
          <div class="info">
            <p class="title">{{ item.title }}</p>
            <p>{{ $t('lang.book.activity.price2') }}：<span class="fee">￥{{ item.price }} {{ $t('lang.book.activity.price_unit') }}</span></p>
            <p>{{ $t('lang.book.activity.side') }}：<span class="place">{{ item.address }}</span></p>
          </div>
        </div>
        <div class="text" v-html="item.intro"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
        list:{
          type:Array,
          default : () =>{
            return []
          }
        }
      },
      data(){
        return {
          month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
        }
      },
      created(){
      },
      methods:{
        viewDetail(id) {
          if (!id) {
            return false;
          }
          this.$router.push('/book/activity/detail?id=' + id);
        },
        day(t){
          if (!t) {
            return false;
          }
          return new Date(t*1000).getDate()
        },
        mon(t){
          if (!t) {
            return false;
          }
          return this.month[new Date(t*1000).getMonth()]
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">

</style>
