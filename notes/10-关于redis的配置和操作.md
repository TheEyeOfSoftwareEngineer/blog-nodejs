## redis
### 配置与介绍reids
```
- 安装 MacOS
brew install redis 

- redis启动
redis-server

- 进入redis操作环境
redis-cli

- 设置键值
set myname will

- 获取对应键的值
get myname

- 查看所有键
keys *

- 删除键
del myname
```

### nodejs操作redis
```javascript
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err=> {
  console.log(err)
})

// 设置
redisClient.set('myname', 'will', redis.print)
// 获取
redisClient.get('myname', (err, val)=>{
  if(err) {
    console.log(err)
    return
  }
  console.log('val', val)

  // 退出
  redisClient.quit()
})
```

### redis工具的封装
```javascript

```