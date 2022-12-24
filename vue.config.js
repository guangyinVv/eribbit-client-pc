const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const { config } = require('process')
module.exports = defineConfig({
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }, // 配置，将小于10Kb的图片转为base64格式
    chainWebpack: config => {
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10000 }))
    }
  }

})
