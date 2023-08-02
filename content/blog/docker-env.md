---
title: "记-Docker服务器时间之ENV环境变量"
date: 2023-08-02
tags: 记
comments: true
categories: 记
---



## 记-Docker 服务器时间之ENV环境变量



### 缘起

> 发现使用 当前时间 `format('YYYY-MM-DD HH:mm:ss')` 的时候本地运行时正确的，服务器Docker 镜像中调用晚八个小时，进去 `exec bash`  `date` 打印时间 发现镜像中默认时区是 UST

解决方案：👇🏻

1. `docker run -e TZ=Asia/Shanghai xxxx`
2. 设置 `Dockerfile` 的 ENV

```dockerfile
FROM node:18.15.0

# 设置时区
ENV TZ=Asia/Shanghai

# 设置主机名
ENV HOSTNAME=my-container

WORKDIR /app

COPY . .

...略

```

其中`TZ` —— 时区设置，用于指定容器的时区。



顺势看了下重用的`ENV` 整理如下：

| 变量                         | 解释                                     |
| ---------------------------- | ---------------------------------------- |
| PATH                         | 用于指定可执行文件的搜索路径。           |
| HOME                         | 用户的主目录路径。                       |
| USER                         | 当前用户的用户名。                       |
| PWD                          | 当前工作目录的路径。                     |
| LANG                         | 指定容器的默认语言设置。                 |
| TERM                         | 终端类型，用于控制终端的行为和显示方式。 |
| HOSTNAME                     | 容器的主机名。                           |
| TZ                           | 时区设置，用于指定容器的时区。           |
| HTTP_PROXY / HTTPS_PROXY | HTTP/HTTPS 代理服务器的地址。            |
| NO_PROXY | 不使用代理的主机列表。 |





