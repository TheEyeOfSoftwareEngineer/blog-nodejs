const getList = (author, keyword) => {
  // 先返回fake data,但是需要保证格式正确
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1610950330874,
      author: "zhangsan"
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1610950374343,
      author: "lisi"
    }
  ]
}

const getDetail  = id => {
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1610950330874,
    author: "zhangsan"
  }
}

const newBlog = (blogData = {}) => {
  // blogData对象中有title content 属性

  console.log("blog data: ", blogData)

  return {
    // 表示新建博客在数据表中的id位置
    id: 3
  }  
}

const updateBlog = (id, blogData={}) => {

  console.log("update blog: ", id, blogData)

  return true
}

const delBlog = id => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}