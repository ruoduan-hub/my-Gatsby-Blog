---
title: create-react-app 没有[src] 文件夹（记一次问题）
date: 2020-02-13
tags: 记
categories: 记
---

## 缘起

在使用 `npx create-react-app xx-app` 的时候创建项目后没有`scr` 文件夹,看了一下`package.json`也不对

然后顺势检查来一下 `nodejs` `npm` `yarn` 什么的都是正常的, 非常疑惑，然后去`github` 翻了翻

## 问题原因

是因为官方已经弃用了独立安装包 `create-react-app` 这个 cli 脚手架，如果没有及时卸载 就会出现这个问题。

## 解决

卸载全局安装包

```
npm uninstall -g create-react-app
```

&&

```
yarn global remove create-react-app
```

然后使用 `旧的cli 测试一下` => `sudo create-react-app my-test`，如果执行了就说明 安装包还存在。—— 卸载就好

如果返回了 一个路径如`/ usr / local / bin / create-react-ap` 就使用 `rm -rf / usr / local / bin / create-react-app` 手动删除

ojbk ～

## ps

还有一种解决方案 带上参数忽略本地的 cli

```
npx --ignore-existing create-react-app my-app
```
