## 日志
- access.log记录，直接使用morgan
- 自定义日志使用console.log和console.error即可(可写入文件中)
- 日志文件拆分、日志内容分析(readline)

```javascript
const logger = require('morgan')
app.use(logger('dev'), {
  stream: process.stdout
}) //后面部分为默认配置 process.stdin.pipe(process.stdout)

```
其中logger中的dev对应某种输出的规则，还有其他规则.
线上环境可以用combined.

### 使用morgan access.log
```javascript
if (ENV !== 'production') {
  // 开发环境或者测试环境
  app.use(logger('dev')); //日志
} else {
  // 线上环境
  const logFilename = path.join(__dirname, 'log', 'access.log')
  const writeStream = fs.createWriteStream(logFilename, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}
```

### 自定义日志
