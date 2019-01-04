<template>
  <div class="user-title">
    <h1 v-if="type === 'user'">Discover <br>a different world</h1>
    <h1 v-else>Discover a different <br>world</h1>
    <p>{{ $t("lang.user.news.look") }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">

</style>
