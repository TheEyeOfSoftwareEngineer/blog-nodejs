## 与前端联调
- 登录功能依赖cookie,必须用浏览器来联调
- cookie跨域不共享,前端和server端必须同域
- 需要用到nginx做代理,让前端和server同域

```
本地启动http-server配置html页面
http-server -p 8001
```

### nginx
- 高性能的web服务器,开源免费
- 一般用于做静态服务、负载均衡
- 反向代理

#### nginx基本命令
```
- 安装nginx
brew install nginx

- 配置文件位置
/usr/local/etc/nginx/nginx.conf

- 测试配置文件格式是否正确
nginx -t

- 启动nginx
nginx

- 重启nginx
nginx -s reload

- 停止
nginx -s stop
```

#### nginx配置文档
```
worker_processes 2; # CPU核心启动数目

# 设置开头为/的地址指向链接
location / {
  proxy_pass http://localhost:8001;
}

# 设置开头为/api/的地址指向链接
location /api/ {
  proxy_pass http://localhost:3000;
  proxy_set_header Host $host;
} 
```