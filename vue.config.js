// 发布路径
// const publicPath = process.env.VUE_APP_ PATHNAME
const publicPath = ''
// 代理路径
const target = 'http://gysszyzpt.jy365.net/'
// 'http://www.tcsmxx.com/'
// 'http://test82.jy365.net'
// 'http://192.168.1.96:8005'
// ''
const webpack = require('webpack')

module.exports = {
  publicPath,
  runtimeCompiler: true,
  // webpack-dev-server 配置
  devServer: {
    publicPath,
    proxy: {
      '/api': {
        target,
        changeOrigin: true
      },
      '/lessionnew': {
        target,
        changeOrigin: true
      },
      '/Content': {
        target,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = '#source-map'
      // config.devtool = 'cheap-source-map'
    }
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "windows.jQuery": 'jquery'
      })
    )
  }
}
