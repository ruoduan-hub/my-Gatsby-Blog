---
title: "你必须知道的,async/await 实现异步流程控制"
date: 2019-06-17
tags: ECMA-JavaScript
comments: true
categories: 《ECMA JavaScript》
---

#### async/await

> async 其实是 ES7 的才有的关键字，放在这里说，其实是和我们前面所说的 Promise，Generator 有很大关联的。async 的意思是"异步"，顾名思义是有关异步操作有关的关键字。
> 而且 async/await 是 Generator yield 的语法糖
> 具体参考 阮老师的 es6 入门

- 我们这里就展示一下 async/await 的实际作用

#### async

```js
const helloFn = async () => {
  return "helloAsync"
}
console.log(helloFn) //Promise {<resolved>: "helloAsync"}
```

可以看到 经过 async 包装后的函数 返回一个 promise 对象
既然是返回的 Promise 对象，我们就是用 then 方法来处理。

```js
const helloFn = async () => {
  return "helloAsync"
}
helloFn().then(s => {
  console.log(s) //helloAsync
})
```

> 是不是很简单，就是一个 promise 而已是如何实现 异步控制的呢？

#### await

> 在 Generator 中 yield 关键字，yield 关键字只能使用在 Generator 函数中，同样，await 关键字也不能单独使用，是需要使用在 async 方法中。 await 字面意思是"等待"，那它是在等什么呢？它是在等待后面表达式的执行结果。

- 请看下面这段示例代码，我们用定时器来模拟异步的情况

```js
function testAwait() {
  return new Promise(resolve => {
    setTimeout(function() {
      console.log("testAwait")
      resolve()
    }, 1000)
  })
}
async function helloAsync() {
  await testAwait()
  console.log("helloAsync")
}
helloAsync()
//testAwait
//helloAsync
```

- 我们来分析下这段代码

  1、testAwait()方法中 new 一个 Promise 对象返回，promise 对象中用 setTimeout 模拟一个异步过程，即 1s 后打印"testAwait"。

  2、helloAsync()方法中，await testAwait(),表示将阻塞这里，等待 testAwait 这个异步方法执行并返回结果后，才继续下面的代码。

  执行下，1s 后打印了下面的日志。
  `testAwait`
  `helloAsync`
  到此，是不是理解了 await 的作用，就是阻塞主函数的执行，直到后面的 Promise 函数返回结果。

**await 后面只能 是 Promise 对象么？答案是否定的，可以是字符串，布尔值，数值以及普通函数**。

```js
function testAwait() {
  setTimeout(function() {
    console.log("testAwait")
  }, 1000)
}
async function helloAsync() {
  await testAwait()
  console.log("helloAsync")
}
helloAsync()
```

- 得到的 结果是
  `helloAsync`
  `testAwait`

- 方法没有报错，说明 await 后面是支持非 Promise 函数的，但是执行的结果是不一样的，所以 await 针对所跟的表达式不同，有两种处理方式：

  1、对于 Promise 对象，await 会阻塞主函数的执行，等待 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果，然后继续执行主函数接下来的代码。

  2、对于非 Promise 对象，await 等待函数或者直接量的返回，而不是等待其执行结果。

#### 小栗子

```js
const aa = (resolve, reject) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1)
      resolve("ok")
    }, 2000)
  })

const bb = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2)
      resolve("ok")
    }, 1000)
  })

const cc = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3)
      resolve("ok")
    }, 500)
  })

const mm = async () => {
  await aa().then(s => {
    console.log(s)
  })
  await bb().then(s => {
    console.log(s)
  })
  await cc().then(s => {
    console.log(s)
  })
}

mm()
```

这个栗子我们可以看出 定时器的时间依次是 3 2 1，但是我们想要对他们做异步控制，执行 1 2 3

1、首先每个制作异步过程封装成 Promise 对象。

2、利用 await 阻塞原理，实现每个制作的顺序执行。
