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
