---
title: 记-vue vue.config.js 配置webpack全局变量
date: 2020-04-27
tags: 记
categories: 记
---

## 缘起
> vue-cli3 以来 是不会 暴露 webpack.config.js 的 需要我们手动来配置
> 因为近期 接手的一个项目 我需要从 package.josn 拿参数 然后 在其他 `js`文件拿到配置

- 大致步骤如下：

1. 项目根目录 创建文件 `vue.config.js`
2. 添加配置 =》 配置全局变量
3. 其他js 拿到全局变量

- 配置大致和 webpack 差不多 

### for example
我们通过 `process` 来获取参数
 - process.env config 参数
 - process.env 自定义参数 参数
#### VUE 平台配置内容
> 我们在这里的 配置都会被合并到 配置文件中 use [ webpack-merge](https://github.com/survivejs/webpack-merge)

- 我们当前 需求使用`chainWebpack` 
> 类似这样 
```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```

我们需要到 配置业比较简单 如下：⬇️

```js
// VUE 平台配置内容
module.exports = {
  // 配置自定义环境变量
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => { 
          args[0].BUILD_REF = JSON.stringify(ref)
          return args
      })

}}
```

可以看到 我们自定义来 一个 `BUILD_REF`  全局变量 接下来 就可以在任何地方引用它来

[vue-cli 参考文档](https://cli.vuejs.org/zh/config/#integrity)

## 完