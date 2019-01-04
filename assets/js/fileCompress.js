function photoCompress(file, w, objDiv) {
  // 三个参数
  // file：一个是文件(类型是图片格式)，
  // w：一个是文件压缩的后宽度，宽度越小，字节越小
  // objDiv：一个是容器或者回调函数
  var ready = new FileReader();
  // 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
  ready.readAsDataURL(file);
  ready.onload = function() {
    var re = this.result;
    canvasDataURL(re, w, objDiv)
  }
}

function canvasDataURL(path, obj, callback) {
  var img = new Image();
  img.src = path;
  img.onload = function() {
    var that = this;
    // 默认按比例压缩
    var w = that.width;
    var h = that.height;
    var scale = w / h;
    if (w > 800) {
      w = 800;
    }
    w = obj.width || w;
    h = obj.height || (w / scale);
    // 默认图片质量为0.7
    var quality = 0.7;
    // 生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute('width');
    anw.nodeValue = w;
    var anh = document.createAttribute('height');
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    callback(base64);
  }
}

function convertBase64UrlToBlob(urlData) {
  var arr = urlData.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

export {
  photoCompress,
  canvasDataURL,
  convertBase64UrlToBlob
}
