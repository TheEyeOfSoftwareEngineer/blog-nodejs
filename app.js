const handlerBlogRouter = require('./blog-nodejs/src/router/blog')
const handlerUserRouter = require('./blog-nodejs/src/router/user')

const serverHandle = (req, res) => {
  // 设置返回头格式
  res.setHeader('Content-Type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]

  // 处理blog路由
  const blogData = handlerBlogRouter(req, res)
  if(blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  // 处理user路由
  const userData = handlerUserRouter(req, res)
  if(userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  // 未命中任何路由 404
  res.writeHeader(404, {'Content-Type': 'text/plain'})
  res.write('404 Not Found\n')
  res.end()


  
}

module.exports = serverHandle

// process.env.NODE_ENV