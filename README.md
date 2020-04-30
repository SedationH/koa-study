# 📝koa2的学习过程

主要来源

- [廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025933764960)

## app.use和middleware、next参数作用
middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。

此外，如果一个middleware没有调用**await next()**，会怎么办？答案是后续的middleware将不再执行了。这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：

```javascript
app.use(async (ctx, next) => {
    if (await checkUserPermission(ctx)) {
        await next();
    } else {
        ctx.response.status = 403;
    }
});
```



在使用koa-bodyparser对request.body进行解析的时候，就需要较router先一步注册

```javascript
app
  .use(bodyParaser())
  .use(router.routes())
```



## 路由处理

1. 手撕

```javascript
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.body = 'index page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/test') {
        ctx.response.body = 'TEST page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/error') {
        ctx.response.body = 'ERROR page';
    } else {
        await next();
    }
});
```

2. koa-router

```javascript
// 1
const router = require('koa-router')() //注意是函数

// 2请求集中管理
router
  .get('/', async ctx => {
    ctx.response.body = `<h1>Index</h1>`
  })
  .get('/hello/:name', async ctx => {
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
  })
  .get('/login', async ctx => {
    ctx.response.body = '2'
  })
  // post，delete，都可以处理

// 3
app
  .use(router.routes())
```

参看 basic-study/1-router&bodyparser使用/app.js

