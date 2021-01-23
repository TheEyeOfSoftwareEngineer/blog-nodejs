const router = require('koa-router')()
router.prefix('/api/user')

const {login} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', async (ctx, next)=> {
  const {username, password} = ctx.request.body
  const result = await login(username, password)
  if(result.username) {    
    ctx.session.username = result.username
    ctx.session.realname = result.realname
    ctx.body = new SuccessModel('登陆成功')    
    return
  }
  ctx.body = new ErrorModel('登录失败')  
})

// router.get('/session-test', async function (ctx, next) {
//   if(ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0;
//   }
//   ctx.session.viewCount ++
//   ctx.body = {
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   }
// })

module.exports = router