---
title: 读书笔记《你不知道的js-上》
date: 2020-11-14
tags: ECMA-JavaScript
comments: true
categories: ECMA-JavaScript
---

### js编译原理

- 分词/词法分析(Tokenizing/Lexing)
- 解析/语法分析(Parsing)
- 代码生成（ATS）

#### LHS & RHS

> LHS 赋值
>
> RHS 查询变量等



### 作用域

- 欺骗词法

1. eval

```js
function foo(str, a) { 
  eval( str ); // 欺骗! console.log( a, b );
}
var b = 2;
foo( "var b = 3;", 1 ); // 1, 3
```



2. with

```js
var obj = {
  a: 1,
  b: 2,
  c: 3 
};
// 单调乏味的重复 "obj" obj.a = 2;
obj.b = 3;
obj.c = 4;
// 简单的快捷方式 with (obj) {
         a = 3;
         b = 4;
         c = 5;
}
```

p s: 目前这2个方法已被MDN 不推荐使用，`with`更是在一些开发环境下是不被识别 的语句

#### 小结

>法作用域意味着作用域是由书写代码时函数声明的位置来决定的。编译的词法分析阶段 基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对它 们进行查找。
>
>JavaScript 中有两个机制可以“欺骗”词法作用域:eval(..) 和 with。前者可以对一段包 含一个或多个声明的“代码”字符串进行演算，并借此来修改已经存在的词法作用域(在 运行时)。后者本质上是通过将一个对象的引用当作作用域来处理，将对象的属性当作作 用域中的标识符来处理，从而创建了一个新的词法作用域(同样是在运行时)。



### 变量提升 & 编译器

> 结论：变量和函数在内的所有声明都会在任何代码被执行前首先 被处理。

```js
var a = 2
console.log(a)

--- 👇

var a
a = 2
console.log(a) // undefind
```

- 过程就好像变量和函数声明从它们在代码中出现的位置被“移动” 到了最上面。这个过程就叫作提升。



#### 函数优先

> 函数声明和变量声明都会被提升。但是一个值得注意的细节(这个细节可以出现在有多个
>
> “重复”声明的代码中)是函数会首先被提升，然后才是变量。

```js
foo(); // 1
var foo;
	function foo() { console.log( 1 );
}
	foo = function() { console.log( 2 );
};
```

#### 小结

> 我们习惯将var a = 2;看作一个声明，而实际上JavaScript引擎并不这么认为。它将var a
>
> 和 a = 2 当作两个单独的声明，第一个是编译阶段的任务，而第二个则是执行阶段的任务。
>
> 这意味着无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理。 可以将这个过程形象地想象成所有的声明(变量和函数)都会被“移动”到各自作用域的 最顶端，这个过程被称为提升。



### 闭包

> 老生常谈，看代码

```js
function foo() { var a = 2;
	function bar() { 
    console.log( a );
}
	return bar; 
}
var baz = foo();
baz(); // 2 —— 朋友，这就是闭包的效果。

---
  
function wait(message) {
	setTimeout( function timer() { 
    console.log( message );
}, 1000 ); 
}
wait( "Hello, closure!" );
```

- 将一个内部函数(名为 timer)传递给 setTimeout(..)。timer 具有涵盖 wait(..) 作用域的闭包，因此还保有对变量 message 的引用。
- wait(..) 执行 1000 毫秒后，它的内部作用域并不会消失，timer 函数依然保有 wait(..) 作用域的闭包。



#### 循环&闭包

> 这可能是一个老掉牙的面试题，但也是我们值得思考的问题

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}

// 我们给函数一个自己的作用域
for (var i = 1; i <= 5; i++) {
  (function () {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })();
} // 这样不行，还需要一个值来储存 当前的值 👇

for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
} // 可以了

// 改进一下
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}

```

#### 重返作用域块

```js
for (var i = 0; i <= 5; i++) {
  let j = i // // 是的，闭包的块作用域!
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```



### 模块

```js
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];
  function doSomething() {
    console.log(something);
  }
  function doAnother() {
    console.log(another.join(" ! "));
  }
  return {
    doSomething: doSomething,
    doAnother: doAnother,
  };
})();
foo.doSomething(); // cool 
foo.doAnother(); // 1 ! 2 ! 3
```



#### 现代的模块机制

> 大多数模块依赖加载器 / 管理器本质上都是将这种模块定义封装进一个友好的 API。这里
>
> 并不会研究某个具体的库，为了宏观了解我会简单地介绍一些核心概念

```js
var MyModules = (function Manager() {
  var modules = {};
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }
  function get(name) {
    return modules[name];
  }
  return {
    define: define,
    get: get,
  };
})();

