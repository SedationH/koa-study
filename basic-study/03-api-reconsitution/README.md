# 📝感受

挺有收获，写下总结

 ❤️ 😝 😝 😝



整体目录

```bash
|-4-api-reconsitution
  |-README.md
  |-app.js
  |-controller.js
  |-controllers
  |  |-api.js
  |-rest.js
```



## 编写统一输出的REST

在原来的统一存放api的文件中，每次都要手动去设置返回类型和数据，如果因为✍️问题导致无法获得正常运行，那就太傻了🙈

```javascript
'GET /api/products': async ctx => {
  ctx.response.type = 'application/json'
  ctx.response.body = {
    products
  }
},
'POST /api/products': async ctx => {
  const p = {
    name: ctx.request.body.name,
    price: ctx.request.body.price
  }
  products.push(p)
  ctx.response.type = 'application/json'
  ctx.response.body = p
}
```

所以我们通过一个中间件封装一下

```javascript
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
```

⚠️如果没有next() 没办法正常向下传递了

在我们封装controller中间件的时候，因为返回的是router.routes()别人咋在代码中已经帮我们封装好了

```javascript
module.exports = dir => {
  const
    controllersDir = dir || 'controllers',
    router = require('koa-router')()
  addControllers(router, controllersDir)

  return router.routes()
}
```



