---
title: Volta 对每个项目的Node版本管理
date: 2024-06-14
tags: 记
comments: true
categories: 记
---



### 缘起

> 介绍一个工具 Volta 👉 [Volta](https://docs.volta.sh/guide/)，用来做项目环境管理的，他和诸如此类的`nvm、n、...`有啥不一样呢？他是针对项目的不用在多项目之间切换的时候来回切换环境，且可以多个环境一起 Start



- 直接安装

```shell
curl https://get.volta.sh | bash
```

Windows 参考官网 下载程序 [doc](https://docs.volta.sh/guide/getting-started)

- 进入项目文件目录下面 cd /projectxxx

```shell
volta pin node@18
volta pin npm@6.3
volta pin yarn@1.17
...
```

诸如此类然后就会在 `package.json` 增加如下👇

```json
...

"volta": {
    "node": "18.20.3",
    "yarn": "1.19.2"
  }

...
```



然后在本项目内`node -v` 就是指定版本啦～ 
