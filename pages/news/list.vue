<template>
  <div class="news-list news-wrapper">
    <div class="inner-block">
      <div class="headline" v-if="data.category">
        <p>{{ data.category.title }}</p>
      </div>

      <item :list="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"></item>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import item from '~/components/news/item'
  import {loadingShow,loadingHide} from '~/assets/js/tool.js'
  export default {
    components: {
      item
    },
    data() {
      return {
        data: {},
        list:[],
        page: 1,
        pagesize:0,
        cid: '',
        loadFlag:false,
        loading:true
      }
    },
    head(){
      return {
        title:this.$t('lang.title.news')
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      ...mapActions(['newsList']),
      getList() {
        this.cid = this.$route.query.cid;
        if(!this.loadFlag){
          loadingShow()
        }
        if (!this.cid) {
          return false;
        }
        this.newsList({
          page: this.page,
          cid: this.cid
        }).then(res => {
          if (res.status === 'error') {
            return false;
          }
          this.pagesize = res.data.pagesize;
          this.data = res.data;
          if(res.data.list.length > 0){
            this.list=this.list.concat(this.data.list);
            this.loadFlag = true;
            this.loading = false;
          }else{
            this.loadFlag = false;
          }
          if(this.loadFlag){
            loadingHide()
          }
        })
      },
      loadMore(){
        if(this.list.length % this.pagesize !== 0 ){
          return false
        }
        if(this.loadFlag){
          this.page++;
          this.loading = true;
          this.getList()
        }
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  @import '../../assets/less/common';
  .news-list {
    .headline {
      font-size: 60px;
      font-weight: bold;
      border-bottom: 1px solid @borderColor;
      padding-bottom: 20px;
      margin: 30px 0 10px;
    }
    /*.loadmore,.loadText{*/
      /*display: block;*/
      /*width: 100%;*/
      /*height: 80px;*/
      /*background: #dd7116;*/
      /*text-align: center;*/
      /*line-height: 80px;*/
      /*border-radius:8px;*/
      /*font-size: 28px;*/
      /*color: #fff;*/
      /*margin-top: 40px;*/
    /*}*/
    /*.loadText{*/
      /*background: transparent;*/
      /*color: #333;*/
    /*}*/
  }
</style>
