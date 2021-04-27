const path = require('path')


function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/imports.styl'),
      ],
    })
}

module.exports = {
  outputDir: 'build', // Talos CI 仅识别并打包 build 目录
  lintOnSave: true, // 加快生产构建速度
  devServer: {
    open: process.platform === 'darwin',
    hot: true,
    port: process.env.PORT,
    disableHostCheck: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // TODO: 根据实际需要配置代理
      '/login': {
        target: 'http://localhost:3000',
        headers: {
          host: 'localhost:3000'
        }
      },
      '/register': {
        target: 'http://localhost:3000',
        headers: {
          host: 'localhost:3000'
        }
      },
      '/user': {
        target: 'http://localhost:3000',
        headers: {
          host: 'localhost:3000'
        }
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
}