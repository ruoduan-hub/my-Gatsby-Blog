---
title: React-Redux
date: 2019-04-25
tags: 《React》
categories: 《React》
---



# Redux and React-redux 莞式教程（新手必看）
>为了方便使用者使用，这里就redux和react-redux 一并讲究使用了，会了react-redux，redux也就没问题了，只不过稍微封装了一下

## 教程方式
1. 我们先讲理论，先明白  render、action、 store 、connect 、 dispatch 、{ mapStateToProps  mapDispatchToProps },是什么东西。

2. 看完你可能有点懵，没关系我有个简单直接的`涨工资`的dom，跟着做一遍你就懂了

**先 download 莞式教程 https://github.com/Chad97/My-notes/tree/master/react-redux%E4%B9%8B%E6%B6%A8%E5%B7%A5%E8%B5%84**
—— 		看了它你就一目了然了
## 一、
- 介绍 （有一定了解的自己跳 **二** 开始我的莞式教程）
- ---

> 对于大型的复杂应用来说，这两方面恰恰是最关键的。因此，只用 React 没法写大型应用。
> 为了解决这个问题，2014年 Facebook 提出了 Flux 架构的概念，引发了很多的实现。2015年，Redux 出现，将 Flux 与函数式编程结合一起，很短时间内就成为了最热门的前端架构。

首先明确一点，Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了。
曾经有人说过这样一句话。
`"如果你不知道是否需要 Redux，那就是不需要它。"`    	—— Redux 的创造者 Dan Abramov 

>简单说，如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。
>用户的使用方式非常简单
>用户之间没有协作
>不需要与服务器大量交互，也没有使用 WebSocket
>视图层（View）只从单一来源获取数据

#### Store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
Redux 提供createStore这个函数，用来生成 Store。
```js
import { createStore } from 'redux';
const store = createStore(fn);
```

#### Action
State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。

```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

#### Action Creator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

```js
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```
const action = addTodo('Learn Redux');
上面代码中，addTodo函数就是一个 Action Creator。

####  store.dispatch()
store.dispatch()是 View 发出 Action 的唯一方法。
```js
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```
上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。
结合 Action Creator，这段代码可以改写如下。

`store.dispatch(addTodo('Learn Redux'));`

#### Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```js
const reducer = function (state, action) {
  // ...
  return new_state;
};
```
整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子。

```js
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```
上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。

实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
```js
import { createStore } from 'redux';
const store = createStore(reducer);
```
上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。

为什么这个函数叫做 Reducer 呢？因为它可以作为数组的reduce方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。

```js
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];
```
const total = actions.reduce(reducer, 0); // 3
上面代码中，数组actions表示依次有三个 Action，分别是加0、加1和加2。数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3。

#### store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```js
import { createStore } from 'redux';
const store = createStore(reducer);
store.subscribe(listener);
```
显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

```js
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```


#### Store 的实现
上一节介绍了 Redux 涉及的基本概念，可以发现 Store 提供了三个方法。
```js
store.getState()
store.dispatch()
store.subscribe()
```
i`mport { createStore } from 'redux';`
`let { subscribe, dispatch, getState } = createStore(reducer);`
createStore方法还可以接受第二个参数，表示 State 的最初状态。这通常是服务器给出的。


let store = createStore(todoApp, window.STATE_FROM_SERVER)
上面代码中，window.STATE_FROM_SERVER就是整个应用的状态初始值。注意，如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值。

下面是createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。

```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

![redux flow](./react-redux/redux.png)

- 放一个简单的计数器案例
```js
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
```

## 二、
**先 download 莞式教程 https://github.com/Chad97/My-notes/tree/master/react-redux%E4%B9%8B%E6%B6%A8%E5%B7%A5%E8%B5%84**
—— 		看了它你就一目了然了
> 这一章 我们简单的讲一下 react-redux ，就开始我的莞试教程

我们的react-redux 为方便我们使用，内置了几个组件，非常简单，非常好用 —— ` connect() `   `mapStateToProps`   `mapDispatchToProps`   `<Provider></Provider>`

- 好下面让我们来单刀直入~
### reacr-redux 之涨工资

