---
title: Monorepo And MicroService
date: 2022-05-13
tags: 记
categories: 记
---





### 缘起

> 最近经常看到` Monorepo` 和` MicroService` 被提及这里做一下总结



### What is it

- Monorepo:  是指单一代码库

  > 在版本控制系统的单个代码库里包含了多个项目之间的代码，项目之间可能是相关的，但通常在逻辑上是独立的，可以有单个或者多个不同的团队维护。

  那既然有 单一代码库与之对应的就是`多代码酷`即：MultiRepos



- MicroService： 微服务架构

  > 把一个大型的项目服务拆分成多个独立的单元，单元有独立的功能和模块承担不同的功能，相互之间可以通信建立连接

  

---



### Monorepo

[Monorepo Link](https://monorepo.tools/)



![monorepo-multirepo](https://s2.loli.net/2022/05/13/2y8xtTGPKMLEDRF.png)



Monorepo 不是一个新的东西，在软件开发行业它已经存在很久了，许多开源项目已经成功使用了单一代码库 👇🏻

- Larave：一个用于Web开发的PHP框架。

- Babel：一个用户Web开发的流行的JavaScript编译器，其单一代码库包含了完整的项目及其所有插件。

- React、Ember、Meteor 等前端框架都使用单一代码库。



#### 它的优势

- **可见性（Visibility）**：每个人都可以看到其他人的代码，这样可以带来更好的协作和跨团队贡献——不同团队的开发人员都可以修复代码中的bug，而你甚至都不知道这个bug的存在。

- **更简单的依赖关系管理（Simpler dependency management）**：共享依赖关系很简单，因为所有模块都托管在同一个存储库中，因此都不需要包管理器。

- **一致性（Consistency）**：当你把所有代码库放在一个地方时，执行代码质量标准和统一的风格会更容易。

- **共享时间线（Shared timeline）**：API或共享库的变更会立即被暴露出来，迫使不同团队提前沟通合作，每个人都得努力跟上变化。

- **原子提交（Atomic commits）**：原子提交使大规模重构更容易，开发人员可以在一次提交中更新多个包或项目。

- **隐式CI（Implicit CI）**：因为所有代码已经统一维护在一个地方，因此可以保证持续集成。

- **统一的CI/CD（Unified CI/CD）**：可以为代码库中的每个项目使用相同的CI/CD部署流程。

- **统一的构建流程（Unified build process）**：代码库中的每个应用程序可以共享一致的构建流程。



#### 在什么样的情况下使用 Monorepo ？

1. 同一个相互关联的项目需要不同团队来维护。
2. 同一个项目中不同模块需要组件/模块复用
   - 在前端开发中通常用 `lerna`/`pnpm` 管理 
3. 单个模块的开发需要整个项目的配合和启动
4. 团队之间需要统一 CI/CD 流程
5. 经常要在多个 模块/项目 之间 调试/开发



> 说着了这么多Monorepo 的优势那它有什么劣势呢？



- 无法管理某个、某些项目对于指定人员的权限
- 不同分支下的版本控制会显得较为混乱
- 对于发布构建的挑战，难度会比单个项目构建要大



---



### MicroService

> 微服务是一种软件架构：通过**微服务**，可将大型应用分解成多个独立的组件，其中每个组件都有各自的责任领域。
>
> 当然于是对应的有 **单体架构**（monolithic software）



<img src="https://s2.loli.net/2022/05/13/QdfNZiORE6S8eAb.jpg" alt="microservices architecture" style="zoom:67%;" />



#### 单体架构：微服务要解决的问题

- 所有功能耦合在一起，互相影响，最终难以管理。

- 哪怕只修改一行代码，整个软件就要重新构建和部署，成本非常高。

- 因为软件做成了一个整体，不可能每个功能单独开发和测试，只能整体开发和测试，导致必须采用瀑布式开发模型。

  

> 为了解决这👆🏻些问题从而出现了微服务，来对项目解耦和模块划分



微服务通过把一个大型项目按模块和功能划分成多个 "单元项目"，单元项目可独立部署、开发、测试，他可以运行在不同机器上面相互连接从而组成一个完整的网络应用



- 每种服务功能单一，相当于一个小型软件，便于开发和测试。

- 各个服务独立运行，简化了架构，提高了可靠性。

- 鼓励和支持代码重用，同一个服务可以用于多种目的。

- 不同服务可以单独开发和部署，便于升级。

- 扩展性好，可以容易地加机器、加功能，承受高负载。

- 不容易出现单点故障。即使一个服务失败了，不会影响到其他服务。



但是这样的架构也会有一些问题，例如：例如2个项目在一台服务器上依赖不同版本的模块。在没必要多加一台服务器的情况下。

> [Docker](https://www.docker.com/) 的出现解决了整个问题。它让程序运行在容器中，每个容器可以分别设定运行环境，并且只占用很少的系统资源。这样就不需要多台服务器了，最简单的情况下，本机运行多个容器，只用一台服务器就实现了面向服务架构，这在以前是做不到的。这种实现方式就叫做微服务。





### Micro-Frontends 微前端 

> 有着类似于微服务的设计理念，它将微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。各个前端应用还可以独立运行、独立开发、独立部署。



微前端架构的优势：

- 技术栈无关 主框架不限制接入应用的技术栈，子应用具备完全自主权
- 独立开发、独立部署 子应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
- 独立运行时 每个子应用之间状态隔离，运行时状态不共享



<img src="https://s2.loli.net/2022/05/14/tcLASQiBG8sexEl.jpg" alt="mfe-structure.4b7628a6" style="zoom: 50%;" />



其实早在微前端这个概念出来之间就有一些类似的解决方案 —— `iframe`



#### iframe

- 完全隔离了css和js，避免了各个系统之间的样式和js污染。
- 子应用可以不做任何修改，也可以使用任何网站应用嵌入进来

#### iframe的缺点

- 路由状态丢失，刷新一下，iframe 的 url 状态就丢失了
- dom 割裂严重，弹窗只能在 iframe 内部展示，无法覆盖全局
- .通信非常困难，只能通过 postmessage 传递序列化的消息。
- 白屏时间太长，对于SPA 应用应用来说无法接受



从而衍生出来一些微前端框架👇🏻

- [Mooa](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmooa)：基于Angular的微前端服务框架

- [Single-Spa](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fsingle-spa)：最早的微前端框架，兼容多种前端技术栈。

- [Qiankun](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fqiankun)：基于Single-Spa，阿里系开源微前端框架。

- [Icestark](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ficestark)：阿里飞冰微前端框架，兼容多种前端技术栈。

- [Ara Framework](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhttps%3A%2F%2Fara-framework.github.io%2Fwebsite%2Fdocs%2Fquick-start)：由服务端渲染延伸出的微前端框架。



#### 不同于iframe的微前端架构的特性

- HTML Entry 的接入方式。
- 样式隔离，确保微应用之间样式互相不干扰。
- JS 沙箱，确保微应用之间 全局变量/事件 不冲突。



---



### 小结

**Monorepo 和 MicroService 的关系 ？**

> 理论上 Monorepo 和 MicroService 本质上其实没什么关系，但是它们又有一些关系

> Monorepo 来集成多个项目，MicroService 把一个项目拆成多个单元项目 
>
> ？？？ 哈哈😄，这不是自相矛盾嘛，其实不然 它们不是一码事。



Monorepo 是利开发阶段，MicroService是项目生产时。

并且 Monorepo 和 MicroService 可以共存相辅相成。

微服务把项目拆分成多个单元项目从而划分了项目职责；让项目更加清晰单一，Monorepo 通过对多个单元项目的集中管理，让项目保持一致性，清晰的依赖关系等

























