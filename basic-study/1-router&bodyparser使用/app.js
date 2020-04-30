const Koa = require('koa')
const router = require('koa-router')()
const bodyParaser = require('koa-bodyparser')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
  await next()
})

// 请求集中管理
router
  .get('/', async ctx => {
    ctx.response.body = `<h1>Index</h1>`
  })
  .get('/hello/:name', async ctx => {
    const name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
  })
  .get('/login', async ctx => {
    ctx.response.body =
      `<h1>Form</h1>
      <form action="/signin" method="post">
            <p>Name: <input name="name" value=""></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
      </form>`
  })
  .post('/signin', async ctx => {
    const
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || ''
    console.log(`sign in with name: ${name},password${password}`)
    if (name === 'koa' && password === '123') {
      ctx.response.body = `<h1>Welcome</h1>`
    } else {
      ctx.response.body =
        `<h1>Error</h1>
        <p><a href="/login">Try again</a></p>`
    }
  })

// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。

app
  .use(bodyParaser())
  .use(router.routes())
  .listen(3000)

console.log('http://localhost:3000')