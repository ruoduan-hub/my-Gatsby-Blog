---
title: React-mode[进阶] React模式梳理
date: 2020-04-07
tags: React
categories: React
---

## 缘起

> 在这个 find a job 地狱难度的时间，整理一份 React 核心指南，共勉之
>
> p s：本文章属进阶知识点 如还不了解[React 基本知识可参考 官方文档](https://reactjs.org/docs/getting-started.html)

## 目录结构

[toc]

### 壹、Context

> `Context` 提供了一个无需为每层组件手动添加`props`，就能在组件树间进行数据传递的方法。

#### for example

```powershell
组件A —— time 数据 需要向下传递，我们可以通过 props 来传递，但是那样过于耦合
    组件B
        组件C
            组件D
                ...

```

典型解决方案就是`Context`

- 创建 context ：

`const ThemeContext = React.createContext('C_data');`
hook 写法

`const value = useContext(MyContext);`

- API
  - React.createContext
    - `const MyContext = React.createContext(defaultValue);`
  - Context.Provider
    - `<MyContext.Provider value={/* 某个值 */}>`

```js
// 创建context
const DataContext = React.createContext('123');
class App extends React.Component {
  render() {
    return (
    // 使用 Provider 将当前值传递下去
      <DataContext.Provider value="abc">
        <A />
      </DataContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function A() {
  return (
    <div>
      <B />
    </div>
  );
}

class B extends React.Component {
  // 当前值为 abc
  // React 会往上找到最近的 theme Provider，然后使用它的值
  static contextType = DataContext;
  render() {
    return <p/>this.context</p>;
  }

```

---

### 贰、Refs & DOM

> Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素

- 创建 Refs

```js
React.createRef()
// hook 写法
const refContainer = useRef(initialValue)
```

#### for example

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}

// 访问 ref
const node = this.myRef.current
```

### 叁、Refs 转发 forwardRef

> 如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。

有了上面 Refs 操作 Dom 的认识，下面跑抛出一个问题，现在我要在父组件 `<F_component />` 中 获取子组件的`ref`

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  // 我可以在这里访问 被转发的 `button` 的`ref`
  render() {
    return <F_component ref={this.ref} />
  }
}

const F_component = React.forwardRef((props, ref) => (
  <button ref={ref} className="F_component">
    {props.children}
  </button>
))

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef()
;<F_component ref={ref}>Click me!</F_component>
```

1.我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。

2.我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。

3.React 传递 ref 给 forwardRef 内函数 (props, ref) =>...，作为其第二个参数。

4.我们向下转发该 ref 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。

5.当 ref 挂载完成，ref.current 将指向 `<button>` DOM 节点。

---

### 肆、 Fragments

> Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

Fragments = jsx: <> ... </>

or

```js
<React.Fragment>
  <ChildA />
  <ChildB />
  <ChildC />
</React.Fragment>
```

- 短语法 `<></> 不支持 key`

---

### 伍、高阶组件（HOC）

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

`上面👆是官方短解释 以下我通俗一点解释吧：`

想必大家都知道 JavaScript 的高阶函数吧。其实高阶组件就相当于一个高阶函数。即：高阶函数，就是函数中可以传入另一个函数作为参数的函数。

- 在 React 中 => JSX 函数即组件 = 高阶组件是将组件转换为另一个组并返回

#### for example

假设有一个组件 MyComponent，需要从 LocalStorage 中获取数据，然后渲染数据到界面。我们可以这样写组件代码：

```js
import React, { Component } from "react"

class MyComponent extends Component {
  componentWillMount() {
    let data = localStorage.getItem("data")
    this.setState({ data })
  }

  render() {
    return <div>{this.state.data}</div>
  }
}
```

- 现在我们要封装一个高阶组件`withPersistentData`来达到上述代码逻辑的复用

```js
import React, { Component } from "react"

function withPersistentData(WrappedComponent, key) {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(key)
      this.setState({ data })
    }

    render() {
      // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

class MyComponent2 extends Component {
  render() {
    return <div>{this.props.data}</div>
  }

  //省略其他逻辑...
}

class MyComponent3 extends Component {
  render() {
    return <div>{this.props.data}</div>
  }

  //省略其他逻辑...
}

const MyComponent2WithPersistentData = withPersistentData(MyComponent2, "data")
const MyComponent3WithPersistentData = withPersistentData(MyComponent3, "name")
```

> 请注意，HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

