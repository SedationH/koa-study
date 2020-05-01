const
   Koa = require('koa'),
   bodyParser = require('koa-bodyparser')
   controller = require('./controller')

const app = new Koa()

app
  .use(bodyParser())
  .use(controller())
  .listen(3000)

console.log('http://localhost:3000')

