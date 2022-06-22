---
title: 使用Rollup构建SDK
date: 2022-06-23
tags: Nodejs
categories: Nodejs
---

### 缘起
> 需要提供一个JavaScript的 SDK， 当然我们使用 `webpack`可也以构建；
> ps(对于现代浏览器来说 webpack 打包体积 其实都不算事)
> 主要是 `Rollup` 配置文件全面 ESM，配置简介，对于爱干净的我来说比较喜爱



![rollup.js logo](https://s2.loli.net/2022/06/22/W4yvPm5CFA3hMcX.jpg)

### Rollup
> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

> [link - Rollup](https://rollupjs.org/guide/en/#configuration-files)



---



>  Flow 👇🏻

1. 打包构建
2. 加载 额外资源 （ resolve ）
3. 转译 ES module
4. Babel 
5. 输出 压缩、移除 console 等
6. 发布脚本



> 本文旨在 Rollup 的构建过程介绍，和业务无关



### install 化环境依赖

```shell
yarn add -D rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve
```



- rollup

- @rollup/plugin-commonjs   // 转译
- @rollup/plugin-node-resolve // 加载依赖



#### rollup.config.js

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel'; // 转换babel
import { terser } from 'rollup-plugin-terser' // 压缩代码
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { file: `${process.cwd()}/dist/cjs/index.js`, format: 'cjs' },
      { file: `${process.cwd()}/dist/esm/index.js`, format: 'esm' },
      { file: `${process.cwd()}/dist/index.js`, format: 'umd', name: pkg.name },
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      babel({
        babelHelpers: 'runtime', // 
        exclude: 'node_modules/**' // 排除 node_modules
      }),
      terser({
        output: {
          ascii_only: true // 仅输出ascii字符
        },
        compress: {
          pure_funcs: ['console.log'] // 去掉console.log函数
        }
      }),
    ]
  }
];
```



#### external & resolve

> 我们开发SDK的不可能全然自己 造轮子，也会使用其他一些依赖



external :  申明外部依赖 



例如：🌰 

```
{
	external: ['lodash']
	resolve()
}
```



#### output

> 输出 目录和文件名

输出了 三个文件 分别是： 

- cjs：Commonjs 规范
- esm: ESmodule 规范
- umd： 集 CommonJs、CMD、AMD 的规范于一身 



#### terser

> 压缩代码、移除console





### Other

> 一起其他依赖 EditorConfig \ ESLint \ 等 这里不表了



### Publish Script

>  SDK 发布到 NPM 、 PNPM  或者 私有 npm 等

> 直接上代码 简单版



1. 把 `package.json` and `README` copy 到 `dist` 下面
2. 修改版本 
3. 发布

> 我这里省略了 版本修改，因为 每次通过 process.argv 来指定版本 不如直接修改  package.json



```shell
const path = require('path');
const shelljs = require('shelljs');
const program = require('commander');
const { copyFile } = require('fs');
const colors = require('colors');


const copyFunc = () => {
  copyFile(`${process.cwd()}/package.json`, `${process.cwd()}/dist/package.json`, (err) => {
    if (err) {
      console.log(`copy package 失败 \n ${err}`)
    }
  })
  copyFile(`${process.cwd()}/README.md`, `${process.cwd()}/dist/README.md`, (err) => {
    if (err) {
      console.log(`copy README 失败 \n ${err}`)
    }
  })
}



const pubFunc = () => {
  copyFunc()
  shelljs.cd('dist');
  shelljs.exec('npm publish'); // 发布
}

pubFunc()
```



---





### 发布

- `yarn  adduser --registry http://xxx`

  or

- `yarn login login`

- `yarn publish`



---



### 完 
