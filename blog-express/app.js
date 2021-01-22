var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const {BASE_CONF} = require('./conf/db')


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup 引入视图引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev')); //日志
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
