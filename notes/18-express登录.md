## express登录
- 使用express-session和connect-redis
- req.session保存登录信息，登录校验做成express中间件

- 安装express-session
- 配置session
```javascript
const session = require('express-session')
app.use(session({
  secret: BASE_CONF.sessionKey,
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: BASE_CONF.maxAge
  }
}))
// 前端cookie中会有connect.id
```

### 连接redis
安装redis和connect-redis
```javascript
// redis.js中创建redisClient
const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err=>{
  console.log(err)
})
module.exports = redisClient
// app.js中用connect-redis创建RedisStore包装session
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: BASE_CONF.sessionKey,
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: BASE_CONF.maxAge
  },
  store: sessionStore // 将sessionStore和session绑定
}))
```

在上面的配置后session就会自动同步到redis中

### express router改写- with middleware
```javascript
router.post('/new', loginCheck, async (req, res, next)=>{  
  req.body.author = req.session.username  
  const data = await newBlog(req.body)
  res.json(
    new SuccessModel(data)
  )
})
```