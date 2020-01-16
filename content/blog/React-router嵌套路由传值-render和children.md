---
title: React-router嵌套路由传值(render和children)
date: 2019-04-16
tags: 《React》
categories: 《React》
---



## 小栗子：
例如：
我们的路由格式如下:

```js
let router = [
    {
        path: '/',
        component: Rhome,
        exact: true,
    },
    {
        path: '/user',
        component: User,
        routes: [ //嵌套路由
            {   
                type: Route,
                path: '/user/',
                component: Main
            },
            {
                type: Route,
                path: '/user/info/',
                component: UserInfo
            }
        ]
    },
    {
        path: '/shop',
        component: Shop,
    },{
        path: '/news',
        component: NewsInfo,
    },
]
```
- 我们想在 渲染 通过组件传值的方式父组件吧子组件的路由传过去从而实现渲染，传统的父子组件传值是用不了的
  - #### 错误示范：
    ```html
    <Route childRoutes={val.routes}   />
    ```

  - #### 正确示范：
  - **传值：**
  ```js
   return (
                    <Route exact key={key} path={route.path}
                    render = {props => (
                      <route.component { ...props } routes = {route.routes} />
                    )}
                  />
                    )
  ```
  **接收：**
  ```html
  	this.props.childrenRoute.map(
                                  (route, key) =>
                                  <Route key={key} exact path={route.path} component={route.component} />
                              )
  ```

### 阐述：
- 编程式导航，可以在一个组件中用this.props.history.push("/path",{name:"hellow"})，来进行传参，传过去的值在props.location.state中
- Route里面还有两个属性，render和children
```js
-render是一个函数，语法：render={()=>{return <div></div>}}，只要你的路由匹配了，这个函数才会执行
-children也是一个函数，不管匹配不匹配，这个函数都会执行
-他们两个有个优先级关系，render的优先级总是高于children，是会覆盖children的

 <Fragment>
    <h1>header</h1>
    <Link to="/wiki/wikiList/">gogogo</Link>
    <Route
        path="/wiki/wikiList"
        render={
            ()=>{
                return <div>wikilist-children</div>
            }
        } //这个是只有当你路由匹配到了/wiki/wikiList才会执行
        // children={() => {
        //     return <div>wikilist-children</div>
        //   }
        // }    //这个是只要你的路由跳到wiki了，那children就会执行
    >    
    </Route>
</Fragment>
```


<br /><br /><br />

## 完