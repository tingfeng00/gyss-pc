<template>
  <div>
    <div class="jyWraper">
      <p class="upload-btn-droparea">把要上传的文件拖放到这里(请使用支持html5的浏览器)</p>
      <div class="btn-wraper">
        <el-button type="info" class="upload-btn-browse">选择文件...</el-button>
        <el-button type="info" class="upload-btn-start">开始上传</el-button>
        <el-button type="info" class="upload-btn-stop">暂停上传</el-button>
        <el-button type="info" class="upload-btn-delall" @click.native="delAll">清理</el-button>
      </div>
      <table class="table table-condensed" style="width:100%;margin:10px auto;">
        <thead>
          <tr class="rows">
            <th class="col-md-1"></th>
            <th class="col-md-2"></th>
            <th class="col-md-2"></th>
            <th class="col-md-1"></th>
            <th v-show="options.view" class="col-md-2"></th>
            <th class="col-md-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in vm.processList" :key="item.id">
            <td width="15">
              <span>{{index+1}}</span>
            </td>
            <td width="180">
              <span
                :title="item.name"
                style="text-overflow: ellipsis;word-break:break-all;overflow-x: hidden;overflow: hidden;"
              >{{item.name}}</span>
            </td>
            <td width="170">
              <!-- <div
                class="progress progress-striped active"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0"
              >
                <div
                  class="progress-bar progress-bar-success"
                  :style="'width:'+item.process+'%'"
                >{{item.process}}%</div>
              </div> -->
              <el-progress :text-inside="true" :stroke-width="20" :percentage="item.process"></el-progress>
              <div class="size">{{item.sizeStr}}</div>
            </td>
            <td width="75">
              <b>[{{item.statusTitle}}]</b>
              <p :class="item.msgClass">{{item.message}}</p>
            </td>
            <td v-show="options.view">
              <img style="width:96%;max-height:120px;" :src="item.url" />
            </td>
            <td>
              <el-button icon="el-icon-delete" class="btn-delete" @click.native="delFile(item.id)">
                取消
              </el-button>
              <el-button type="primary" class="btn-reload" icon="el-icon-refresh-right" @click.native="retry(item.id)">
                重新上传
              </el-button>
              <!-- <el-button type="primary" class="btn-reload" icon="el-icon-refresh-right" v-if="item.process == 100" @click.native="copy(index)">
                复制地址
              </el-button> -->
            </td>
          </tr>
          <tr>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import plupload from "plupload"

