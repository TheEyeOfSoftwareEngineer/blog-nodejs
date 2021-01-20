const querystring = require('querystring')

const handlerBlogRouter = require('./blog-nodejs/src/router/blog')
const handlerUserRouter = require('./blog-nodejs/src/router/user')

// 处理post data
const getPostData = req => {
  const promise = new Promise((resolve, reject)=> {
    if(req.method !== 'POST') { 
      resolve({})
      return
    }
    if(req.headers['content-type'] !== "application/json") {
      resolve({})
      return
    }
    let postData = ""
    req.on('data', chunk=>{
      postData += chunk.toString()
    })
    req.on('end', ()=>{
      if(!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })

  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回头格式
  res.setHeader('Content-Type', 'application/json')
  // 获取path
  const url = req.url
  req.path = url.split('?')[0]
  // 获取query
  req.query = querystring.parse(url.split('?')[1])
  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item=> {
    if(!item) return
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  })
  
  getPostData(req).then(async postData=> {
    req.body = postData

    // 处理blog路由
    const blogData = await handlerBlogRouter(req, res)
    if(blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      return
    }

    // 处理user路由
    const userData = await handlerUserRouter(req, res)
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
  })  
}

module.exports = serverHandle

// process.env.NODE_ENV