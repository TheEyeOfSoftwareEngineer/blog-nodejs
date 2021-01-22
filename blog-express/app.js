var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const {BASE_CONF} = require('./conf/db')

const ENV = process.env.NODE_ENV

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup 引入视图引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

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

app.use(express.json()); //解析数据格式为JSON的数据 
app.use(express.urlencoded({ extended: false })); //解析数据格式为非JSON的数据格式
app.use(cookieParser()); //解析cookie
// app.use(express.static(path.join(__dirname, 'public')));
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
  store: sessionStore
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// 下面是自定义的router
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
