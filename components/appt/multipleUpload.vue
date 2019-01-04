<template>
  <div class="multiple-upload">
    <div class="upload-list" v-for="item in uploadList" :key="item.name">
      <img :src="item.url" @click="viewImg(item.url)">
      <i class="iconfont icon-quxiao" @click.stop="handleRemove(item)"></i>
    </div>
    <div class="upload-box">
      <i class="iconfont icon-tubiaozhizuo-1"></i>
      <input type="file" accept="image/*" @change="handleBeforeUpload" ref="upload">
    </div>
    <div class="view-img" v-if="bigImg" :style="'background-image: url(' + bigImg + ')'">
      <!--<img :src="" alt="">-->
      <span @click="bigImg = ''">{{ $t('lang.btn.off2') }}</span>
    </div>
  </div>
</template>

<script>
  import {photoCompress, convertBase64UrlToBlob} from '../../assets/js/fileCompress'
  import {toast} from '../../assets/js/tool'

  export default {
    data() {
      return {
        uploadList: [],
        bigImg: ''
      }
    },
    mounted() {

    },
    methods: {
      handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file), 1);
      },
      viewImg(url) {
        this.bigImg = url;
      },
      handleBeforeUpload() {
        let file = this.$refs.upload.files[0];
        let _this = this;

        if (!this.repeatJudge(file)) {
          return false;
        }
        if (file.size / 1024 > 1025) {
          photoCompress(file, {
            quality: 0.5
          }, function (base64Codes) {
            file = convertBase64UrlToBlob(base64Codes);
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
              file.url = reader.result;
              _this.uploadList.push(file);
            }
            // _this.$emit('on-load', _this.uploadList);
          });
        } else {
          // 小于等于1M 原图上传
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function (e) {
            file.url = reader.result;
            _this.uploadList.push(file);
          }
        }
        this.$emit('on-load', this.uploadList);
        // 创建一个 FileReader 对象
        // let reader = new FileReader();
        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
        // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
        // 读取文件作为 URL 可访问地址
        // reader.readAsDataURL(file);
        // reader.onloadend = function (e) {
        //   file.url = reader.result;
        //   _this.uploadList.push(file);
        // }
      },

      repeatJudge(file) {
        let flag = true;
        (this.uploadList || []).forEach(item => {
          if (file.name === item.name) {
            toast(this.$t('lang.compon.up.tishi'));
            flag = false;
          }
          if (!flag) {
            return false;
          }
        });
        if (this.uploadList.length >= 5) {
          toast(this.$t('lang.compon.up.more'));
          return false;
        }
        return flag;
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .multiple-upload {
    overflow: hidden;
    .upload-list {
      float: left;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 210px;
      height: 148px;
      /*background: #101010;*/
      border: 1px dashed #ddd;
      overflow: hidden;
      margin: 0 20px 20px 0;
      img {
        max-width:80%;
        margin: 0 auto;
      }
      i {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 30px;
        line-height: 1;
        color: #000;
        background: #fff;
        border-radius: 50%;
        padding: 6px;
      }
    }
    .upload-box {
      float: left;
      position: relative;
      width: 210px;
      height: 148px;
      line-height: 145px;
      text-align: center;
      /*background: #fff;*/
      border: 1px dashed #ddd;
      i {
        font-size: 100px;
        color: #ccc;
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
  }
</style>
