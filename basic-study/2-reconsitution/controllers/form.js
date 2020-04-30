const fnLogin = async ctx => {
  ctx.response.body =
    `<h1>Form</h1>
    <form action="/signin" method="post">
          <p>Name: <input name="name" value=""></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
    </form>`
}

const fnSigin = async ctx => {
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
}

module.exports = {
  'GET /login': fnLogin,
  'POST /signin': fnSigin
}