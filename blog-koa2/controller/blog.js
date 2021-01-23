const xss = require('xss')
const {exec} = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(author) {
    sql += `and author='${author}' `
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回promise
  return await exec(sql)
  
}

const getDetail  = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  // blogData对象中有title content author 属性
  const title = xss(blogData.title)
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()

  const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createtime}, '${author}')`
  const data = await exec(sql)
  return {
    id: data.insertId
  } 
}

const updateBlog = async (id, blogData={}) => {

  const title = blogData.title
  const content = blogData.content

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
  const data = await exec(sql)
  return data.affectedRows == 1  
}

const delBlog = async (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`
  const data = await exec(sql)
  return data.affectedRows == 1  
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}