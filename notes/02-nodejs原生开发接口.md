## nodejs原生开发接口

### http请求概述
- DNS解析，建议TCP连接，发送http请求
- server接受到http请求，处理并返回
- 客户端接受到返回的数据，处理数据（如渲染页面、执行js）

### nodejs处理http请求
```javascript
const http = require('http')

const server = http.createServer((req, res)=> {  
  res.end('hello world')
})

server.listen(3000, ()=>{
  console.log('listening 3000 port...')
})
```

#### get请求和querystring
- get请求，即客户端要向server端获取数据
- 通过querystring来传递数据，如a.html?a=100&b=200
- 浏览器直接访问，就发送get请求
```javascript
const http = require('http')
const quertstring = require('querystring')

const server = http.createServer((req, res)=> {  
  console.log(req.method) // GET
  const url = req.url     // 获取请求的完整url
  req.query = querystring.parse(url.split('?')[1])
  res.end(JSON.stringify(req.query))
})

server.listen(3000, ()=>{
  console.log('listening 3000 port...')
})
```

#### post请求和postdata
- post请求，即客户端要像服务端传递数据
- 通过post中data传递数据
```javascript
const http = require('http')

const server = http.createServer((req, res)=> {
  if(req.methd === 'POST') {
    console.log('content-type', req.headers['content-type'])
    // 接受数据 - 数据流方式
    let postData = ""
    req.on('data', chunk=> {
      postData += chunk.toString()
    })
    req.on('end', ()=>{
      console.log(postData)
      res.end('hello world')
    })
  }
})

server.listen(3000, ()=>{
  console.log('listening 3000 port...')
})
```

#### 路由
```javascript
const url = req.url.split('?')[0]
```

#### 综合
```javascript
const http = require('http')
const querystring =  require('querystring')

const server = http.createServer((req, res)=> {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回头格式
  res.setHeader('Content-Type', 'application/json')

  // 返回数据
  const resData = {
    method,
    url,
    path,
    query
  }

  if(method === 'GET') {
    res.end(JSON.stringify(resData))
  }

  if(method === 'POST') {
    let postData = ""
    req.on('data', chunk=> {
      postData += chunk.toString()
    })
    req.on('end', ()=>{
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }

})

server.listen(3000, ()=>{
  console.log('listening 3000 port...')
})
```