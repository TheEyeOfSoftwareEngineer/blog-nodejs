## 从路由到Controller

- router 
负责处理关于路由的相关信息并且处理请求中的一系列参数和返回中的参数格式等

- controller
负责处理关于数据层面的信息。controller从router中获取到对应路由所代表的请求中所需的参数，并根据这些参数获取相应的数据且返回给router

- model
目前model中只定义了回复相关的数据模型


1. app作为程序入口将处理好的req数据传到router
```javascript
const blogData = handlerBlogRouter(req, res)
```

2. router拿到req信息后根据method,path,postData等内容调用对应资源的处理方法
```javascript
if(methd === 'GET' && req.path === '/api/blog/list') {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const listData = getList(author, keyword)
  return new SuccessModel(listData)
}
```

3. controller中对应的方法根据router中传入的参数进行数据处理并返回相应的数据结果
```javascript
const getDetail  = id => {
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1610950330874,
    author: "zhangsan"
  }
}
```

4. router中获得controller返回的数据后利用model将信息反馈给app
```javascript
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}
```

5. app将对应的信息JSON化以后将数据传到服务消费者
```javascript
if(blogData) {
  res.end(
    JSON.stringify(blogData)
  )
  return
}
```