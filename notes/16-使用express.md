## express
- nodejs最常用的web server框架

### express脚手架
express脚手架: express-generator
```shell
npm i express-generator
express projectname
```

### app.js
```javascript
app.use(logger('dev')); //日志
app.use(express.json()); //解析数据格式为JSON的数据 
app.use(express.urlencoded({ extended: false })); //解析数据格式为非JSON的数据格式
app.use(cookieParser()); //解析cookie

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 处理无效路由
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

### express路由注册等
```javascript
const blogRouter = require('./routes/blog');
app.use('/api/blog', blogRouter); // 父路由

var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) { //子路由
  res.json({
    errno: 0,
    data: [1,2,3]
  })
});

router.post('/login', function(req, res, next) {
  // req.body中有经过express.json()处理后的前端传过来的json数据以及express.urlencoded()处理的其他类型的数据
  
  const {username, password} = req.body
  res.json({
    errno: 0,
    data: {
      username,
      password
    }
  })
});
```

