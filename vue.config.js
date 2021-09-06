const apiData = require('./data.json')
const webpack = require('webpack')
const seller = apiData.seller
const goods = apiData.goods
const ERR_OK = 0
const path = require('path')

function resolve(url) {
  return path.join(__dirname, url)
}
module.exports = {
  runtimeCompiler: true,
  devServer: {
    open: true, //自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    },
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    compress: true,
    before(app) {
      app.get('/api/seller', function (req, res) {
          console.log(11111);
          const id = req.query.id
          res.json({
            error: ERR_OK,
            data: Object.assign({}, seller, {
              id
            })
          })
        }),
        app.get('/api/goods', function (req, res) {
          console.log(11111);
          res.json({
            error: ERR_OK,
            data: goods
          })
        })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('public', resolve('public/icon'))

    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])

    config.module
      .rule('svg')
      .test(/.svg$/)
      .use()
      .loader('@svgr/webpack')
  }

}