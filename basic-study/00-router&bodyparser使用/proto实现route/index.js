const
  Koa = require('koa'),
  fs = require('fs'),
  app = new Koa()


/**
 * 注意async的底层是Promise
 * 使用Promise封装异步读取文件的方法
 * @param {string} page html文件名称
 * @return {Promise} 文件数据对象
 */
function render(page) {
  return new Promise((resolve, reject) => {
    const viewUrl = `./views/${page}`
    // 不加"binary"浏览页面的时候会下载
    fs.readFile(viewUrl, "binary", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param {string} url koa ctx.url
 * @return {string} html文档内容
 */
async function route(url) {
  let view = '404.html'
  switch (url) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    default:
      break
  }
  return await render(view)
}

app
  .use(async ctx => {
    const
      url = ctx.request.url,
      html = await route(url)
    ctx.body = html
  })
  .listen(3000)

console.log('http://localhost:3000')