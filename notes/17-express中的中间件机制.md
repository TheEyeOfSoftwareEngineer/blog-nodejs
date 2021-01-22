## 中间件机制

在下面的代码中app.get在执行最后的callback或者说也是一个中间件之前会先执行第一个函数或者中间件loginCheck. 就像koa2中一样，next是中间件之间连接的桥梁，如果没有next的执行，那么就不会进行后面函数的执行。

中间件的存在让函数或者逻辑的执行像流水一样，当前一个中间件执行完毕，后面的符合要求的可以继续执行。

```javascript
function loginCheck(req, res, next) {
  console.log("执行该中间件")
  next()
}
  
app.get('/api/get', loginCheck, (req, res, next)=>{
  // ...
})
```