---
title: localForage离线缓存技术(兼容低版本浏览器)
date: 2019-07-05
tags: Code-Tools
comments: true
categories: 《Code-Tools》
---



## localforag离线缓存技术
> ocalForage 是一个 JavaScript 库，通过简单类似 localStorage API 的异步存储来改进你的 Web 应用程序的离线体验。它能存储多种类型的数据，而不仅仅是字符串。
> localForage 有一个优雅降级策略，若浏览器不支持 IndexedDB 或 WebSQL，则使用 localStorage。在所有主流浏览器中都可用：Chrome，Firefox，IE 和 Safari（包括 Safari Mobile）。
> [LOCALFORAGE 文档](https://localforage.docschina.org/#api-setitem)；


起因是，在一个比较老旧的`.NET `项目中要实现页面传值(传递大量的订单信息，且对数据结构有一定要求),考虑后决定使用HTML5 离线缓存技术，但是这个项目有一些用户任在使用一些低版本浏览器，决定使用`LOCALFORAGE`他是 firefox 推出的一个改进后的JavaScript 库

最重要的是 他支持复杂的`数据类型`，而不是简单的字符串和`链表`,使用起来也比较简单

#### 可以储存的数据类型
- Array
- ArrayBuffer
- Blob
- Float32Array
- Float64Array
- Int8Array
- Int16Array
- Int32Array
- Number
- Object
- Uint8Array
- Uint8ClampedArray
- Uint16Array
- Uint32Array
- String
>  当使用 localStorage 和 WebSQL 作为后端时，二进制数据在保存（和检索）之前会被序列化。在保存二进制数据时，序列化会导致大小增大。

#### SETITEM- 储存
```js
localforage.setItem('somekey', 'some value').then(function (value) {
    // 当值被存储后，可执行其他操作
    console.log(value);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});

// 不同于 localStorage，你可以存储非字符串类型
localforage.setItem('my array', [1, 2, 'three']).then(function(value) {
    // 如下输出 `1`
    console.log(value[0]);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});

// 你甚至可以存储 AJAX 响应返回的二进制数据
req = new XMLHttpRequest();
req.open('GET', '/photo.jpg', true);
req.responseType = 'arraybuffer';

req.addEventListener('readystatechange', function() {
    if (req.readyState === 4) { // readyState 完成
        localforage.setItem('photo', req.response).then(function(image) {
            // 如下为一个合法的 ![在这里插入图片描述]() 标签的 blob URI
            var blob = new Blob([image]);
            var imageURI = window.URL.createObjectURL(blob);
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
        });
    }
});
```
#### GETITEM- 取值
```js
localforage.getItem('somekey').then(function(value) {
    // 当离线仓库中的值被载入时，此处代码运行
    console.log(value);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});

// 回调版本：
localforage.getItem('somekey', function(err, value) {
    // 当离线仓库中的值被载入时，此处代码运行
    console.log(value);
});
```

#### REMOVEITEM - 删除
```js
localforage.removeItem('somekey').then(function() {
    // 当值被移除后，此处代码运行
    console.log('Key is cleared!');
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
```
##### ALLREMOVEITEM - 删除所有
```js
localforage.clear().then(function() {
    // 当数据库被全部删除后，此处代码运行
    console.log('Database is now empty.');
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
```


#### LENGTH - 获取仓库KEY长度
```js
localforage.length().then(function(numberOfKeys) {
    // 输出数据库的大小
    console.log(numberOfKeys);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
```

#### KEY - 获取KEY值
```js
localforage.key(2).then(function(keyName) {
    // key 名
    console.log(keyName);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
```
##### KEYS - 获取所有KEY值
```js
localforage.keys().then(function(keys) {
    // 包含所有 key 名的数组
    console.log(keys);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
```

完 

> 具体以官方文档为主