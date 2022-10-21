---
title: NPM包魔改利器 patch-package 给包打补丁
date: 2022-10-20
tags: Front-end
comments: true
categories:  Front-end
---

## NPM包魔改利器 patch-package 给包打补丁


![patch-package-png](https://s2.loli.net/2022/10/20/dpwK7A4IWeOm2Jv.png)



## 缘起
> 在使用 `npm` 包的过程中有有一些特性不支持，可以通过修改源码来完成，尽管已经可以通过 Issues | pr ; 但是毕竟开源社区审核较慢，这时候就可以通过 `patch-package `来完成

- 当然其他方法也有很多种，patch-package 对比 其他方法 算是最优解吧



## 安装

```shell
    npm i patch-package -D
    
    or
    
    yarn add patch-package postinstall-postinstall  -D
```

> ps：这里有一个坑，就是使用 yarn 的话要多装一个 `postinstall-postinstall` [Why use postinstall-postinstall with Yarn](https://github.com/ds300/patch-package#why-use-postinstall-postinstall-with-yarn)

大概意思就是说：大多数情况下在npm包 安装和卸载的时候 `patch-package ` 会通过 diff 去替换包内的源码，但是 yarn 只会在 安装的时候执行，卸载的时候不会去执行，使用 `postinstall-postinstall` 后确保卸载的时候也会执行.


## 生成源码
> 以 antd 为例子 🌰

我们首先去 fork antd 的代码 拉到本地后，我们修改源码，跑过单元测试等等.

- 等待打包 `yarn build`


![file-dev](https://s2.loli.net/2022/10/20/QxOihNqeA7Fy3YE.jpg)

把需要的模块 扔到对应 包下面

- 生成补丁 

```
yarn patch-package package-name(修改的包名)

or

npx patch-package package-name（npm版本 > 5.2）
```

此时，项目根目录 会出现 一个 `patches` 文件夹 📂, 里面会有类似 git diff 数据

![diff-png](https://s2.loli.net/2022/10/20/b1nPQUwGyhEWVS9.jpg)


- 添加 script 

```
    "patchinstall": "patch-package"
```

这样每次 install 完成后 执行 `patchinstall` 就会去替换源文件中的更改


然后正常 提交 commit 就行 . 


> 这样以后，其他人每次 install 后只要 执行下 patchinstall 就可以了

**注意：**

> patch-package 是锁定版本的，所以在 `package.json` 最后是把版本锁定到当前 `patchinstall` 的这个版本


### other 
> 介绍下其他方法

1. copy 整个项目法

- 直接把整个项目 copy 下来放到项目中引用
- 或者把整个项目 copy 下来 发布到私有 npm 使用

2. 修改引用法

- 通过 `webpack alias` 配置

```
resolve: { alias: { 'antd-mobile/calendar': path.resolve(__dirname, './patched/calendar/*'), } }
```

---

            大同小异 ...