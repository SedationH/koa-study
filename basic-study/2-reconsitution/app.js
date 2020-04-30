const
  Koa = require('koa'),
  bodyParser = require('koa-bodyparser'),
  controller = require('./controller'),
  app = new Koa()

app
  .use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next();
  })
 
app
  .use(bodyParser())
  .use(controller())
  .listen(3000)

console.log('http://localhost:3000')
