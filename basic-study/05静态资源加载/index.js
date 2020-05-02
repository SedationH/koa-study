const
  Koa = require('koa'),
  app = new Koa(),
  static = require('koa-static'),
  path = require('path')

app.use(static(
  path.join(__dirname, './static')
))
  .listen(3000)

console.log('http://localhost:3000')
