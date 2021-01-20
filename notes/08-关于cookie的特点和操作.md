## cookie

- 核心: 登录校验、登录信息存储
- cookie和session
- session写入redis
- nginx反向代理

### cookie
- 存储在浏览器的一段字符串(最大5kb)
- 跨域不共享
- 格式`k1=v1;k2=v2;k3=v2;`,可以存储结构化数据
- 每次发送http请求会将请求域的cookie一起发送给server
- server可以修改cookie并返回给浏览器
- 浏览器中可以通过javascript有限制的修改cookie

### server端nodejs操作cookie
- 登录检测
看cookie中是否有标识用户已经登录的标识符

- 修改cookie
```javascript
// httpOnly保证前端cookie只读
res.setHeader('Set-Cookie', `username='${result.username}'; path=/; httpOnly`)
// 设置过期时间
res.setHeader('Set-Cookie', `username='${result.username}'; path=/; httpOnly; expires=${getCookieExpires()}`)

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}
```