- HOC 高阶组件 => 高阶函数
  > 在我们的使用过程中，我们可以在这个过程中对传入的组件进行更多的 React 模式的处理，例如我们想在 `componentWillMount` 中来获取数据.

> 也是 高阶组件最常见的函数签名形式 `HOC([param])([WrappedComponent])`

```js
import React, { Component } from "react"

const withPersistentData = key => WrappedComponent => {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(key)
      this.setState({ data })
    }

    render() {
      // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

class MyComponent2 extends Component {
  render() {
    return <div>{this.props.data}</div>
  }

  //省略其他逻辑...
}

class MyComponent3 extends Component {
  render() {
    return <div>{this.props.data}</div>
  }

  //省略其他逻辑...
}

const MyComponent2WithPersistentData = withPersistentData("data")(MyComponent2)
const MyComponent3WithPersistentData = withPersistentData("name")(MyComponent3)
```

- 这种形式的高阶组件因其特有的便利性——结构清晰（普通参数和被包裹组件分离）、易于组合，大量出现在第三方库中 `react-redux`中的`connect`就是一个典型

- #### 注意事项

- 不要在 render 方法中使用 HOC

  > `React` 的 `diff 算法`（称为协调）使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 render 返回的组件与前一个渲染中的组件相同（===），则 `React` 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。

- 错误示例

```js
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}
```

- 务必复制静态方法
  > 如果需要使用被包装组件的静态方法，那么必须手动拷贝这些静态方法。因为高阶组件返回的新组件，是不包含被包装组件的静态方法。

ps: 我们可以使用 [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) 这个库来解决这个问题

当然你也可以手动拷贝

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    /*...*/
  }
  // 必须准确知道应该拷贝哪些方法 :(
  Enhance.staticMethod = WrappedComponent.staticMethod
  return Enhance
}
```

- #### 除了导出组件，另一个可行的方案是再额外导出这个静态方法。

```js
// 使用这种方式代替...
MyComponent.someFunction = someFunction
export default MyComponent

// ...单独导出该方法...
export { someFunction }

// ...并在要使用的组件中，import 它们
import MyComponent, { someFunction } from "./MyComponent.js"
```

---

### 陆、Portals (插槽)

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

```js
ReactDOM.createPortal(child, container)
```

第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。

ps: 一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框

[参考这个示例: codepen ](https://codepen.io/gaearon/pen/yzMaBd?editors=1010)

HTML 和 CSS 属性我就不展示了 参照 如上 ⬆️ 链接 🔗，把 JS 拿出来讲一下

```js
// 根节点
const appRoot = document.getElementById('app-root');
// 被插入Dom 节点元素
const modalRoot = document.getElementById('modal-root');

// 创建模态框组件
class Modal extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个Dom元素容器
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // 将被插入节点放到dom容器中作为它的子元素
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // 组件卸载的时候删除这个容器
    modalRoot.removeChild(this.el);
  }

  render() {
    // 使用 Portal 来把需要展示的元素放到其他节点
    return ReactDOM.createPortal(
      // 可以是任何有效的React子代：JSX，字符串，数组等。
      this.props.children,
      // 一个DOM 元素
      this.el,
    );
  }
}

.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    // 处理 逻辑
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, appRoot);


```

### 柒、Profiler & Profiler API 性能监控

> Profiler 分为 2 个方面 一个是 浏览器插件 Profiler 一个是 React 提供给我们的 Profiler API

他们都是用来做 性能分析的

- [Profiler API 具体参考官方文档就好了](https://reactjs.org/docs/profiler.html)

简单介绍下：

> Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。 它需要两个 prop ：一个是 id(string)，一个是当组件树中的组件“提交”更新的时候被 React 调用的回调函数 onRender(function)。

##### for example

> 例如，为了分析 Navigation 组件和它的子代：

```js
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
)
```

- onRender 回调

```js
function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
}
```

#### Profiler 插件

[Profiler 插件 参考这篇文章](https://zhuanlan.zhihu.com/p/45204569)

---

### 捌、Diffing 算法

> 该算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量。

[算法细则 请参考](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)

> 如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。于是 React 在以下两个假设的基础之上提出了一套 O(n) 的启发式算法：

1.两个不同类型的元素会产生出不同的树；

2.开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定；

这也就是我们在 React 中遍历`key`对于性能的重要性了，了解过 tree 算法我们都知道在树的子节点中 我们只要能确定 `child tree` 的 `key`（相当于权值 我就可以进行大幅优化）

- 元素对比

  ```
  分为：
  ```

1. 比对不同类型的元素

   2. 比对同一类型的元素

   ````

   -  在根节点以下的组件也会被卸载，它们的状态会被销毁。比如，当比对以下更变时：
   ​```js
    <div>
      <Counter />
    </div>

    <span>
      <Counter />
    </span>
   ````

   React 会销毁 Counter 组件并且重新装载一个新的组件。


    - 当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。比如：

    ```js
    <div className="before" title="stuff" />

    <div className="after" title="stuff" />
    ```
    通过比对这两个元素，React 知道只需要修改 DOM 元素上的 className 属性。

