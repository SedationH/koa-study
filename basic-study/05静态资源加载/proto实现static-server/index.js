const
  Koa = require('koa'),
  path = require('path'),
  app = new Koa(),
  content = require('./util/content'),
  mimes = require('./util/mimes')

app.use(async ctx => {
  // 根据ctx url的文件类型分情况展示
  const _mime = getMime(ctx.url)
  ctx.type = _mime

  // 获取请求内容
  const staticDictionaryPath = path.join(__dirname, 'static')
  const _content = await content(staticDictionaryPath,ctx.url)

  console.log(staticDictionaryPath)
  // 如果是图片，使用node原生二进制输出
  if (_mime.startsWith('image/')) {
    ctx.res.writeHead(200)
    ctx.res.end(_content, 'binary')
  } else {
    ctx.body = _content
  }
}).listen(3000)

console.log('http://localhost:3000')

/**
 * 
 * @param {string} url 
 * @return {string} mime 对应规范的mime类型
 */
function getMime(url) {
  let ext = path.extname(url)
  ext = ext ? ext.slice(1) : 'unknown'
  return mimes[ext]
}

