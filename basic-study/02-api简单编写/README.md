# 📝

编写 REST API就是在编写处理HTTP请求的async函数

`api.js`

```javascript
const products = [{
  name: 'iPhone',
  price: 2000
},{
  name: 'Kindle',
  price: 1000
}]

module.exports ={
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
}
```



⚠️

- GET res的类型设置为 `application/json`，并且把要返回的数据放在res的body中
- POST的请求数据在req.body中，通过koa-bodyparaser变成了可以直接操作的对象



测试

```bash
curl -H 'Content-Type: application/json' -X POST -d '{"name":"XBox","price":3999}' http://localhost:3000/api/products
```

因此

```javascript
ctx.request.body === bodyParase('{"name":"XBox","price":3999}')
```

