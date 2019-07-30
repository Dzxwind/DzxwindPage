const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'ljwifi',
  lintOnSave: false,
  runtimeCompiler: true, 
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@lib', resolve('src/common'))
      .set('@com', resolve('src/components'))
      .set('@img', resolve('src/images'))
      .set('@style', resolve('src/common/scss'))
      .set('@plg', resolve('src/plugins'))
  },
  devServer: {
    open: false, // 是否自动打开浏览器页面
    port: 23123, // 端口地址
    https: false, // 使用https提供服务

    // string | Object 代理设置
    // proxy: {
    //   '/repos': {
    //     target:'',
    //     changeOrigin: true,
    //     pathRewrite: {'^/repos': ''}
    //   }, 
    // },
    progress: true,
  },
}