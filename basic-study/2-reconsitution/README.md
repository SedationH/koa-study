# 介绍重构逻辑和一些技巧



## 逻辑

```bash
|-2-reconsitution
  |-README.md
  |-app.js
  |-controller.js 作为生成router.routes()的函数导出
  |-controllers 所有的要用url放这里
  |  |-form.js
  |  |-hello.js
```



## 技巧



```javascript
const mapping = require(path)
console.log(mapping)
```

得到

```json
{
  'GET /': [AsyncFunction: fnIndex],
  'GET /hello/:name': [AsyncFunction: fnHello]
}
```



这样的写法也值得学习❤️

```javascript
module.exports = dir => {
  const
    controllersDir = dir || 'controllers',
    router = require('koa-router')()
  addControllers(router, controllersDir)

  return router.routes()
}
```

