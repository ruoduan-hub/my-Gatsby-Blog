---
title: Nest 使用SSE 服务端推送实现"协同"
date: 2023-07-23
tags: Nodejs
comments: true
categories: Nodejs
---




## 缘起
> 一些涉及到 “实时更新”的场景,使用 "websocket" | “SSE”，老生常谈的问题了，这篇文章会用一个通俗、简单的例子，来解释在 Nodejs 框架 "Nest" 中使用 SSE 技术完成状态同步。、



[Demo 完整代码](https://github.com/ruoduan-hub/nest-demo-sse)

### Why SSE ？
- 基于HTTP协议，不需要额外的协议
- 单向通信，实时性：SSE 提供了实时的数据推送机制，服务器可以在任何时候向客户端发送数据。当有新数据可用时，服务器会立即将其推送给客户端，而不需要客户端主动请求。
- 自动重连、客户端连接、断开
- 事件驱动：SSE 使用基于事件的模型。服务器可以定义不同类型的事件，并将数据作为事件发送给客户端。客户端可以通过监听特定类型的事件来处理接收到的数据。


### 协议

```yml
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

> 协议很简单本质上还是 `http` 请求

- 网图侵删 👇

**HTTP**

![HTTP.png](https://s2.loli.net/2023/07/26/ZfHVM5iX8qzwD6P.png)

**SSE**

![SSE.png](https://s2.loli.net/2023/07/26/8Yp4VobTfCPl5zQ.png)


### 场景
- 设想一个场景，类似语雀、金山文档等这些在线编辑的文档软件，他们是如何实现多人状态下编辑内容同步的呢？例如金山文档 Excel 实时的展示 每个人正在编辑的单元格 ？ 

我们抽象一下例如：有2个接口：
1. postLocation，接口负责推送当前编辑的位置
2. getLocation， 获取最新的位置

这种情况下，可以实现的方式很多 比较常见的："轮询"、"webSocket"、"SSE"; 我们可以理解 "切换单元格"是一件很频繁的事情，只有在状态更新的时候再去触发推送，避免不必要的带宽浪费； 且 `getLocation` 不需要 “双向通信” 只需要实时的获取数据就可以了，相信你们心里已经有答案了 那就是 `SSE`.


### 正文
接下来我们简单的通过假代码实现一个 SSE，本文建立在有一定的 前端技术基础和 nodejs nest 技术基础上。
- [Nestjs](https://docs.nestjs.com/techniques/server-sent-events#usage)
- [MDN EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)

#### server 
> 我们先来实现一个简单的 SSE

```ts
import { Controller, Post, Body, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

@Controller('location')
export class LocationtController {
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }

  @Post()
  addList(@Body() body): any {
    console.log('当前位置信息');
    console.log(body);
    return 'ok';
  }
}

```

#### Client

```
const ev = new EventSource('xxx/location/sse');

ev.onmessage = (e) => {
  console.log(e.data)
};

```

这个时候你就可以看到 控制台不断的输出 `hello word` 这个键值对,

这个示例完成后我们可以在 浏览器 network 看到 每秒打印 "hello: 'world'", 你可能注意到了这里的 ` Observable<MessageEvent>`, 这个稍后解释。


- 我们把代码改写一下创建一个一个 `mapList` 来储存所有人的位置 


```ts
import { Controller, Post, Body, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

@Controller('location')
export class LocationtController {
  private mapList = [];

  @Sse('sse')
  sse() {
    return this.mapList;
  }

  @Post()
  addList(@Body() body): any {
    this.mapList = [body, ...this.mapList];
    return 'ok';
  }
}

```

打开客户端，链接 SSE 一开始一开始我们接受到的是`[]`, 请求下 post请求 传递一个 
`
{
    "x": 2,
    "y": 2
}
`
我们会发现数据是这样子的 👇🏻 ：

![image.png](https://s2.loli.net/2023/07/26/8hPGJHTCK4oQrL1.png)

👇🏻

![image.png](https://s2.loli.net/2023/07/26/gQq276tAEovuNMc.png)


数据 从 [] => [{"x":2,"y":2}]

但是主要为什么 SSE 请求那么多，而且每次都是 `ID: 1` ？

这时候我们来看 `Observable<MessageEvent>` 的解释

```ts
/**
   * @constructor
   * @param {Function} subscribe the function that is called when the Observable is
   * initially subscribed to. This function is given a Subscriber, to which new values
   * can be `next`ed, or an `error` method can be called to raise an error, or
   * `complete` can be called to notify of a successful completion.
   */
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  
```

- MessageEvent


```ts
interface MessageEvent<T = any> {
    /**
     * @deprecated
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/initMessageEvent)
     */
    initMessageEvent(type: string, bubbles?: boolean, cancelable?: boolean, data?: any, origin?: string, lastEventId?: string, source?: MessageEventSource | null, ports?: Iterable<MessagePort>): void;
}
```

再结合文档 👇🏻

```
**WARNING**

Server-Sent Events routes must return an `Observable` stream.

```

大概意思就是: SSE 服务器端事件发送路径必须返回`Observable`流，可是我们明明可以直接返回静态数据呀！

接下来看 `Observable` 说：Observable 赋值一个订阅者 接收 `subscribe` 为参数，通过 `next` 或者 `error`  调用，`complete` 完成。

大致理解下来就是在使用 `SSE` 的过程中，是通过 `stream` 也就是浏来通信的，ID是用于客户端的状态跟踪，通过为每个事件指定唯一的标识符。

这下哦我们可以理解了，因为我们每次返回静态数据所以 每次都会创建一个新的 `stream` 且 ID 也默认每次都是第一个了

- 接下来我们要把代码改写一下解决：
1. SSE 多个的问题
2. SSE 在 send 数据的时候 只有在 addList 被调用的时候，而不是一直朝 客户端推送

- 解决思路👇🏻
- 使用发布订阅来控制 SSE 的推送时机(当然实现的方式有很多种，这里用 `node` 的 `events`)
- SSE 发送数据处在一个流中

- 完整代码：

```ts
import { Controller, Post, Body, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import * as EventEmitter from 'events';

const myEmitter = new EventEmitter();

@Controller('location')
export class LocationtController {
  private mapList = [];

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return new Observable<any>((observer) => {
      myEmitter.on('send', (data: any) => {
        this.mapList = [data, ...this.mapList];
        observer.next({ data: this.mapList });
      });
    });
  }

  @Post()
  addList(@Body() body): any {
    myEmitter.emit('send', body);
    return 'ok';
  }
}
```


![image.png](https://s2.loli.net/2023/07/26/ZWIUrDigcQEBHdy.png)

以上代码，只不过是通过一个简单的例子来 更好的理解 SSE，实际上我们的 语雀、金山文档不可能把数据存在 class 里面，也不会那么简单的实现。

[Demo 完整代码](https://github.com/ruoduan-hub/nest-demo-sse)