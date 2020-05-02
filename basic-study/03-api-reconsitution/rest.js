module.exports = {
  restify: (pathPrefix) => {
    // 判断是否更改默认的前缀，这一点在挂载在koa实例的时候执行
    pathPrefix = pathPrefix || '/api/'

    // 注意区分rest和controller两个中间件编写的区别
    // 前者返回的是自己编写的 ， 后者是通过router.routes()进行封装的  
    return async (ctx, next) => {
      // 是api相关的请求，rest中间件才进行处理
      if (ctx.request.path.startsWith(pathPrefix)) {
        console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`)

        // 对ctx挂载rest方法
        ctx.rest = (data) => {
          ctx.response.type = 'application/json'
          ctx.response.body = data
        }
        await next()
      }else{
        await next()
      }
    }
  }
}