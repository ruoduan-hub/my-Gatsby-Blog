---
title: Verdaccio搭建私有包管理库
date: 2022-07-21
tags: Nodejs
categories: Nodejs
---



### 缘起

> 没有什么特别的原因



#### 环境准备

- CentOS (Linux 系列)
- yum | apt | wge ...
- Nodejs
- npm
- Verdaccio



#### 1. 安装Nodejs & npm

```shell
yum install -y nodejs npm
```



#### 2. 安装 Verdaccio

```shell
npm install verdaccio -g
```



#### 3. 启动 Verdaccio

```shell
# verdaccio 可直接启动 
verdaccio
```



启动之后会看到如下👇🏻

```shell
warn --- config file  - /root/verdaccio/config.yaml
(node:22955) Warning: Verdaccio doesn't need superuser privileges. don't run it under root
(Use `node --trace-warnings ...` to show where the warning was created)
(node:22955) Warning: Verdaccio doesn't need superuser privileges. don't run it under root
 warn --- "crypt" algorithm is deprecated consider switch to "bcrypt". Read more: https://github.com/verdaccio/monorepo/pull/580
 info --- plugin successfully loaded: verdaccio-htpasswd
 info --- plugin successfully loaded: verdaccio-audit
 warn --- http address - http://localhost:4873/ - verdaccio/5.13.0
```

启动成功了 ！



- 配置文件：`config file  - /root/verdaccio/config.yaml`

- 访问路径 `http://localhost:4873/ `

---

> 我们可以通过配置文件来改变默认端口



具体参考文档 👉🏻 [link](https://verdaccio.org/docs/configuration/)



- 这个时候我们已经可以访问到了

![image-20220621144010607](https://i.postimg.cc/ZKbw758q/20220621144203.jpg)



但是这时候 终端不能断，所以我们要守护进程



#### 守护进程

> 使用 pm2 守护进程 或者 直接 nohup 来进程常驻

```shell
npm install pm2 -g

or

nohup verdaccio >/root/verdaccio/verdaccio.log 2>&1 &
```



- ps： 还需要去开启 verdaccio 对应端口的安全组 



#### 完

