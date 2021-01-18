const querystring = require('querystring')

const handlerBlogRouter = (req, res) => {
  const methd = req.method
  
  // 获取博客列表
  if(methd === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: "获取博客列表的接口"
    }
  }

  // 获取博客详情
  if(methd === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: "获取博客详情的接口"
    }
  }

  // 新建一篇博客
  if(methd === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: "新建一篇博客的接口"
    }
  }

  // 更新一篇博客
  if(methd === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: "更新一篇博客的接口"
    }
  }

  // 删除一篇博客
  if(methd === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: "删除一篇博客的接口"
    }
  }

}

module.exports = handlerBlogRouter