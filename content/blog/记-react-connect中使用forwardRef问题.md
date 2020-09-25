---
title: "记-react-connect中使用forwardRef问题"
date: 2020-09-25
tags: React
comments: true
categories: React
---


# 记-react-connect中使用forwardRef问题。

> 最近在`dvajs`中使用`onRef`的过程中，需要给 绑定`connect` 的组件 透传 `forwardRef`

类似这样的形式：
```js
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { connect } from 'dva'

const C2 = forwardRef((props, ref) => {

  const h2 = () => {
    alert('c2方法')
    setText('onRef 改变了')
  }

  const [text, setText] = useState('C2')

  useImperativeHandle(ref, () => ({
    h2: h2,
  }))

  return <div >
      {text}
    </div>

})

export default connect((state) => {
  return {
    list: state.list,
  }
})(C2)

```
> 给传进来的`onRef`绑定上自己的方法h2

- 直接这样写的话 是不行🙅的因为`ref`被`Hoc` 高阶组件{connect} "隔离了" 

- Error
`Unhandled Rejection (Invariant Violation): You must pass a component to the function returned by connect. Instead received {}`

---

> 通过查看 `redux-connect`文档  `connect` 是有4个参数的

```js
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

最后一个参数传入：`forwardRef`
```js
export default connect((state) => {
  return {
    list: state.list,
  }
}, null, null, { forwardRef: true })(C2)

// 老版本 4以下

export default connect((state) => {
  return {
    list: state.list,
  }
}, null, null, { withRef: true })(C2)

```

- 这里有的坑，以上是针对我使用`Umi3`，如果你使用的是`Umi2`，以上配置就会无效，尽管 `node_modules`中`react | react-redux` 版本差不多

- `Umi`要这样写：

```
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { connect } from 'dva'

const C2 = (props) => {
  const { refInstance } = props


  const h2 = () => {
    alert('c2方法')
    setText('onRef 改变了')
  }

  const [text, setText] = useState('C2')

  useImperativeHandle(refInstance, () => ({
    h2: h2,
  }))

  return <div >
      {text}
    </div>

}


const Tc =  connect((state) => {
  return {
    list: state.list,
  }
})(C2)

// 使用Hoc 透传 ref 为 refInstance 主要不要使用 red 换个name
export default forwardRef((props, ref) => <Tc {...props} refInstance={ref} />);

```

## connect 参数

- `[mapStateToProps(state, [ownProps]): stateProps] (Function)`
> 这个方法允许我们将store中的数据作为props绑定到组件中，只要store发生了bianh就会调用mapStateToProps方法，mapStateToProps返回的结果必须是一个纯对象，这个对象会与组件的 props 合并

- [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)
> 允许我们将 action 作为 props 绑定到组件中，
如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；每个方法将返回一个新的函数，函数中 dispatch 方法会将 action creator 的返回值作为参数执行。这些属性会被合并到组件的 props 中。
实际上 mapDispatchToProps 就是用于建立组件跟store.dispatch的映射关系,可以是一个object，也可以传入函数
如果 mapDispatchToProps 是一个函数，它可以传入dispatch,ownProps, 定义UI组件如何发出 action，实际上就是要调用 dispatch 这个方法

- [mergeProps(stateProps, dispatchProps, ownProps): props] (Function)
> 如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中。你也许可以用这个回调函数，根据组件的 props 来筛选部分的 state 数据，或者把 props 中的某个特定变量与 action creator 绑定在一起。如果你省略这个参数，默认情况下返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。

- [options] (Object)
> 如果指定这个参数，可以定制 connector 的行为。

---

> 我们一开是那个抛错就是`mergeProps`默认的返回，所以导致这个错误


### 相关链接
[react](https://react.docschina.org/docs/forwarding-refs.html)

[react-redux](https://react-redux.js.org/api/connect)