`npx redux-dom` 新建一个react项目  低版本 nodejs  用`create-app`也可以

- 在`src`文件夹下面创建一个 store ，store里面创建一个`reducer.js`
  如下：
```js
import React from 'react';
import { connect } from 'react-redux';


const tiger = 30000//创建工资state

//这是action
const increase = {
    type: '涨工资'
}
const decrease = {
    type: '扣工资'
}

const  taxes = {
    type: '缴税'
}

//这是reducer
 const reducer = (state = tiger, action) => {
    switch (action.type) {
        case '涨工资':
            return state += 100;
        case '扣工资':
            return state -= 100;
        case '缴税' :
        return state - ((state - 5000) *  0.01)
        default:
            return state;
    }
}

export default reducer
```

然后进入我们的 index.js
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'





//创建store
const store = createStore(reducer);



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```
- 讲一下 Provider  这个组件，他是react-redux 中提供的一个组件
> connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。
> 一种解决方法是将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将state传下去就很麻烦。
> React-Redux 提供Provider组件，可以让容器组件拿到state

**记住 他就是 通过 class 的connect 实现的，能让Provider  的组件的子孙组件都拿到挂载的store，莞式教程简单粗暴，要看实现原理 去看es6去**


好了现在让我去app.js里面，去实现涨工资吧 哈哈~~~

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './components/Home'

class App extends Component {

  componentDidMount () {
    // console.log(this.props)
  }

  render() {
    const { PayIncrease, PayDecrease } = this.props
    return (

      <div className="App">
        <h2>当月工资为{this.props.tiger}</h2>
        <button onClick={PayIncrease}>升职加薪</button>
        <button onClick={PayDecrease}>迟到罚款</button>

        <Home />
      </div>

      

    );
  }
}

//需要渲染什么数据
function mapStateToProps(state) {
  return {
      tiger: state
  }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {
      PayIncrease: () => dispatch({ type: '涨工资' }),
      PayDecrease: () => dispatch({ type: '扣工资' })
  }
}

export default App = connect(mapStateToProps, mapDispatchToProps)(App)

```
- #### connect  
> React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。

记住，要想让组件拿到store 就得用 connect  （） 这个方法 来链接，你可以理解架桥，别想太多，简单粗暴 用多了你就知道原理了。

### 打印工资
好现在让我在 ` src/components` 羡慕新建一个 `Home.jsx 组件` ,涨完工资是不是要打印工资

```js
import React from 'react';
import { connect } from 'react-redux'
import Counter from './Counter '

class Home extends React.Component {
    constructor (props, context){
        super() 
        this.state = {
            
        }
    }
    

    mycl = () => {
        alert(this.props.tiger)
    } 

    render() {
    
        return (
            <div>
                <hr /> <br />
                <h1>home 组件</h1>
                <button onClick= {this.mycl}>打印目前工资</button>
                <hr /> <br />
                <Counter />
                
            </div>
        );
    }

    componentDidMount () {
        console.log(this.props)
    }

}


//需要渲染什么数据
function mapStateToProps(state) {
    return {
        tiger: state
    }
  }
  //需要触发什么行为
  function mapDispatchToProps(dispatch) {
    return {
        PayIncrease: () => dispatch({ type: '涨工资' }),
        PayDecrease: () => dispatch({ type: '扣工资' })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
```

### 缴税

涨完工资，工资那么高是不是要缴税拉~~

```js
import React from 'react';
import { connect } from 'react-redux';

class Counter  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    render() {
        const { Paytaxes } = this.props
        return (
            <div>
                <h2>税后计算</h2>
                <button onClick={ Paytaxes } >缴税</button>
                <p>{this.props.tiger}</p>
            </div>
        );
    }
}

//需要渲染什么数据
function mapStateToProps(state) {
    return {
        tiger: state
    }
  }
  //需要触发什么行为
  function mapDispatchToProps(dispatch) {
    return {
        PayIncrease: () => dispatch({ type: '涨工资' }),
        PayDecrease: () => dispatch({ type: '扣工资' }),
        Paytaxes: () => dispatch({ type: '缴税' }),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```


## 完

莞式教程，做完就走~~ 手动 /斜眼