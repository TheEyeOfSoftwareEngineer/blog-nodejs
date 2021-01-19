const env  = process.env.NODE_ENV // 获取环境变量

let MYSQL_CONF

if(env === 'dev') {
  MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'yourpassword',
    port:'3306',
    database:'myblog'
  }
}

if(env == 'production') {
  MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'yourpassword',
    port:'3306',
    database:'myblog'
  }
}


module.exports = {
  MYSQL_CONF
}