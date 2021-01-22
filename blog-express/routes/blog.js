var express = require('express');
var router = express.Router();

const { 
  getList, 
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function(req, res, next) {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if(req.query.isadmin) {
    console.log("is admin")
    if(req.session.username==null) {
      console.log("is admin, but not login in")
      res.json(
        new ErrorModel('未登录')
      )
      return
    }
    author = req.session.username
  }
  
  const result = getList(author, keyword)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
});

router.get('/detail', async (req, res, next)=> {
  const detailData = await getDetail(req.query.id)
  res.json(
    new SuccessModel(detailData)
  )
});

router.post('/new', loginCheck, async (req, res, next)=>{  
  req.body.author = req.session.username  
  const data = await newBlog(req.body)
  res.json(
    new SuccessModel(data)
  )
})

router.post('/update', loginCheck, async (req, res, next) => {
  const result = await updateBlog(req.query.id, req.body)
  if(result) {
    res.json(
      new SuccessModel('更新博客成功')
    )    
  } else {
    res.json(
      new ErrorModel('更新博客失败')
    )    
  }
})

router.post('/delete', loginCheck, async (req, res, next)=> {
  const author = req.session.username
  const result = await delBlog(id, author)
  if(result) {
    res.json(
      new SuccessModel('删除成功')
    )    
  } else {
    res.json(
      new ErrorModel('删除失败')
    )    
  }
})

module.exports = router;