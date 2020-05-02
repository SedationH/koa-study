const
  Koa = require('koa'),
  bodyParser = require('koa-bodyparser'),
  controller = require('./controller'),
  rest = require('./rest')

const app = new Koa()

app
  .use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
    await next()
  })
  .use(bodyParser())
  .use(rest.restify())
  .use(controller())
  .listen(3000)

console.log('http://localhost:3000')