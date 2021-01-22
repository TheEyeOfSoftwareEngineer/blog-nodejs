const {login} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {set} = require('../db/redis')

const handlerUserRouter = async (req, res) => {
  const method = req.method

  // 登录
  if(method === 'POST' && req.path === '/api/user/login') {
    const {username, password} = req.body
    // const {username, password} = req.query    
    const result = await login(username, password)
    if(result.username) {
      // 设置session
      req.session.username = result.username
      req.session.realname = result.realname

      // 同步到redis
      set(req.sessionId, req.session)

      return new SuccessModel('登陆成功')
    }
    return new ErrorModel('登录失败')
  }

  // // 登录测试
  // if(method === 'GET' && req.path === '/api/user/login-test') {
    
  //   if(req.session.username) {
  //     return new SuccessModel({
  //       session: req.session
  //     })
  //   }
  //   return new ErrorModel('您还未登录')
  // }

}

module.exports = handlerUserRouter