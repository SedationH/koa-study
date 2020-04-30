// 集中处理 router URL
const fs = require('fs')
const ps = require('path')

// 写入router
function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`Unvalid ${url}`)
    }
  }
}

// 读取文件和相关导出方法
function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter(f => {
    // 只处理js后缀文件
    return f.endsWith('.js')
  }).forEach(f => {
    console.log(`Process controller: ${f}...`)
    const path = ps.resolve(__dirname, dir, f)
    const mapping = require(path)
    addMapping(router,mapping)
  })
}

module.exports = dir => {
  const
    controllersDir = dir || 'controllers',
    router = require('koa-router')()
  addControllers(router, controllersDir)

  return router.routes()
}