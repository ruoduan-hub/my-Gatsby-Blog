---
title: 微信小程序WebView在IOS中回退刷新问题
date: 2024-05-21
tags: 记
comments: true
categories: 记
---



### 缘起

在微信小程序IOS 某些版本中(我遇到的是 17^ )的 WebView中，回退并不会触发重新渲染；

无论是使用 `pageshow` 监听还是，effect 都没用；

捣鼓了各种方式 发现嵌套 在 `iframe` 中可以，但是这样的方式过于复杂和相当于 嵌套了三层：

微信 WebView => iframe => Project A => ProjectB，交互起来过于麻烦。



### Solve

> 经过多次尝试，发现就是微信小程序在 IOS特定系统中，back 会缓存当前页面，回退根本不会触发渲染；直接配置在该项目的 Nginx 中配置缓存 `Cache-Control`  指定浏览器 no-cache👇

```yaml
# Nginx Config
...

location /ProjectA {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires 0;
}

...
```

- `Cache-Control "no-cache, no-store, must-revalidate";` 告诉浏览器不要缓存页面的副本，每次都需要向服务器重新请求内容

- `add_header Pragma "no-cache";`：`Pragma` 是一个 HTTP/1.0 的遗留指令，旧版本浏览器特定指令，这里的含义是不要缓存页面。

- `add_header Expires 0;`值为 `0`将过期时间设置为过去的时间，以确保浏览器立即将内容标记为过期，从而不会缓存页面。
