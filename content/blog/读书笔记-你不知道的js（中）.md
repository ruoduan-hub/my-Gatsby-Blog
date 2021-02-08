---
title: 读书笔记 -《你不知道的js-中》
date: 2021-02-08
tags: 记
comments: true
categories: 记
---

### 类型

JavaScript 有七种**内置类型**:

- 空值(null)
- 未定义(undefined)
- 布尔值( boolean)
- 数字(number)
- 字符串(string)
- 对象(object)
- 符号(symbol，ES6 中新增)

`ypeof null === "object"; // true`





### 值



#### 数组

```js
arr = [1,2,3]
delete arr[1] // [1, empty, 3]
```



#### 类数组

- 有时需要将类数组(一组通过数字索引的值)转换为真正的数组，这一般通过数组工具函数(如 indexOf(..)、concat(..)、forEach(..) 等)来实现。

```js
function foo() {
  var arr = Array.prototype.slice.call(arguments);
  arr.push("bam");
  console.log(arr);
}

foo( "bar", "baz" ); // ["bar","baz","bam"]
```

- 用 ES6 中的内置工具函数 Array.from(..) 也能实现同样的功能:

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);
```





### 生成器（Generator）

```js
var x = 1
function * foo () {
  x++
  yield // 暂停!
  console.log('x:', x)
}
function bar () {
  x++
}
var it = foo()
// 这里启动foo()! it.next();
x // 2 bar();
x // 3 it.next(); // x: 3

```



#### 迭代消息传递

```js
function* foo(x) {
  var y = x * (yield);
  return y;
}
var it = foo(6);
// 启动foo(..) it.next();
var res = it.next(7);
res.value; // 42

```



```js
function *foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log( x, y, z );
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value;
var val2 = it2.next().value;
val1 = it1.next( val2 * 10 ).value;
val2 = it2.next( val1 * 5 ).value;
it1.next( val2 / 2 );
it2.next( val1 / 4 );
// 2 <-- yield 2
// 2 <-- yield 2
// 40   <-- x:20,  z:2
// 600  <-- x:200, z:3
// y:300
// 20 300 3
// y:10
// 200 10 3
```



> **我们简单梳理一下执行流程**
> 
> (1) *foo() 的两个实例同时启动，两个 next() 分别从 yield 2 语句得到值 2。
>(2)val2 * 10也就是2 * 10，发送到第一个生成器实例it1，因此x得到值20。z从1增
> 
>  加到 2，然后 20 * 2 通过 yield 发出，将 val1 设置为 40。
>(3) val1 * 5 也就是 40 * 5，发送到第二个生成器实例 it2，因此 x 得到值 200。z 再次从 2
> 
>  递增到 3，然后 200 * 3 通过 yield 发出，将 val2 设置为 600。
>(4) val2 / 2 也就是 600 / 2，发送到第一个生成器实例 it1，因此 y 得到值 300，然后打印
> 
>  出x y z的值分别是20 300 3。
>(5) val1 / 4 也就是 40 / 4，发送到第二个生成器实例 it2，因此 y 得到值 10，然后打印出
> 
>  x y z的值分别为200 10 3。



### 生产者与迭代器

- 假定你要产生一系列值，其中每个值都与前面一个有特定的关系。要实现这一点，需要一个有状态的生产者能够记住其生成的最后一个值。


```js
var gimmeSomething = (function () {
  var nextVal
  return function () {
    if (nextVal === undefined) {
      nextVal = 1
    } else {
      nextVal = (3 * nextVal) + 6
    }
    return nextVal
  }
})()

gimmeSomething(); // 1
gimmeSomething(); // 9
gimmeSomething(); // 33
gimmeSomething(); // 105
```



### 程序性能

#### Web Worker

> 设想一下，把你的程序分为两个部分:一部分运行在主 UI 线程下，另外一部分运行在另 一个完全独立的线程中。
>
> 一个就是，你会想要知道在独立的线程运行是否意味着它可以并行运行(在多 CPU/ 核 心的系统上)，这样第二个线程的长时间运行就不会阻塞程序主线程。否则，相比于 JavaScript 中已有的异步并发，“虚拟多线程”并不会带来多少好处。



- 从 JavaScript 主程序(或另一个 Worker)中，可以这样实例化一个 Worker:

```js
var w1 = new Worker( "http://some.url.1/mycoolworker.js" );
```

> 这个 URL 应该指向一个 JavaScript 文件的位置(而不是一个 HTML 页面!)，这个文件将 被加载到一个 Worker 中。然后浏览器启动一个独立的线程，让这个文件在这个线程中作 为独立的程序运行。

- 以下是如何侦听事件(其实就是固定的 "message" 事件):

```js
w1.addEventListener("message", function (evt) {
  // evt.data
});
// 也可以发送 "message" 事件给这个 Worker:
w1.postMessage("something cool to say");
// 在这个 Worker 内部，收发消息是完全对称的:

