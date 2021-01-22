var express = require('express');
var router = express.Router();

const {login} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', async (req, res, next)=> {
  const {username, password} = req.body
  const result = await login(username, password)
  if(result.username) {    
    req.session.username = result.username
    req.session.realname = result.realname
    res.json(
      new SuccessModel('登陆成功')
    )
    return
  }
  res.json(
    new ErrorModel('登录失败')
  )
});

// router.get('/login-test', (req, res, next)=>{
//   if(req.session.username) {
//     res.json({
//       errno: 0,
//       msg: '已登录'
//     })
//     return
//   }
//   res.json({
//     errno: -1,
//     msg: '未登录'
//   })
// })


module.exports = router;