## 日志
- 系统没有日志,就等于人没有眼睛
- 访问日志(access log) server端最重要的日志
- 自定义日志 包括自定义事件、错误记录等

### 知识点
- nodejs文件操作 nodejs stream
- 日志要存储在文件中

- 文件的操作
```javascript
const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, 'filename.txt')

// 文件内容的读取
fs.readFile(fileName, (err, data)=>{
  if(err) {
    console.error(err)
    return
  }
  // data是二进制类型 主要转换为字符串
  console.log(data.toString())
})

// 写入文件
const content = '写入的内容'
const opt = {
  flag: 'a' // a为追加写入，w是覆盖写入
}
fs.writeFile(filename, content, opt, err=>{
  if(err) {
    console.error(err)    
  }
})
```

### IO操作的性能瓶颈
- IO包括"网络IO"和"文件IO"
- 相比如CPU计算和内容读写,IO的突出特点就是慢
- 需要在有限的硬件资源下提高IO的操作效率: stream

### stream
- 标准输入输出
```javascript
// 标准输入输出，pipe就是管道 符合水流管道的模型图
// process.stdin 获取数据，直接通过管道传递给 process.stdout
process.stdin.pipe(process.stdout)
```
- 网路IO
```javascript
const result = ''
req.on('data', chunk=>{
  const str = chunk.toString()
  result += str
})
req.on('end', ()=>{
  res.end('接受完毕')
})
```

### stream操作文件
```javascript
const fs = require('fs')
const path = require('path')

const filename1 = path.resolve(__dirname, 'data.txt')
const filename2 = path.resolve(__dirname, 'data-bak.txt')
// 创建读取文件的对象
const readStream = fs.createReadStream(filename1)
// 创建写入文件的对象
const writeStream = fs.createWriteStream(filename2)
// 通过pipe进行拷贝
readStream.pipe(writeStream)
readStream.on('end', ()=>{
  console.log('拷贝完成')
})
``` 

### stream网络IO
```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res)=>{
  if(req.method=='GET') {
    const filename = path.resolve(__dirname, 'filename.text')
    const readStream = fs.createReadStream(filename)
    readStream.pipe(res)
  }
})
```