- React 继续对子节点进行递归。

##### Keys [敲黑板 面试问烂了的题目 下面我来解析下原理]

> 在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

```js
<ul>
  <li>first</li>
  <li>second</li>
</ul>
########################################## 添加 => `<li>third</li>`
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

这样子是 在列表头部添加元素 这样子开销较小

但是如果是在头部增加的话

```js
<ul>
  <li>first</li>
  <li>second</li>
</ul>
########################################## 添加 => `<li>third</li>`
<ul>
  <li>top third</li>
  <li>first</li>
  <li>second</li>

</ul>
```

如果简单实现的话，那么在列表头部插入会很影响性能，那么更变开销会比较大.

为了解决以上问题，React 支持 key 属性。当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。以下例子在新增 key 之后使得之前的低效转换变得高效：

```js
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

现在 React 知道只有带着 '2014' key 的元素是新元素，带着 '2015' 以及 '2016' key 的元素仅仅移动了。

---

### 玖、Render Props

> 术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

ps: 我在这个地方吃过亏，一下子没反应过来. 比较简单：其实 `Render Props` 就是 `Render` 这个 API `Render Props`是一种模式

划重点：任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.

#### for example

> 具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。

```js
<DataProvider render={data => <h1>Hello {data.target}</h1>} />
```

使用 `render prop` 的库有 `React Router`、`Downshift` 以及 `Formik`。

我们来看这样一个示例：👇

```js
// 创建一个需要被传入的props
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse
    return (
      <img
        src="/cat.jpg"
        style={{ position: "absolute", left: mouse.x, top: mouse.y }}
      />
    )
  }
}
//封装接受 Render props 的方法
class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        // Mouse组件的静态展示 // 使用`render` 动态确定要渲染的内容
        {this.props.render(this.state)}
      </div>
    )
  }
}

// 在组件中灵活的 复用Mouse的数据
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => <Cat mouse={mouse} />} />
      </div>
    )
  }
}
```

---

### 拾、 深入理解 JSX（口水文记一下 冷不丁 被问到）

ps：这个篇幅比较容易理解只是例举不做详解

- JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

> 会编译为：

```js
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me")
```

如果没有子节点，你还可以使用自闭合的标签形式，如：

```js
;<div className="sidebar" />
// 会编译为:
React.createElement("div", { className: "sidebar" })
```

- React 必须在作用域内

```js
// 例如，在如下代码中，虽然 React 和 CustomButton 并没有被直接使用，但还是需要导入：
import React from "react"
import CustomButton from "./CustomButton"
function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />
}
```

- 在 JSX 类型中使用点语法

```js
import React from "react"
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>
  },
}
function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />
}
```

- 用户定义的组件必须以大写字母开头
  > 不必多说六吧 基本常识

* JavaScript 表达式作为 Props

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```

- if 语句以及 for 循环不是 JavaScript 表达式，所以不能在 JSX 中直接使用
  > 所以我们要在 jsx 外来判断条件 和遍历数据

```js
function NumberDescriber(props) {
  let description
  if (props.number % 2 == 0) {
    description = <strong>even</strong>
  } else {
    description = <i>odd</i>
  }
  return (
    <div>
      {props.number} is an {description} number
    </div>
  )
}
```

- 字符串字面量

```js
//  你可以将字符串字面量赋值给 prop. 如下两个 JSX 表达式是等价的：
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
```

- Props 默认值为 “True”

```js
// 如果你没给 prop 赋值，它的默认值是 true。以下两个 JSX 表达式是等价的：
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

- 属性展开

```js
// 如果你已经有了一个 props 对象，你可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象。以下两个组件是等价的：
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />
}
function App2() {
  const props = { firstName: "Ben", lastName: "Hector" }
  return <Greeting {...props} />
}
// 你还可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 props 传递下去。
const Button = props => {
  const { kind, ...other } = props
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton"
  return <button className={className} {...other} />
}
const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  )
}
```

- 布尔类型、Null 以及 Undefined 将会忽略
