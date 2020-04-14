---
title: "Antdv4 升级指北"
date: 2020-03-06
tags: 记
comments: true
categories: 《记》
---

> 最近 antd 更新到 v4 到大版本了, 顺手更新了一波 记于此

- 此次 antdv4 更新 细则就不谈，[可移步官网查看](https://ant.design/docs/react/migration-v4-cn)

几个注意点：

1. IE 最低支持版本为 IE 11
2. React 最低支持版本为 React 16.9，部分组件开始使用 hooks 进行重构
3. 升级项目 React 16.12.0 以上

### Start upgrading

- 更新依赖包
  > 上面也说了，此次更新版本较新 我索性就更新最新版了

`yarn upgrade –latest [pkg-name]` && `yarn upgrade –latest`

- 更新指定依赖或者更新全部
  ...

使用`yarn`更新完后 只有 `yarn.lock` 变了, 同步更新下 package.json：
`yarn upgrade-interactive --latest`

> 空格键选择，a 键切换所有，i 键反选选择

### 开始升级

```shell
# 通过 npx 直接运行
npx -p @ant-design/codemod-v4 antd4-codemod src
# 或者全局安装
# 使用 npm
npm i -g @ant-design/codemod-v4
# 或者使用 yarn
yarn global add @ant-design/codemod-v4
# 运行
antd4-codemod src
```

OK 👌

`codemod-v4` 这个工具会在 终端 显示 格式化到代码片段和 文件 and `格式化`失败提示
