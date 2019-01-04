<template>
  <input type="file" accept="image/*" @change="change" ref="upload">
</template>

<script>
  import {photoCompress, convertBase64UrlToBlob} from '../../assets/js/fileCompress'

  export default {
    data() {
      return {
        picValue: '',
        url: ''
      }
    },
    computed: {

    },
    mounted() {
      this.onVisibleChange();
    },
    methods: {
      onVisibleChange() {
        this.url = '';
        this.$refs.upload.value = '';
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL !== undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.URL !== undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      change(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.url = this.getObjectURL(this.picValue);
        let _this = this;
        // 大于1M，进行压缩上传
        if (this.picValue.size / 1024 > 1025) {
          photoCompress(this.picValue, {
            quality: 0.8
          }, function (base64Codes) {
            let bl = convertBase64UrlToBlob(base64Codes);
            _this.$emit('on-change', bl);
          });
        } else {
          // 小于等于1M 原图上传
          this.$emit('on-change', this.picValue);
        }
      }
    }
  }
</script>

<style lang='less' type="text/less">

</style>
