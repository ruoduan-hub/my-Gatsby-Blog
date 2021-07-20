---
title: Nginx 开启 HTTP/2
date: 2021-02-28
tags: web-other
categories: web-other
---



## 记、Nginx 开启 HTTP/2

> HTTP 2.0即超文本传输协议 2.0，是下一代HTTP协议。是由互联网工程任务组（IETF）的Hypertext Transfer Protocol Bis (httpbis)工作小组进行开发。是自1999年http1.1发布后的首个更新。
> HTTP/2 协议是从 SPDY 演变而来，SPDY 已经完成了使命并很快就会退出历史舞台（例如 Chrome 将在「2016 年初结束对 SPDY 的支持」；Nginx、Apache 也已经全面支持 HTTP/2 ，并也不再支持 SPDY）。一般的大家把        HTTP2 简称为 h2，尽管有些朋友可能不怎么愿意，但是这个简称已经默认化了，特别是体现在浏览器对 HTTP2 都是这个简写的。普通的 HTTPS 网站浏览会比 HTTP 网站稍微慢一些，因为需要处理加密任务，而配置了 h2 的 HTTPS，在低延时的情况下速度会比 HTTP 更快更稳定！



- 配置Nginx开启http 2.0特别简单，只要在Nginx配置文件中找到你要开启http2.0的域名server模块，然后将 listen 443 ssl;改成 listen 443 ssl http2; 即可。

```js
  server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.ruoduan.cn; 
    
    .... 此处其他省略配置
		
    ssl_prefer_server_ciphers on;
    
    location / {
      root /root/www/;
      index index.html;
    }
  }
```


保存配置文件之后，重启或重载Nginx即可生效：`nginx -s reload`





### 服务器配置生成优化网站

> 推荐个不错的服务器配置生成网站 👇

[服务器配置生成优化网站](https://ssl-config.mozilla.org/)



### 验证

> 验证的方式有许多种：插件、network、网站 ...
>
> 我这里 举例 🌰 ，最方便的 （code 验证）👇



- 在浏览器的`Console`中输入：` window.chrome.loadTimes()`



### set before

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1go4hyotvf1j20l60rkwj9.jpg" alt="http1" style="zoom:50%;" />



### set after

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1go4i06mbbkj20ja0qegq8.jpg" alt="image-20210301164546658" style="zoom:50%;" />