var pluploadStatusTilte = {
  1: "队列中",
  2: "上传中",
  4: "上传失败",
  5: "上传成功"
}
export default {
  name: "jyupload",
  props: ["options"],
  data () {
    return {
      vm: {
        processList: []
      },
      filesdic: {},
      videoArr: [],
      uploadAddressStr: ''
      // nameArr: []
    }
  },
  mounted () {
    let _ = this
    var elBrowse = _.$el.getElementsByClassName("upload-btn-browse")[0]
    var elstart = _.$el.getElementsByClassName("upload-btn-start")[0]
    var elstop = _.$el.getElementsByClassName("upload-btn-stop")[0]
    var eldrop = _.$el.getElementsByClassName("upload-btn-droparea")[0]
    // console.log("options:", _.options);
    // eslint-disable-next-line
    var index = 2
    //  console.log(_);
    var api = _._config.api
    var uploader = new plupload.Uploader({
      // 实例化一个plupload上传对象
      browse_button: elBrowse,
      filters: {
        mime_types: _.options.mime_types,
        // max_file_size : '400kb', // 最大只能上传400kb的文件
        prevent_duplicates: true // 不允许选取重复文件
      },
      multipart: true, // 为true时将以multipart/form-data的形式来上传文件
      multipart_params: _.options.params || {}, // 上传附加参数
      multi_selection: _.options.multi_selection || false, // 在文件对话框中是否允许多选
      max_retries: 0, // 当发生plupload.HTTP_ERROR错误时的重试次数，为0时表示不重试
      chunk_size: 5 * 1024 * 1024, // 分片上传文件时，每片文件被切割成的大小，为数字时单位为字节。也可以使用一个带单位的字符串，如"200kb"。当该值为0时表示不使用分片上传功能
      unique_names: true, // 为每个文件生成唯一名称
      url: api + _.options.url || "/File/UploadAttachment",
      flash_swf_url: "js/Moxie.swf",
      silverlight_xap_url: "js/Moxie.xap",
      drop_element: eldrop, // 拖拽区域
      dragdrop: true,
      resize: _.options.resize || {},
      // resize: {
      //   width: 200,
      //   height: 200,
      //   quality: 90,
      //   crop: true // crop to exact dimensions
      // },
      // Views to activate
      views: {
        list: true,
        thumbs: true, // Show thumbs
        active: "thumbs"
      }
    })
    _.uploader = uploader
    uploader.init() // 初始化
    // 绑定文件添加进队列事件
    uploader.bind("FilesAdded", function (up, files) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var sizeStr = ""
        if (file.size < 1024) {
          sizeStr = file.size + "B"
        } else if (file.size < 1024 * 1024) {
          sizeStr = (file.size / 1024).toFixed(2) + "KB"
        } else if (file.size < 1024 * 1024 * 1024) {
          sizeStr = (file.size / (1024 * 1024)).toFixed(2) + "MB"
        } else {
          sizeStr = (file.size / (1024 * 1024 * 1024)).toFixed(2) + "GB"
        }
        _.filesdic[file.id] = {
          id: file.id,
          name: file.name,
          origSize: file.origSize,
          size: file.size,
          status: file.status,
          type: file.type,
          loaded: file.loaded,
          process: 0,
          sizeStr: sizeStr,
          statusTitle: pluploadStatusTilte[file.status],
          message: "",
          url: ""
        }

        _.vm.processList.push(_.filesdic[file.id])
      }
      //  console.log(_.vm.processList);

      // console.log(uploader);
      //  console.log("addFile:", up);
    })
    uploader.bind("FilesRemoved", function (up, files) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        // eslint-disable-next-line
        $Rapp.ArrRemove(_.vm.processList, function (it) {
          return it.id == file.id
        })
        delete _.filesdic[file.id]
      }
    })

    uploader.bind("BeforeUpload", function (up, file) {
      // file.loaded = 56217;
      up.settings.multipart_params.FileName = _.filesdic[file.id].name
      up.settings.multipart_params.FileCode = _.filesdic[file.id].id
      //  console.log("BeforeUpload", up);
      // 预检；
      //   console.log("BeforeUpload", file);
    })

    // 当某一个对象开始上传
    uploader.bind("UploadFile", function (up, file) {
      _.filesdic[file.id].statusTitle = pluploadStatusTilte[file.status]
      //  console.log("UploadFile", file);
    })

    // 绑定文件上传进度事件
    uploader.bind("UploadProgress", function (up, file) {
      _.filesdic[file.id].process = file.percent
      _.filesdic[file.id].statusTitle = pluploadStatusTilte[file.status]
    })

    uploader.bind("BeforeChunkUpload", function (
      up,
      file,
      param,
      current,
      currentoffset
    ) {
      up.settings.multipart_params.FileName = _.filesdic[file.id].name
      up.settings.multipart_params.FileCode = _.filesdic[file.id].id
      //  console.log("BeforeChunkUpload", file, param, current, currentoffset);
    })

    // 每片上传成功后触发
    uploader.bind("ChunkUploaded", function (up, file, responseObject) {
      // console.log(up, file, responseObject)
      if (responseObject.status == 200) {
        // alert("上传成功")
      } else {
        // uploader.stop()
        // alert(responseObject.response)
      }
    })

    uploader.bind("FileUploaded", function (up, file, result) {
      if (result.status == 200) {
        // alert("上传成功")
        let res = JSON.parse(result.response) 
        let name = res.Data.Name
        // console.log(res.Data, 777)
        _.uploadAddressStr = res.Data.Url
        // _.nameArr.push(res.Data.Name)
        // console.log(_.uploadAddressStr, 666)
        let obj1 = {
          Url: name,
          Type: 'Video'
        }
        _.videoArr.push(obj1)
        // console.log(_.videoArr)
        _.$emit('getVideoArr', _.videoArr)
      } else {
        alert(result.response)
      }
      // console.log("FileUploaded", up, file);
      _.filesdic[file.id].statusTitle = pluploadStatusTilte[file.status]
    })
    // 上传成功
    uploader.bind("UploadComplete", function (up, files) {
      // console.log("UploadComplete", up);
      _.options.success && _.options.success()
    })

    // 上传出错
    uploader.bind("error", function (up, errObject) {
      up.stop()
      // console.log("上传出错", up);
      // console.log(errObject);
    })
    // 上传按钮
    $(elstart).click(function () {
      uploader.start() // 开始上传
    })
    eldrop.addEventListener("click", function (e) {
      elBrowse.click()
    })

    // 暂停按钮
    $(elstop).click(function () {
      uploader.stop()
    })
  },
  methods: {
    retry: function (id) {
      var _ = this
      var file = _.uploader.getFile(id)
      if (file) {
        file.loaded = 0
        file.status = plupload.QUEUED
        _.filesdic[file.id].statusTitle = pluploadStatusTilte[file.status]
        _.filesdic[file.id].process = 0
        _.filesdic[file.id].message = ""
        _.filesdic[file.id].url = ""
      }
    },
    delFile: function (id) {
      var _ = this
      var file = _.uploader.getFile(id)
      if (file) {
        _.uploader.removeFile(file)
      }
    },
    delAll: function () {
      var _ = this
      while (_.uploader.files.length > 0) {
        _.uploader.removeFile(_.uploader.files[0])
      }
    }
    // copy: function (index) {
    //   let name = this.nameArr[index]
    //   let str1 = this.uploadAddressStr + '/' + name
    //   let input = document.createElement("input")
    //   input.value = str1
    //   document.body.appendChild(input) // 添加临时实例
    //   input.select() // 选择实例内容
    //   document.execCommand("Copy") // 执行复制
    //   document.body.removeChild(input)
    // }
  }
}
</script>
<style lang="scss" scoped>
.jyWraper{
  ul,li {
  list-style: none;
  }
  .mar-l-10 {
    margin-left: 10px;
  }
  .wraper {
    padding: 30px 0;
  }
  .btn-wraper {
    text-align: center;
  }
  .btn-wraper .el-button {
    margin: 0 10px;
    width: 81px;
    height: 30px;
    line-height: 30px;
    padding: 0;
  }
  
  #file-list {
    width: 400px;
    margin: 20px auto;
  }
  #file-list li {
    margin-bottom: 10px;
  }
  .file-name {
    line-height: 30px;
  }
  .progress {
    height: 18px;
    font-size: 0;
    width: 100%;
    background: #e8e8e8;
    border-radius: 2px;
  }
  .progress .progress-load {
    display: block;
    width: 0;
    border-radius: 2px;
  }
  .upload-btn-droparea {
    border: 1px dashed #ccc;
    font-size: 16px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    color: #aaa;
    width: 600px;
    margin: 10px auto;
    cursor: pointer;
  }
  .upload-msg-success {
    color: rgb(92, 146, 128);
  }
  .upload-msg-fail {
    color: rgb(187, 104, 104);
  }
  .table{
    tbody{
      margin-top: 10px;
    }
    tr{
      td{
        text-align: center;
        .btn-delete{
          padding: 5px 8px
        }
        .btn-reload{
          padding: 5px 8px
        }
        .size{
          text-align: center
        }
        .el-progress{
          margin-top: 10px;
        }
      }
    }
  }
}

</style>
