const {login} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handlerUserRouter = async (req, res) => {
  const method = req.method

  // 登录
  if(method === 'GET' && req.path === '/api/user/login') {
    // const {username, password} = req.body
    const {username, password} = req.query    
    const result = await login(username, password)
    if(result.username) {
      // 操作cookie
      res.setHeader('Set-Cookie', `username='${result.username}'; path=/; httpOnly; expires=${getCookieExpires()}`)
      return new SuccessModel('登陆成功')
    }
    return new ErrorModel('登录失败')
  }

  // 登录测试
  if(method === 'GET' && req.path === '/api/user/login-test') {
    if(req.cookie.username) {
      return new SuccessModel('登录成功')
    }
    return new ErrorModel('您还未登录')
  }

}

module.exports = handlerUserRouter