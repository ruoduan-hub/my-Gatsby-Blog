---
title: "记-use-fish-shell"
date: 2021-01-18
tags: 记
comments: true
categories: 记
---


### Works Out Of The Box
> fish-shel 是一个简洁的 shell，内置功能强大 省去很多配置

### 安装fish-shell

```shell
brew install fish
```

### 查看当前shell列表

```js
cat /etc/shells

# 类似这样
/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

### 将fish-shell添加到列表中
```shell
/usr/local/bin/fish    
```

### 替换shell
```js
chsh -s /usr/local/bin/fish
```


### 重启终端 => fish_config
> 配置主题,在 浏览器里面配置保存

```shell
fish_config
```

![fish_config](https://tva1.sinaimg.cn/large/008eGmZEly1gmrnafd191j31r60u0tnr.jpg)


