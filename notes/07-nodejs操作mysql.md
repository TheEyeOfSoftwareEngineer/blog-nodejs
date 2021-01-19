## nodejs操作MySQL

```javascript
const mysql = require('mysql')

// 创建连接对象
const connect = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'yourpassword',
  port:'3306',
  database:'myblog'
})

// 开始连接
connect.connect()

// 执行sql
const sql = 'select * from users'
connect.query(sql, (err, res)=> {
  if(err) {
    console.log(err)
    return
  }
  console.log(res)
})

// 关闭连接
connect.end()
```

- 如果是新加入的数据判断结果中的`insertId`
- 如果是更改或者删除数据判断结果中的`affectedRow`或者`changedRow`
- 查询的结果为一个对象的列表

```javascript
const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

// 统一执行sql的函数并返回Promise
function exec(sql) {
  const promise = new Promise((resolve, reject)=> {
    con.query(sql, (err, res)=>{
      if(err) {
        reject(err)
        return
      }
      resolve(res)
    }) 
  })
  return promise
}

module.exports = {
  exec
}
```