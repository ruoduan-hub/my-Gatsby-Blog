---
title: 读书笔记 -《你不知道的js-下》
date: 2021-02-08
tags: 记
comments: true
categories: 记
---



### 深入编程

#### 回忆闭包

```js
function makeAdder(x) {
  // 参数x是一个内层变量
  // 内层函数add()使用x，所以它外围有一个“闭包”
  function add(y) {
    return y + x;
  }
  return add;
}

// plusOne获得指向内层add(..)的一个引用
// 带有闭包的函数在外层makeAdder(..)的x参数上
var plusOne = makeAdder(1);
// plusTen获得指向内层add(..)的一个引用
// 带有闭包的函数在外层makeAdder(..)的x参数上
var plusTen = makeAdder(10);
plusOne(3);
plusOne(41);
plusTen(13);
// 4 <-- 1 + 3
// 42 <-- 1 + 41
// 23 <-- 10 + 13

```



#### This

> this 并不指向这个函数本身，意识到这一点非常重要，因为这是最常见的误解

```JS
function foo() {
  console.log(this.bar);
}
var bar = "global";
var obj1 = {
  bar: "obj1",
  foo: foo,
};
var obj2 = {
  bar: "obj2",
};
// --------
foo(); // “全局的”
obj1.foo(); // "obj1"
foo.call(obj2); // "obj2"
new foo(); // undefined

```



- 关于如何设置 this 有 4 条规则，上述代码中的最后 4 行展示了这 4 条规则

1.  在非严格模式下，foo() 最后会将 this 设置为全局对象。在严格模式下，这是未定义的 行为，在访问 bar 属性时会出错——因此 "global" 是为 this.bar 创建的值。

2. obj1.foo() 将 this 设置为对象 obj1。
3.   foo.call(obj2) 将 this 设置为对象 obj2。
4. new foo() 将 this 设置为一个全新的空对象。

- 底线:为了搞清楚` this` 指向什么，你必须检查相关的函数是如何被调用的。调用方式会是 以上 4 种之一，这也会回答“this 是什么”这个问题。



### 旧与新

- #### polyfilling

- ####  transpiling



#### 非 JavaScript

到目前为止，我们介绍的内容都局限于 JavaScript 语言本身。而现实情况是，大多数的 JavaScript 都是编写用于在浏览器这样的环境中运行并与之交互的。严格来说，你编写的 代码很大一部分并不直接由 JavaScript 控制。这听起来有点奇怪。

你将遇到的最常见的非 JavaScript 就是 DOM API。举例来说: 

```JS
var el = document.getElementById( "foo" );
```

- 它是一个特殊的对象，通常被称为"宿主对象"



### Map

```js
var m = new Map();
var x = { id: 1 },
    y = { id: 2 };
m.set( x, "foo" );
m.set( y, "bar" );
var vals = [ ...m.entries() ];

vals[0][0] === x; // true
vals[0][1]; // "foo"
vals[1][0] === y; // true
vals[1][1]; // "bar"

```



#### WeakMap

> WeakMap 是 map 的变体，二者的多数外部行为特性都是一样的，区别在于内部内存分配
>
> (特别是其 GC)的工作方式。
>
> WeakMap(只)接受对象作为键。这些对象是被弱持有的，也就是说如果对象本身被垃圾 回收的话，在 WeakMap 中的这个项目也会被移除。然而我们无法观测到这一点，因为对 象被垃圾回收的唯一方式是没有对它的引用了。但是一旦不再有引用，你也就没有对象引 用来查看它是否还存在于这个 WeakMap 中了。



### 元编程

> 元编程是指操作目标是程序本身的行为特性的编程。换句话说，它是对程序的编程的编 程。

