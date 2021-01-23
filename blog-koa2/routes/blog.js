const router = require('koa-router')()
router.prefix('/api/blog')

const { 
  getList, 
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', async (ctx, next)=> {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  if(ctx.query.isadmin) {
    console.log("is admin")
    if(ctx.session.username==null) {
      console.log("is admin, but not login in")
      ctx.body = new ErrorModel('未登录')      
      return
    }
    author = ctx.session.username
  }
  const data = await getList(author, keyword)
  ctx.body = new SuccessModel(data)
})

router.get('/detail', async (ctx, next)=> {
  const detailData = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(detailData)
});

router.post('/new', loginCheck, async (ctx, next)=>{  
  ctx.request.body.author = ctx.session.username  
  const data = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(data)  
})

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body)
  if(result) {
    ctx.body = new SuccessModel('更新博客成功')
  } else {
    ctx.body = new ErrorModel('更新博客失败')    
  }
})

router.post('/delete', loginCheck, async (ctx, next)=> {
  const author = ctx.session.username 
  const result = await delBlog(ctx.query.id, author)
  if(result) {
    ctx.body = new SuccessModel('删除成功')    
  } else {
    ctx.body = new ErrorModel('删除失败')    
  }
})


module.exports = router