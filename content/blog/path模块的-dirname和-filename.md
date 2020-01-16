---
title: path模块的__dirname和__filename
date: 2019-01-26
tags: Nodejs
comments: true
categories: 《Nodejs》
---

## nodejs ——path模块的__dirname 和 __filename
- 我们在使用nodejs，可能需要对 node_modules 开放一些目录，fs 取的是绝对路径，而我们在不同的环境下，node_modules 可能存在于 不同的 根目录中，这个时候我们就要用到 join（）方法 来吧绝对路径进行一个转换，
  来获取一个动态的绝对路径
  <br>
```js
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
```
- 这里我们开放了 public和node_modules 这2个 目录文件夹
 - __dirname 和 __filename
   + **动态的** 获取当前文件或者文件所处目录的绝对路径
   + 用来解决文件操作路劲的相对路径问题
   + 因为在文件操作中，相对路径相对于执行 `node` 命令所处的目录
   + 所以为了尽量避免这个问题，都建议文件操作的相对路径都转为：**动态的绝对路径**
   + 方式：`path.join(__dirname, '文件名')`

-  __dirname 和 __filename 是模块中 的一个内置成员，他们分别是：
  + __dirname 是当前文件夹的绝对路径
  + __filename是当前文件的绝对路径
-  一般情况下都是 配合 join方法使用的，把当前相对路径转换为 动态的绝对路径