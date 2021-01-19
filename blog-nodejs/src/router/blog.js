const { 
  getList, 
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handlerBlogRouter = async (req, res) => {
  const methd = req.method
  const id = req.query.id
  
  // 获取博客列表
  if(methd === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = await getList(author, keyword)
    return new SuccessModel(result)
  }

  // 获取博客详情
  if(methd === 'GET' && req.path === '/api/blog/detail') {
    
    const detailData = await getDetail(id)
    return new SuccessModel(detailData)
  }

  // 新建一篇博客
  if(methd === 'POST' && req.path === '/api/blog/new') {
    const author = 'zhangsan'
    req.body.author = author // 假数据 欠缺登录模块
    const blogData = req.body
    const data = await newBlog(blogData)
    return new SuccessModel(data)
  }

  // 更新一篇博客
  if(methd === 'POST' && req.path === '/api/blog/update') {
    const result = await updateBlog(id, req.body)
    if(result) {
      return new SuccessModel('更新博客成功')
    } else {
      return new ErrorModel('更新博客失败')
    }
    
  }

  // 删除一篇博客
  if(methd === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan' // 假数据 欠缺登录模块
    const result = await delBlog(id, author)
    if(result) {
      return new SuccessModel('删除成功')
    } else {
      return new ErrorModel('删除失败')
    }
  }
}

module.exports = handlerBlogRouter