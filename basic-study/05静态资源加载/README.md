# 静态服务搭建😊



所谓静态服务，就是使我们用户可以通过浏览器访问我们指定的文件夹

备注 koa-static没有实现目录的功能，自己写个中间件实现

[实现参考](https://andyliwr.github.io/2018/05/07/koa_static_file_server/)

## 手撕目录

```js
|-proto实现static-server
  |-index.js // 入口文件
  |-static //静态目录
  |  |-css
  |  |  |-style.css
  |  |-image
  |  |  |-nodejs.jpg
  |  |-index.html
  |  |-js
  |  |  |-index.js
  |-util
  |  |-content.js // 获取内容
  |  |-dir.js // 目录显示
  |  |-file.js // 文件内容
  |  |-mimes.js // 网页类型规范
```



## koa-static使用

```js
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))
```