```



#### ES6

> ES6 中为模块增加了一级语法支持。但通过模块系统进行加载时，ES6 会将文件当作独立 的模块来处理。每个模块都可以导入其他模块或特定的 API 成员，同样也可以导出自己的 API 成员。

---



### this

> 人们很容易把 this 理解成指向函数自身，这个推断从英语的语法角度来说是说得通的
>
> 不过现在我们先来分析一下这个模式，让大家看到 this 并不像我们所想的那样指向函数 本身。

```js
function foo(num) {
  console.log("foo: " + num);
  // 记录 foo 被调用的次数
  this.count++;
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被调用了多少次?
console.log(foo.count); // 0 -- WTF?

```

- 这段代码在 无意中创建了一个全局变量 count, 它的值为 NaN



```js
// 解决1: 回避this
function foo(num) {
  console.log("foo: " + num);
  // 记录 foo 被调用的次数
  foo.count++;
}

// 解决2: foo.call 强制绑定
for (i = 0; i < 10; i++) {
  if (i > 5) {
    // 使用 call(..) 可以确保 this 指向函数对象 foo 本身
    foo.call(foo, i);
  }
}
```



```js
function foo() {
  var a = 2;
  this.bar();
}
function bar() {
  console.log(this.a);
}
foo(); // ReferenceError: a is not defined

```

- **this 是在运行时进行绑定的，并不是在编写时绑定**，它的上下文取决于函数调 用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

- 当一个函数被调用时，会创建一个活动记录(有时候也称为执行上下文)。这个记录会包 含函数在哪里被调用(调用栈)、函数的调用方法、传入的参数等信息。this 就是记录的 其中一个属性，会在函数执行的过程中用到。



#### 调用位置

- 寻找调用位置就是寻找“函数被调用的位置”，但是做起来并没有这么简单， 因为某些编程模式可能会隐藏真正的调用位置。
- 重要的是要分析调用栈(就是为了到达当前执行位置所调用的所有函数)。我们关心的 调用位置就在当前正在执行的函数的前一个调用中。

```js
function baz() {
  // 当前调用栈是:baz
  // 因此，当前调用位置是全局作用域
  console.log("baz");
  bar(); // <-- bar 的调用位置
}
function bar() {
  // 当前调用栈是 baz -> bar
  // 因此，当前调用位置在 baz 中
  console.log("bar");
  foo(); // <-- foo 的调用位置
}
function foo() {
  // 当前调用栈是 baz -> bar -> foo // 因此，当前调用位置在 bar 中
  console.log("foo");
}
baz(); // <-- baz 的调用位置

```



#### this词法

- 箭头函数 
- 箭头函数可以像 bind(..) 一样确保函数的 this 被绑定到指定对象，此外，其重要性还体 现在它用更常见的词法作用域取代了传统的 this 机制。



#### 小结

如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后

就可以顺序应用下面这四条规则来判断 this 的绑定对象。

1. 由new调用?绑定到新创建的对象。
2. 由call或者apply(或者bind)调用?绑定到指定的对象。
3. 由上下文对象调用?绑定到那个上下文对象。
4. 默认:在严格模式下绑定到undefined，否则绑定到全局对象。

一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略 this 绑 定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null)，以保护全局对象。

ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。这 其实和 ES6 之前代码中的 self = this 机制一样。



### 对象

- Bug

`typeof null // object`

> 原理是这样的，不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”。



```js
myArray = [ "foo", 42, "bar" ];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
myArray[3] // undefind
```



#### 属性描述符

> p s: 和 typescript 比起来感觉写起来有些麻烦

```js
var myObject = { a:2
};
// 获取
Object.getOwnPropertyDescriptor(myObject, 'a')
// {
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true 
// }

// 配置 严格模式下

  "use strict";
  var myObject = {};
  Object.defineProperty(myObject, "a", {
  value: 2,
  writable: false, // 不可写!
  configurable: true,
  enumerable: true,
});
myObject.a = 3; // TypeError

```

#### 遍历

##### - 迭代器

```js
var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }

```

- for..of 循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的 next() 方法来遍历所有返回值。

> 我们使用 ES6 中的符号 Symbol.iterator 来获取对象的 @@iterator 内部属 性。之前我们简单介绍过符号(Symbol，参见 es6 Symbol)，跟这里的原理是相 同的。引用类似 iterator 的特殊属性时要使用符号名，而不是符号包含的 值。此外，虽然看起来很像一个对象，但是 @@iterator 本身并不是一个迭代 器对象，而是一个返回迭代器对象的函数——这点非常精妙并且非常重要。



- 和数组不同，普通的对象没有内置的 @@iterator，所以无法自动完成 for..of 遍历。之所 以要这样做，有许多非常复杂的原因，不过简单来说，这样做是为了避免影响未来的对象 类型。
- 当然，你可以给任何想遍历的对象定义 `@@iterator`，举例来说:

```js
var myObject = { a: 2, b: 3 };
Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function () {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function () {
        return {
          value: o[ks[idx++]],
          done: idx > ks.length,
        };
      },
    };
  },
});
// 手动遍历 myObject
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }
// 用 for..of 遍历 myObject
for (var v of myObject) {
  console.log(v);
}
// 2
// 3

```



- 实际上，你甚至可以定义一个“无限”迭代器，它永远不会“结束”并且总会返回一个新 值(比如随机数、递增值、唯一标识符，等等)。你可能永远不会在 for..of 循环中使用这 样的迭代器，因为它永远不会结束，你的程序会被挂起:

```js
var randoms = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return { value: Math.random() };
      },
    };
  },
};
var randoms_pool = [];
for (var n of randoms) {
  randoms_pool.push(n);
  // 防止无限运行!
  if (randoms_pool.length === 100) break;
}

```



### 类

> 在继承或者实例化时，JavaScript 的对象机制并不会自动执行复制行为。简单来说， JavaScript 中只有对象，并不存在可以被实例化的“类”。一个对象并不会被复制到其他对 象，它们会被关联起来



####  显式混入

- 首先我们来回顾一下之前提到的 Vehicle 和 Car。由于 JavaScript 不会自动实现 Vehicle 到 Car 的复制行为，所以我们需要手动实现复制功能。这个功能在许多库和框架中被称为 extend(..)，但是为了方便理解我们称之为 mixin(..)。

```js
// 非常简单的 mixin(..) 例子 :
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    // 只会在不存在的情况下复制
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }
  return targetObj;
}
var Vehicle = {
  engines: 1,
  ignition: function () {
    console.log("Turning on my engine.");
  },
  drive: function () {
    this.ignition();
    console.log("Steering and moving forward!");
  },
};
var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function () {
    Vehicle.drive.call(this);
    console.log("Rolling on all " + this.wheels + " wheels!");
  },
});

```



#### 混合复制

```js
// 另一种混入函数，可能有重写风险
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    targetObj[key] = sourceObj[key];
  }
  return targetObj;
}
var Vehicle = {
  // ...
};
// 首先创建一个空对象并把 Vehicle 的内容复制进去
var Car = mixin(Vehicle, {});
// 然后把新内容复制到 Car 中
mixin(
  {
    wheels: 4,
    drive: function () {
      // ...
    },
  },
  Car
);

```

- 这两种方法都可以把不重叠的内容从 Vehicle 中显性复制到 Car 中。“混入”这个名字来源 于这个过程的另一种解释:Car 中混合了 Vehicle 的内容，就像你把巧克力片混合到你最 喜欢的饼干面团中一样。

- 复制操作完成后，Car 就和 Vehicle 分离了，向 Car 中添加属性不会影响 Vehicle，反之 亦然。



#### 隐式混入

- 隐式混入和之前提到的显式伪多态很像，因此也具备同样的问题。

```JS
var Something = {
  cool: function () {
    this.greeting = "Hello World";
    this.count = this.count ? this.count + 1 : 1;
  },
};

Something.cool();
Something.greeting; // "Hello World" 
Something.count; // 1

var Another = {
  cool: function () {
    // 隐式把 Something 混入 Another
    Something.cool.call(this);
  },
};
Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1(count 不是共享状态)

```



#### 小结

> 类是一种设计模式。许多语言提供了对于面向类软件设计的原生语法。JavaScript 也有类
>
> 似的语法，但是和其他语言中的类完全不同。 类意味着复制。
>
> 传统的类被实例化时，它的行为会被复制到实例中。类被继承时，行为也会被复制到子类 中。
>
> 多态(在继承链的不同层次名称相同但是功能不同的函数)看起来似乎是从子类引用父 类，但是本质上引用的其实是复制的结果。
>
> JavaScript 并不会(像类那样)自动创建对象的副本。
>
> 混入模式(无论显式还是隐式)可以用来模拟类的复制行为，但是通常会产生丑陋并且脆 弱的语法，比如显式伪多态(OtherObj.methodName.call(this, ...))，这会让代码更加难 懂并且难以维护。
>
> 此外，显式混入实际上无法完全模拟类的复制行为，因为对象(和函数!别忘了函数也 是对象)只能复制引用，无法复制被引用的对象或者函数本身。忽视这一点会导致许多 问题。
>
> 总地来说，在 JavaScript 中模拟类是得不偿失的，虽然能解决当前的问题，但是可能会埋 下更多的隐患。



---



### 原型

```js
var anotherObject = { a: 2 };
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create(anotherObject);
myObject.a; // 2
```

- 现在 myObject 对象的 [[Prototype]] 关联到了 anotherObject。显然 myObject.a 并不存在， 但是尽管如此，属性访问仍然成功地(在 anotherObject 中)找到了值 2。



#### Object.prototype

> 所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype。由于所有的“普通” (内置，不是特定主机的扩展)对象都“源于”(或者说把 [[Prototype]] 链的顶端设置为)
>
> 这个 Object.prototype 对象，所以它包含 JavaScript 中许多通用的功能。



- 在于原型链上层时 myObject.foo = "bar" 会出现的三种情况。

1. 如果在[[Prototype]]链上层存在名为foo的普通数据访问属性并且没 有被标记为只读(writable:false)，那就会直接在 myObject 中添加一个名为 foo 的新 属性，它是屏蔽属性。
2. 如果在[[Prototype]]链上层存在foo，但是它被标记为只读(writable:false)，那么 无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会 抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
3. 如果在[[Prototype]]链上层存在foo并且它是一个setter(参见第3章)，那就一定会 调用这个 setter。foo 不会被添加到(或者说屏蔽于)myObject，也不会重新定义 foo 这 个 setter。

> 大多数开发者都认为如果向 [[Prototype]] 链上层已经存在的属性([[Put]])赋值，就一 定会触发屏蔽，但是如你所见，三种情况中只有一种(第一种)是这样的。
>
> 如果你希望在第二种和第三种情况下也屏蔽 foo，那就不能使用 = 操作符来赋值，而是使 用 Object.defineProperty(..)(参见第 3 章)来向 myObject 添加 foo。



```js
var anotherObject = { a: 2 };
var myObject = Object.create(anotherObject);
anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("a"); // false
myObject.a++; // 隐式屏蔽!
anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty("a"); // true

```



#### 划重点

> 尽管 myObject.a++ 看起来应该(通过委托)查找并增加 anotherObject.a 属性，但是别忘 了 ++ 操作相当于 myObject.a = myObject.a + 1。因此 ++ 操作首先会通过 [[Prototype]] 查找属性 a 并从 anotherObject.a 获取当前属性值 2，然后给这个值加 1，接着用 [[Put]] 将值 3 赋给 myObject 中新建的屏蔽属性 a，天呐!
>
> 修改委托属性时一定要小心。如果想让 anotherObject.a 的值增加，唯一的办法是 anotherObject.a++。



- 实际上，JavaScript 才是真正应该被称为“面向对象”的语言，因为它是少有的可以不通过类，直接创建对象的语言。
- 在 JavaScript 中，类无法描述对象的行，(因为根本就不存在类!)对象直接定义自己的行 为。再说一遍，JavaScript 中只有对象。



#### “类”函数

- 多年以来，JavaScript 中有一种奇怪的行为一直在被无耻地滥用，那就是模仿类。我们会 仔细分析这种方法。



#### 创建关联

```js
var foo = {
  something: function () {
    console.log("Tell me something good...");
  },
};
var bar = Object.create(foo);
bar.something(); // Tell me something good...

```



- Object.create(..) 会创建一个新对象(bar)并把它关联到我们指定的对象(foo)，这样 我们就可以充分发挥 [[Prototype]] 机制的威力(委托)并且避免不必要的麻烦(比如使 用 new 的构造函数调用会生成 .prototype 和 .constructor 引用)。





#### 小结

如果要访问对象中并不存在的一个属性，[[Get]] 操作就会查找对象内部

[[Prototype]] 关联的对象。这个关联关系实际上定义了一条“原型链”(有点像嵌套的作用域链)，在查找属性时会对它进行遍历。

所有普通对象都有内置的 Object.prototype，指向原型链的顶端(比如说全局作用域)，如 果在原型链中找不到指定的属性就会停止。toString()、valueOf() 和其他一些通用的功能 都存在于 Object.prototype 对象上，因此语言中所有的对象都可以使用它们。

关联两个对象最常用的方法是使用 new 关键词进行函数调用，在调用的 4 个步骤(第 2 章)中会创建一个关联其他对象的新对象。

使用 new 调用函数时会把新对象的 .prototype 属性关联到“其他对象”。带 new 的函数调用 通常被称为“构造函数调用”，尽管它们实际上和传统面向类语言中的类构造函数不一样。

虽然这些 JavaScript 机制和传统面向类语言中的“类初始化”和“类继承”很相似，但 是 JavaScript 中的机制有一个核心区别，那就是不会进行复制，对象之间是通过内部的 [[Prototype]] 链关联的。

出于各种原因，以“继承”结尾的术语(包括“原型继承”)和其他面向对象的术语都无 法帮助你理解 JavaScript 的真实机制(不仅仅是限制我们的思维模式)。

相比之下，“委托”是一个更合适的术语，因为对象之间的关系不是复制而是委托。



### 行为委托

#### 比较思维模型

```js
// 模仿类
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function () {
  return "I am " + this.me;
};
function Bar(who) {
  Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function () {
  alert("Hello, " + this.identify() + ".");
};
var b1 = new Bar("b1");
var b2 = new Bar("b2");
b1.speak();
b2.speak();

// 面向委托
Foo = {
  init: function (who) {
    this.me = who;
  },
  identify: function () {
    return "I am " + this.me;
  },
};
Bar = Object.create(Foo);
Bar.speak = function () {
  alert("Hello, " + this.identify() + ".");
};
var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();

```

- 这段代码中我们同样利用 [[Prototype]] 把 b1 委托给 Bar 并把 Bar 委托给 Foo，和上一段 代码一模一样。我们仍然实现了三个对象之间的关联。

- 但是非常重要的一点是，这段代码简洁了许多，我们只是把对象关联起来，并不需要那些 既复杂又令人困惑的模仿类的行为(构造函数、原型以及 new)。

### class陷阱

> 首先，你可能会认为 ES6 的 class 语法是向 JavaScript 中引入了一种新的“类”机制，其
>
> 实不是这样。class 基本上只是现有 `[[Prototype]]`(委托!)机制的一种语法糖。
>
> 也就是说，class 并不会像传统面向类的语言一样在声明时静态复制所有行为。如果你 (有意或无意)修改或者替换了父“类”中的一个方法，那子“类”和所有实例都会受到
>
> 影响，因为它们在定义时并没有进行复制，只是使用基于 [[Prototype]] 的实时委托:



```js
class C {
  constructor() {
    this.num = Math.random();
  }
  rand() {
    console.log("Random: " + this.num);
  }
}
var c1 = new C();
c1.rand(); // "Random: 0.4324299..."
C.prototype.rand = function () {
  console.log("Random: " + Math.round(this.num * 1000));
};
var c2 = new C();

c2.rand(); // "Random: 867"

c1.rand(); // "Random: 432" 影响到了之前的实例

```



- 此外，class 语法仍然面临意外屏蔽的问题:

```js
class C {
  constructor(id) {
    // 噢，郁闷，我们的 id 属性屏蔽了 id() 方法
    this.id = id;
  }
  id() {
    console.log("Id: " + id);
  }
}
var c1 = new C("c1");
c1.id(); // TypeError -- c1.id 现在是字符串 "c1"

```



#### 小结

> class 很好地伪装成 JavaScript 中类和继承设计模式的解决方案，但是它实际上起到了反作
>
> 用:它隐藏了许多问题并且带来了更多更细小但是危险的问题。
>  class 加深了过去 20 年中对于 JavaScript 中“类”的误解，在某些方面，它产生了一些问题

