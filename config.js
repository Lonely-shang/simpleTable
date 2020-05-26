const path = require('path')

module.exports = {
  dev: {
    assetsPublicPath: '/',
    port: 3000,
    styleLint: false,
    devtool: 'cheap-module-eval-source-map'
  },
  // build: {
  //   assetsRoot: path.resolve(__dirname, './demo'),
  //   assetsPublicPath: '/simpletable/',
  //   bundleAnalyzerReport: false
  // },
  // build:prod: {
  //   assetsRoot: path.resolve(__dirname, './dist'),
  //   assetsPublicPath: './',
  //   filename: 'vue-simpletable',
  //   library: 'VueSimpletable'
  // }
}