// "mycoolworker.js"
addEventListener("message", function (evt) {
  // evt.data
});
postMessage("a really cool reply");

```

> 注意，专用 Worker 和创建它的程序之间是一对一的关系。也就是说，"message" 事件 没有任何歧义需要消除，因为我们确定它只能来自这个一对一的关系:它要么来自这个 Worker，要么来自主页面。
>
> 通常由主页面应用程序创建 Worker，但若是需要的话，Worker 也可以实例化它自己的子 Worker，称为 subworker。有时候，把这样的细节委托给一个“主”Worker，由它来创建 其他 Worker 处理部分任务，这样很有用。不幸的是，到写作本书时为止，Chrome 还不支 持 subworker，不过 Firefox 支持。
>
> 要在创建 Worker 的程序中终止 Worker，可以调用 Worker 对象(就像前面代码中的 w1) 上的 terminate()。突然终止 Worker 线程不会给它任何机会完成它的工作或者清理任何资 源。这就类似于通过关闭浏览器标签页来关闭页面。



#### Worker 环境

在 Worker 内部是无法访问主程序的任何资源的。这意味着你不能访问它的任何全局变量，

也不能访问页面的 DOM 或者其他资源。记住，这是一个完全独立的线程。

但是，你可以执行网络操作(Ajax、WebSockets)以及设定定时器。还有，Worker 可 以访问几个重要的全局变量和功能的本地复本，包括 navigator、location、JSON 和 applicationCache。

你还可以通过 importScripts(..) 向 Worker 加载额外的 JavaScript 脚本:

```js
// 在Worker内部
importScripts( "foo.js", "bar.js" );
```

这些脚本加载是同步的。也就是说，importScripts(..) 调用会阻塞余下 Worker 的执行.



#### 共享 Worker

> 如果你的站点或 app 允许加载同一个页面的多个 tab(一个常见的功能)，那你可能非常希望通过防止重复专用 Worker 来降低系统的资源使用。在这一方面最常见的有限资源就是 socket 网络连接，因为浏览器限制了到同一个主机的同时连接数目。当然，限制来自于同 一客户端的连接数也减轻了你的资源压力。
>
> 在这种情况下，创建一个整个站点或 app 的所有页面实例都可以共享的中心 Worker 就非 常有用了。

- 这称为 SharedWorker，可通过下面的方式创建(只有 Firefox 和 Chrome 支持这一功能):

```js
var w1 = new SharedWorker( "http://some.url.1/mycoolworker.js" );

```

- 因为共享 Worker 可以与站点的多个程序实例或多个页面连接，所以这个 Worker 需要通过 某种方式来得知消息来自于哪个程序。这个唯一标识符称为端口(port)，可以类比网络 socket 的端口。因此，调用程序必须使用 Worker 的 port 对象用于通信:

```js
w1.port.addEventListener( "message", handleMessages );
// ..
w1.port.postMessage( "something cool" );
// 初始化端口
w1.port.start();
```



- 在共享 Worker 内部，必须要处理额外的一个事件:"connect"。这个事件为这个特定的连

  接提供了端口对象。保持多个连接独立的最简单办法就是使用 port 上的闭包(参见本系列 《你不知道的 JavaScript(上卷)》的“作用域和闭包”部分)，就像下面的代码一样，把这

  个链接上的事件侦听和传递定义在 "connect" 事件的处理函数内部:

```js
// 在共享Worker内部
addEventListener("connect", function (evt) {
  // 这个连接分配的端口
  var port = evt.ports[0];
  port.addEventListener("message", function (evt) {
    // ..
    port.postMessage("...1123");
    // ..
  });
  // 初始化端口连接
  port.start();
});

```



### SIMD

> 单指令多数据(SIMD)是一种数据并行(data parallelism)方式，与 Web Worker 的任务 并行(task parallelism)相对，因为这里的重点实际上不再是把程序逻辑分成并行的块，而 是并行处理数据的多个位。



### asm.js

> asm.js(http://asmjs.org)这个标签是指 JavaScript 语言中可以高度优化的一个子集。通过 小心避免某些难以优化的机制和模式(垃圾收集、类型强制转换，等等)，asm.js 风格的代 码可以被 JavaScript 引擎识别并进行特别激进的底层优化。





