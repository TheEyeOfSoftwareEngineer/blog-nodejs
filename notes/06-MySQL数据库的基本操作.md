## MySQL数据库的基本操作

### 建库

### 建表

### 操作表
- 增、删、改、查
```sql
use myblog;
show tables;
-- show tables; --注释
-- 不等于符号: <>

-- 增
insert into users (username, `password`, realname) values('zhangsan', '123', '张三');

-- 删 (软删除)
delete from users where username='lisi';
update users set state='0' where username='lisi';

-- 改
update users set realname='李四2' where username='lisi';
-- 修改更改/删除模式: SET SQL_SAFE_UPDATES = 0;

-- 查
-- 全部查询
select * from users;
select * from users where state='1';
-- 查询特定的列
select id, username from users;
-- 查询特定条件
select * from users where username='zhangsan';
select * from users where username='zhangsan' and `password`='123';
select * from users where username='zhangsan' or `password`='123';
-- 模糊查询
select * from users where username like '%zhang%';
-- 正序倒序查询
select * from users where `password` like '%1%' order by id;
select * from users where `password` like '%1%' order by id desc;
```

```sql
-- 查询所有所有的文章
select * from blogs order by createtime desc;

-- 查询特定作者的文章
select * from blogs where author = 'zhangsan' order by createtime desc;

-- 查询类似标题的文章
select * from blogs where title like '%A%';
```