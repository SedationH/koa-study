## Context or ctx

A Koa **Context** encapsulates node's `request` and `response` objects into a single object which provides many helpful methods for writing web applications and APIs. 

Many of the context's accessors and methods simply delegate to their `ctx.request` or `ctx.response` equivalents for convenience, and are otherwise identical. For example `ctx.type` and `ctx.length` delegate to the `response` object, and `ctx.path` and `ctx.method` delegate to the `request`.

By

```
async ctx => {
  ctx.body = {
    ctx
  }
}
```

get

```javascript
{
  ctx : {
    request: {
      method: "GET",
      url: "/",
      header: {
        host: "localhost:3000",
        connection: "keep-alive",
        cache - control: "max-age:0",
      	upgrade - insecure - requests: "1",
    		user - agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
      accept : "text/html,application/xhtml+xml,application/xml;q:0.9,image/webp,image/apng,*/*;q:0.8,application/signed-exchange;v:b3;q:0.9",
      sec - fetch - site: "none",
      sec - fetch - mode: "navigate",
      sec - fetch - user: "?1",
      sec - fetch - dest: "document",
			accept - encoding: "gzip, deflate, br",
			accept - language: "zh-CN,zh;q:0.9,en;q:0.8,und;q:0.7",
			cookie : "Pycharm-d9de99f0:00163714-0b4e-41de-972c-dfc9fea4348d; Hm_lvt_45e50d2aec057f43a3112beaf7f00179:1584537221; _ga:GA1.1.2007524080.1587779643"
}
    },
response : {
  status: 200,
  message: "OK",
  header: {
    content - type: "application/json; charset:utf-8"
      }
    },
app : {
  subdomainOffset: 2,
  proxy: false,
  env: "development"
},
  originalUrl : "/",
  req : "<original node req>", 
  res : "<original node res>",
  socket : "<original node socket>"
  }
}
```



## GET请求数据获取

- 1.是从上下文中直接获取
  - 请求对象ctx.query，返回如 { a:1, b:2 } 对象
  - 请求字符串 ctx.querystring，返回如 a=1&b=2
- 2.是从上下文的request对象中获取
  - 请求对象ctx.request.query，返回如 { a:1, b:2 } 对象
  - 请求字符串 ctx.request.querystring，返回如 a=1&b=2



##  POST请求数据对象

> 注意：ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象，同理ctx.response是context经过封装的响应对象，ctx.res是context提供的node.js原生HTTP请求对象。



难点在于一些node原生操作

[on & addListener](https://cnodejs.org/topic/54dfd4181712f19837bd51a6)

```js
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
```



关于编码问题 参看

- [关于URL编码-阮一峰](https://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
- [一张图看懂encodeURI、encodeURIComponent、decodeURI、decodeURIComponent的区别](https://juejin.im/post/5835836361ff4b0061f38a5d)



最后一个Javascript编码函数是encodeURIComponent()。与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。

因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。

![bg2010021115.png](http://www.ruanyifeng.com/blog/upload/2010/02/bg2010021115.png)

它对应的解码函数是decodeURIComponent()。



## koa-bodyparser中间件

对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

参考 basic-study/00-router&bodyparser使用/app.js

```js
async ctx => {
  const
    name = ctx.request.body.name || '',
    password = ctx.request.body.password || ''
  console.log(`sign in with name: ${name},password${password}`)
  if (name === 'koa' && password === '123') {
    ctx.response.body = `<h1>Welcome</h1>`
  } else {
    ctx.response.body =
      `<h1>Error</h1>
      <p><a href="/login">Try again</a></p>`
  }
}
```

