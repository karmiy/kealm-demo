![logo](../../shared/static/imgs/logo-kealm.png)

# Nginx

[Nginx](https://nginx.org/download/) 是一款轻量级的 HTTP 服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡

## NodeJs 做服务器？

原则上说 NodeJs 的 http 包可以替代 nginx

但实际部署都是 NodeJs 作为逻辑层，位于 nginx 之后

NodeJs 没那么适合直接作为对外的服务器，更适合作为业务底层服务，即业务底层处理的服务器，如处理请求（作为接口）

纯 NodeJs 如果作为线上 HTTP 服务器，因为要处理大量的业务逻辑，要让 NodeJs 服务器充分利用硬件资源的很难的，特别是大量负载时

## 基本运行逻辑

- 在 master 主进程，来了请求任务就创建一个 worker 子进程
- 新的请求进入时如果每个 worker 都在处理中，则还是创建新的 worker 子进程
- 新的请求进入时如果之前的已经处理好了，复用之前的 worker 子进程
- 空闲的 worker 一段时间没新的任务会销毁

## 命令

```sh
# 帮助提示
nginx -h
# 查看版本
nginx -v
# 查看版本 + 配置信息，如 --conf-path 为配置文件地址
nginx -V
# 测试配置是否正确
nginx -t
# 启动
start nginx
# send signal to a master process，即对 master 进程下命令
nginx -s ...
# 重新打开日志，重名名 access.log 日志文件，并重新创建新 access.log 文件（通常是把日志划分，比如每天 reopen 一次，一天一个日志）
nginx -s reopen
# 优雅停止，没处理完的请求继续处理，新来的 master 也不接了
nginx -s quit
# 立即停止
nginx -s stop
# 重新加载，即改完配置文件后，让新的请求用新的这个配置，本来正在处理的还是保持本来的，不影响本来的子进程
nginx -s reload
```

linux 下可用：

```sh
# 查看 300X 的端口占用
netstat -tupln | grep 300*
# 杀进程，9007 是上面命令显示的进程号
kill -g 9007
```



## nginx.conf

### 配置区概览

```sh
# 全局配置区，nginx 核心功能配置
Main
# 事件区，子进程核心配置
events {

}

# http 服务配置区
http {
	# 不同服务配置区
	server {
		# 不同请求路径
		location {
		
		}
	}
}

# 邮件代理配置区
mail {
	server {
	
	}
}
```

### 配置解析

```sh
# 子进程数，auto 即默认尽可能利用硬件资源
# 通常也可以写成 cpu 数量等同（如 4 核 8 线程，由于操作系统还要做别的事，写 8 不合适，通常可以写核数 4）
# worker_processes  1;
worker_processes  auto;

events {
	# 一个 worker 子进程可以处理的请求数（如当前 woker 子进程 A 正在处理，又来一个请求，是继续给 A 处理还是新开 B），看 CPU 处理能力
    # 通常 1024 2048，理论上限是 65535（操作系统可以打开的最大句柄数）
    worker_connections  1024;
}


http {
	# 支持文件的类型，所有支持的类型都在这个 mime.types 文件里
	#include       /etc/nginx/mime.types;
    include       mime.types;
    # 如果返回其他类型，默认返回流
    default_type  application/octet-stream;

	# 请求日志
    access_log  logs/access.log  main;
    # 错误日志
    error_log  logs/error.log;

	# 这 3 个开启后 nginx 会最大限度平衡网络 IO 及文件读取 IO
    sendfile        on;
    tcp_nopush     on;
    tcp_nodelay		on;

	# http 建立连接后的存活时间（正常请求完就断开），即一个请求完不断开，65s 内下一次来请求还是用这个连接来处理
    #keepalive_timeout  0;
    keepalive_timeout  65;
    
    # 读取数据时，会有缓存，散列值的表来记录，设置越大内存消耗就越大，散列表 key 的冲突率就越低，检索率越快
    # 通常根据内存配置，如 4G 内存 2048
    types_hash_max_size 2048;
    
    # 开启向下兼容
    ssl_prefer_server_ciphers  on;

	# 让服务器开启 gzip 压缩，让数据传输量小
    gzip  on;
    
    # 引入其他配置项
    #
    include /etc/nginx/modules-enabled/*.conf;
}
```

```sh
server {
	# 监听 80 端口
	listen 80 default_server;
	listen [::]:80 default_server;
	
	# 请求处理返回的资源的根路径，去这个路径下找资源
	root /var/www/html
	# 找 root 路径下的 index.html，找不到就找 index.htm，再找不到则 index.nginx-debian.html
	index index.html index.htm index.nginx-debian.html;
	
	# 虚拟主机的名字，_ 表示没有
	server_name _;
	
	# 请求路径是 / 时
	location / {
		# $uri 即请求的 uri 路径
		# 先 try_files 看能不能找到上面 index 文件
		# 找不到，$uri/ 即请求的 uri 路径后面再加个 / 看有没有
		# 都没有返回 404（页面会显示 404 Not Found）
		# 如请求 ip:80/a.html，先 try_files 看 root 路径下有没有 a.html 文件，如果没有就 a.html/ 去读看有没有
		try_files $uri $uri/ = 404;
	}
}
```

## 反向代理

```sh
server {
	# 反向代理
	# 请求 /node（192.168.2.243/node） 就代理转发到本地 3000 服务
	location /node {
		proxy_pass http:127.0.0.1:3000;
	}
	
	# 反向代理到专门的资源服务器
	# ~ 表示任意，即 xxx.jpg 或 xxxx.png 都转发到 3001
	# 如上方 /node 转发到 3000 后，那边页面有 <img /> 加载 ./imgs/a.png
	# 那就会转发到 http://127.0.0.1:3001/imgs/a.png
	location ~ \.(jpg|png)$ {
    	proxy_pass   http://127.0.0.1:3001;
    }
}
```

```sh
# 进入 node-server 目录
# 启动 3000 node 服务
npm run serve

# 启动 3001 图片服务
npm run image:a

# 访问 192.168.2.243:80/node
```

## 负载均衡

多台相同业务逻辑的服务器，被称为服务器集群

请求到来时，派发到哪台服务器进行处理，取决于代理转向哪个服务器，这项能力为负载均衡

```sh
http {
	# 负载均衡会自动根据多个服务器情况，选择某个服务器加载资源
	# 如去 3001 或 3002 加载图片资源
	# img_server 是自定义名称
	upstream img_server {
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
        
        # 配置权重，如 3001 的服务器性能好，多分一点
        # 配置失败次数、超时时间
        # 如下表示：30s 内请求某一个服务器失败 3 次，则认为宕机，然后等待 30s，这个期间新的请求不再发到这台宕机的服务器而是其他正常的，30s 到了后新请求继续尝试连接宕机应用且仅尝试 1 次，还是失败继续等 30s 以此类推
        server 127.0.0.1:3001 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:3002 weight=1 max_fails=3 fail_timeout=30s;
    }
    
    server {
        location /node {
            proxy_pass http:127.0.0.1:3000;
        }

        location ~ \.(jpg|png)$ {
        	# 对应上面的 upstream
            proxy_pass   http://img_server;
        }
    }
}
```

```sh
# 进入 node-server 目录
# 启动 3000 node 服务
npm run serve

# 启动 3001 图片服务 a
npm run image:a

# 启动 3002 图片服务 b
npm run image:b

# 访问 192.168.2.243:80/node 可用看到随着刷新，显示不同的图片（见代码，服务器 b 不管加载什么都返回同一张图）
```

## 其他

- 虚拟主机配置
- rewrite 重写
- https 配置
- http2 配置
- 邮件服务配置
- 日志管理
- 缓存设置
- 安全配置
- 性能优化