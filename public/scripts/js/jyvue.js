var temp = {};
(function (win) {
  function Rapp () {
    this.AddDic = function (list, key, value) {
      key = key || 'key'
      value = value || 'value'
      let length = list.length
      let dic = {}
      for (let i = 0; i < length; i++) {
        let item = list[i]
        dic[item[key]] = item[value]
      }
      return dic || {}
    }
    this.ArrRemove = function (arr, fun) {
      var index = 0
      for (var i = 0; i < arr.length; i++) {
        if (fun(arr[i])) {
          index = i
        }
      }
      return arr.splice(index, 1)
    }
  }
  win.$Rapp = new Rapp()

  class JyApp {
    constructor () {
      var _ = this
      // var crossDomain = false;
      // var origin = win.document.location.protocol + '//' + win.document.location.host;
      if (_._config.api.indexOf('http://') > -1) {
        win.jQuery.support.cors = true
        //  crossDomain = true;
        win.$.ajaxSetup({
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
          xhrFields: {
            withCredentials: true
          }
        })
      }
    }
    setValue (devData, proData) {
      if (process.env.NODE_ENV === 'production') {
        return proData
      } else {
        return devData
      }
    }

    _config = {
      api: this.setValue('/api', '/api')
    };

    install (Vue, options) {
      var _ = this

      Vue.ajax = function (options) {
        win.$.ajax(options)
        // 逻辑...
      }

      Vue.getRappParam = () => {
        if (self.frameElement) {
          // eslint-disable-next-line
          var x = self.frameElement.getAttribute('data-param')
        }
        if (window.$Papp) {
          var key = window.$Papp.getCache('iframeId')
          if (key) {
            return window.$Papp.getCache(key) || {}
          }
        } else {
          return {}
        }
      }

      Vue.upload = function (options) {
        var _option = win.$.extend(
          {},
          {
            el: '',
            fel: '',
            uploadUrl: '',
            uploadType: null,
            fileuploaded: null,
            fileerror: null
          },
          options
        )
        console.log(win.$(_option.el))
        let $upload = win.$(_option.el).fileinput({
          uploadUrl: _option.uploadUrl || _._config.api + '/filem/ToUpload?fileType=' + (_option.uploadType || 0), // server upload action
          uploadAsync: true,
          language: 'zh',
          showPreview: false,
          // showUpload: false,
          // showCaption: false,
          maxFileSize: 1024 * 10, // 10mb
          allowedFileTypes: ['xls', 'xlsx', 'jpg'], //, 'png'],
          // removeClass: "btn red-sunglo input-sm",
          previewSettings: {
            image: {
              width: '95%',
              height: '0px'
            }
          },
          // initialPreview: choosedata === undefined || !choosedata[k.Code] ? [] : ["<img src='" + json.Path + "/" + choosedata[k.Code] + "' class='file-preview-image' style='width:100%;height:100%;max-height:262px;' alt='无法获取图片' title='Desert'>"],
          dropZoneEnabled: false,
          ajaxSettings: {
            dataType: 'json'
          }
        })
        $upload.on('fileuploaded', (event, data, previewId, index) => {
          if (data.response.IsSuccess) {
            if (_option.fel) {
              win.$(_option.fel).val(data.response.Data[0])
            }
            _option.fileuploaded && _option.fileuploaded(event, data, previewId, index)
          } else {
          }
        })
      }

      // 2. 添加全局资源
      Vue.directive('my-directive', {})

      // 3. 注入组件选项
      Vue.mixin({
        $R: null,
        mounted () {
          this.reload()
          // var _vue = this;
          // if (_vue.$options.$R) {
          //   // _vue.ajax(_vue.$options.$R);  不用这个，因为这边要绑定view;和普通额ajax不同；

          //   let options = {};
          //   if (typeof _vue.$options.$R === 'function') {
          //     options = _vue.$options.$R(_vue);
          //   } else {
          //     options = _vue.$options.$R;
          //   }
          //   var option = win.$.extend(
          //     {},
          //     {
          //       AuthHander: () => {
          //         alert('请登录');
          //       }
          //     },
          //     options
          //   );
          //   if (option.url) {
          //     if (option.url.indexOf('http') === 0) {
          //       // 直接访问；_vm
          //     } else {
          //       option.url = _._config.api + '/' + (option.area || '') + '/' + option.url;
          //     }
          //     if (typeof option.data === 'function') {
          //       option.data = option.data(_vue);
          //     }
          //     option.success = data => {
          //       if (data.Type == 401) {
          //         option.AuthHander && option.AuthHander();
          //         return;
          //       }

          //       if (data.IsSuccess) {
          //         // 当返回成功
          //         if (options.success) {
          //           // 定义了成功返回处理，则执行；
          //           options.success(data.Data, data.Message, data.Type);
          //         } else {
          //           // 没有设定返回处理，则默认绑定页面
          //           _vue.vm = data.Data;
          //         }
          //       } else {
          //         // 返回失败
          //         if (options.error) {
          //           options.error(data.Message, data.Type, {});
          //         } else {
          //           // 不处理；
          //         }
          //       }
          //     };
          //     option.error = ex => {
          //       if (options.error) {
          //         options.error(ex.Message, 500, {});
          //       } else {
          //         console.log(ex.Message, ex);
          //         // 不处理；
          //       }
          //     };
          //     Vue.ajax(option);
          //   } else {
          //     // 将测试数据导入；
          //   }
          // }
        }
      })

      Vue.prototype._config = this._config
      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }

      Vue.prototype.reload = function () {
        var _vue = this
        if (_vue.$options.$R) {
          // _vue.ajax(_vue.$options.$R);  不用这个，因为这边要绑定view;和普通额ajax不同；

          let options = {}
          if (typeof _vue.$options.$R === 'function') {
            options = _vue.$options.$R(_vue)
          } else {
            options = _vue.$options.$R
          }
          var option = win.$.extend(
            {},
            {
              AuthHander: () => {
                alert('请登录')
              }
            },
            options
          )
          if (option.url) {
            if (option.url.indexOf('http') === 0) {
              // 直接访问；_vm
            } else {
              option.url = _._config.api + '/' + (option.area || '') + '/' + option.url
            }
            if (typeof option.data === 'function') {
              option.data = option.data(_vue)
            }
            option.success = data => {
              if (data.Type == 401) {
                option.AuthHander && option.AuthHander()
                return
              }

              if (data.IsSuccess) {
                // 当返回成功
                if (options.success) {
                  // 定义了成功返回处理，则执行；
                  options.success(data.Data, data.Message, data.Type)
                } else {
                  // 没有设定返回处理，则默认绑定页面
                  _vue.vm = data.Data
                }
              } else {
                // 返回失败
                if (options.error) {
                  options.error(data.Message, data.Type, {})
                } else {
                  // 不处理；
                }
              }
            }
            option.error = ex => {
              if (options.error) {
                options.error(ex.Message, 500, {})
              } else {
                console.log(ex.Message, ex)
                // 不处理；
              }
            }
            Vue.ajax(option)
          } else {
            // 将测试数据导入；
          }
        }
      }

      Vue.prototype.$getRappParam = () => {
        return Vue.getRappParam()
      }

      Vue.prototype.upload = options => {
        Vue.upload(options)
      }

      Vue.prototype.ajax = function (ajaxoptions) {
        let _vue = this
        let options = {}
        if (typeof ajaxoptions === 'function') {
          options = ajaxoptions(_vue)
        } else {
          options = ajaxoptions
        }
        var option = win.$.extend(
          {},
          {
            AuthHander: () => {
              alert('请登录')
            }
          },
          options
        )
        if (option.url) {
          if (option.url.indexOf('http') === 0) {
            // 直接访问；_vm
          } else {
            option.url = _._config.api + '/' + (option.area || '') + '/' + option.url
          }
          if (typeof option.data === 'function') {
            option.data = option.data(_vue)
          }

          option.success = data => {
            if (data.Type == 401) {
              option.AuthHander && option.AuthHander()
              return
            }

            if (data.IsSuccess) {
              // 当返回成功
              if (options.success) {
                // 定义了成功返回处理，则执行；
                options.success(data.Data, data.Message, data.Type)
              } else {
                // 不处理；
              }
            } else {
              // 返回失败
              if (options.error) {
                options.error(data.Message, data.Type, {})
              } else {
                // 不处理；
              }
            }
          }
          option.error = ex => {
            if (options.error) {
              options.error(ex.Message, 500, {})
            } else {
              console.log(ex.Message, ex)
              // 不处理；
            }
          }

          Vue.ajax(option)
        } else {
          // 将测试数据导入；
        }
      }
    }
  }
  temp.JyApp = JyApp
})(window, temp)

export default new temp.JyApp()
