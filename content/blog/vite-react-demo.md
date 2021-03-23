---
title: 记-vite2-react-初探
date: 2021-03-23
tags: 记
comments: true
categories: 记
---

## This Vite
> Vite 以 原生 ESM 方式服务源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入的代码，即只在当前屏幕上实际使用时才会被处理。

[原文链接](https://www.ruoduan.cn/vite-react-demo/)

[参考文档](https://cn.vitejs.dev/)

## 老规矩脚手架

```js
yarn create @vitejs/app
```

- 根据提示操作 我这边选择的是 `react-ts` 模板


```
支持的模板预设包括：

vanilla
vue
vue-ts
react
react-ts
preact
preact-ts
lit-element
lit-element-ts
svelte
svelte-ts

查看 @vitejs/create-app 获取每个模板的更多细节
```

- 完成这一步后会生成一个项目 `yarn` 装一下包

- yarn dev 

- 这时候可以看到我们的 demo 已经跑起来了


## 配置文件
> vite.config.ts

- 首先我们要配置下 `less` 安装一下 `antd`

```shell
yarn add antd

```

- 在app.tsx 中放一个 按钮看看效果

```
import { DatePicker } from ‘antd’;

```


### 自动导入组件库样式插件

- 安装 less

```
yarn add -D less
```


- 这时候是没有样式的，我们得和`webpack` 一样，引入一下~

- vite 更简洁一点只需要一个插件就搞定了

`yarn add -D @vitejs/plugin-react-refresh`

` import reactRefresh from '@vitejs/plugin-react-refresh' `

- vite.config.ts


```js

plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },

```

### alias 别名设置

```js
import path from 'path
```

```js
resolve: {
    alias: [
      {
        find: /^~/,
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
```

### ts alias 设置

> 配置 baseUrl & paths

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "~/*": ["src/*"]
    },
    
   ...
   
  },
  "include": ["./src"]
}


```

- 这时候页面上的按钮就有样式了

<img src="https://tva1.sinaimg.cn/large/008eGmZEly1gou13klu6mj30rq0on0ur.jpg" alt="demo-app" style="zoom:50%;" />


## 安装 react-router
> 接下来我们安装一下 `react-router` 和配置下 Layout，跑一个小小的 `demo`


```shell
yarn add react-router-dom
```

### touch index.tsx

```js
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Layout from "./Layout/Layout";

import App from "~/views/App";
import Home from "~/views/Home";

interface Props {}

const Index: React.FC<Props> = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/app">
            <App />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default Index;

```

### touch Layout.tsx

```js
import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  console.log();
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="App">
          <Link to="/app">App</Link>
        </Menu.Item>
        <Menu.Item key="Home">
          <Link to="/home">Home</Link>
        </Menu.Item>
      </Menu>

      <div style={{ margin: "20px 0" }}>{children}</div>
    </div>
  );
};

export default Layout;

```

- 到这里 demo 就完成了

<img src="https://tva1.sinaimg.cn/large/008eGmZEly1gou1fq0lkhj30rm0pndhx.jpg" alt="demo" style="zoom:50%;" />


> [demo-源码](https://github.com/Chad97/vite-react-demo)


