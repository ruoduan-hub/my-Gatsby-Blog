---
title: React项目使用 Web Worker
date: 2024-03-06
tags: React
comments: true
categories: React
---




### 缘起
> Web Worker 老生常谈了 —— 它允许你在主线程之外创建额外的线程来执行任务，例如处理文件，埋点轮询，如何在 React 中使用呢 ？



### webpack5^

**JSX**

```typescript
  useEffect(() => {
    const worker = new Worker(new URL('./wk.ts', import.meta.url));

    // set Worker Handle
    worker.onmessage = function (e: MessageEvent) {
      const result: string = e.data;
      console.log('Received result from Worker:', result);
    };

    // post Worker message
    worker.postMessage('hello from main thread');
  }, []);
```



**wk.ts**

```typescript
self.onmessage = function(e: MessageEvent) {
  const data: string = e.data;  
  //  This's Worker in data 
  const result: string = data.toUpperCase();
  
  // Post result to JSX
  self.postMessage(result);
};
```



- `import.meta` 是一个内置在 ES 模块内部的对象，`import.meta.url` 表示一个模块在浏览器和 `Node.js` 的绝对路径。该特性属于 es2020 的一部分 
- `new URL`传入 path & base 写入内存



### worker-loader

> 不是 webpack5^ 可以使用插件 Loader `worker-loader`



```js
module.exports = {
  module: {
    rules: [
      {
        // 以 .worker.js 结尾的文件将被 worker-loader 加载
        test: /\.worker\.(c|m)?js$/i,
        use: {
          loader: "worker-loader",
        },
      },
    ],
  },
};
```

or

```js
  chainWebpack(config) {
    config.module
      .rule('worker')
      .test(/\.worker\.ts$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end();
  },
```



>  为了保证 worker 中的代码被 babel 转译，可以让 `babel-loader` 在 `worker-loader` 之前执行。`ts-loader` 同理



### why import worker file ？

````js
import workPath from "./worker.js";
const worker = new Worker(workPath);
````

> 为什么不能直接这样导入worker 文件呢？



同样也是需要借助特定的 loader，类似于 `file-loader`。至于 `worker-loader` 则是将`new Worker(workPath)`的步骤内置到 loader 处理流程了，并导出一个函数，外面直接使用该函数即可创建指定的 Worker



```js
module.exports = function () {
  return new Worker(__webpack_public_path_ + "123abc.worker.js");
};
```

> worker-loader 把文件转成类似👆



### blobUrl

> 还有一种方式就是 —— `worker.js` 的主函数转化为 `blobUrl` 导出，供主线程引用。该方法的好处是可以动态创建 worker

```js
// worker.js
const contentCode = function () {} // worker 脚本主函数
const blob = new Blob([contentCode.toString()], {type: 'text/javascript'});
export {url: URL.createObjectURL(blob)}


// main.js
import { url } from './worker.js'
const worker = new Worker(url);
```



Reference: [worker-loader源码](https://github.com/webpack-contrib/worker-loader/blob/master/src/supportWebpack5.js)