const
  Koa = require('koa'),
  app = new Koa()

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    const html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    const postData = await parseData(ctx)
    ctx.body = postData
  }
}).listen(3000)

console.log('http://localhost:3000')

// 使用原生的node方法读取post数据
function parseData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ""
      ctx.req.addListener('data', postDataChunk => {
        postData += postDataChunk
        console.log(`Receive post data chunk: ${postDataChunk}`)
      })
      ctx.req.addListener('end', () => {
        console.log(postData)
        const parseObj = parseQueryStr(postData)
        resolve(parseObj)
      })
    } catch (err) {
      reject(err)
    }
  })
}

function parseQueryStr(queryStr) {
  const queryObj = {}, queryList = queryStr.split('&')
  for (const [index, queryStr] of queryList.entries()) {
    let itemList = queryStr.split('=')
    queryObj[decodeURIComponent(itemList[0])] = decodeURIComponent(itemList[1])
  }
  console.log(queryObj)
  return queryObj
}