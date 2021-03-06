const querystring = require('querystring')

const handlerBlogRouter = require('./src/router/blog')
const handlerUserRouter = require('./src/router/user')

const {access} = require('./src/utils/log')

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

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

// seesion 数据
const SESSION_DATA = {}

const serverHandle = (req, res) => {
  // 记录access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

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
  // 解析session
  let needSetCookie = false
  let userId = req.cookie.userid
  if(userId) {
    if(!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}      
    }    
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  
  getPostData(req).then(async postData=> {
    req.body = postData

    // 处理blog路由
    const blogData = await handlerBlogRouter(req, res)
    if(blogData) {
      if(needSetCookie) {
        res.setHeader('Set-Cookie', `userid='${userId}'; path=/; httpOnly; expires=${getCookieExpires()}`)
      }
      res.end(
        JSON.stringify(blogData)
      )
      return
    }

    // 处理user路由
    const userData = await handlerUserRouter(req, res)
    if(userData) {
      if(needSetCookie) {
        res.setHeader('Set-Cookie', `userid='${userId}'; path=/; httpOnly; expires=${getCookieExpires()}`)
      }
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