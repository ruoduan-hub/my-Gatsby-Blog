---
title: "Gatsby-layout插件全局配置路由过渡动画"
date: 2020-06-15
tags: 记
comments: true
categories: 记
---



### 缘起

> 在Gatsby 中我们想加入路由过渡动画，不能像React那样，直接给路由封装高阶组件
>
> 我们可以 使用 Layout 布局组件来实现



他的原理就是在所有静态页面中套一个 你的 Layout 组件 

> 🚀 👇



- `npm install --save gatsby-plugin-layout`
- 创建`src/Layouts/index.html` 这是默认位置 你还可以修改位置 [详情参考Github](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout)

- `gatsby-config.js`中添加插件

```js
module.exports = {
  plugins: ["gatsby-plugin-layout"]
};
```

- 安装 `yarn add gatsby-plugin-transitions gatsby-plugin-layout react-spring`

- Layout 配置

```react
import React from "react";
import { TransitionProvider, TransitionViews } from "gatsby-plugin-transitions";


const Layout = ({ location, children }) => {
  return (
    <TransitionProvider
      location={location}
      mode="immediate"
      // 进入
      enter={{
        opacity: 1,
        transform: "translate3d(50vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)",
        config: {
            duration: 700
          }
      }}
      // 正常
      usual={{
        opacity: 1,
        transform: "translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)"
      }}
      // 切出
      leave={{
        opacity: 0,
        transform: "translate3d(0vh,0vh,0vh) scale3d(0.5, 0.5, 0.5) rotate(0deg)",
        config: {
            duration: 1000
          }
      }}
    >
      <TransitionViews>
        {children}
      </TransitionViews>
    </TransitionProvider>
  );
};

export default Layout;
```



### 完