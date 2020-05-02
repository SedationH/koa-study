const fnIndex = async ctx => {
  ctx.response.body = `<h1>Index</h1>`
}

const fnHello = async ctx => {
  const name = ctx.params.name
  ctx.response.body = `<h1>Hello, ${name}!</h1>`
}

module.exports = {
  'GET /': fnIndex,
  'GET /hello/:name': fnHello
}