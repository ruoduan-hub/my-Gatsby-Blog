---
title: vue-animation
date: 2019-02-02
tags: VUE
comments: true
categories: 《VUE》
---

- 为什么要有动画 ？ 
  - 就是要有不解释
  - 比较简单记录一下，方便找
### 1. 过渡类名动画
#### 1. html结构
```js
<div id="app">
    <input type="button" value="动起来" @click="myAnimate">
    <!-- 使用 transition 将需要过渡的元素包裹起来 -->
    <transition name="fade">
      <div v-show="isshow">动画哦</div>
    </transition>
  </div>
```
#### 2. VM 实例：

```js
// 创建 Vue 实例，得到 ViewModel
var vm = new Vue({
  el: '#app',
  data: {
    isshow: false
  },
  methods: {
    myAnimate() {
      this.isshow = !this.isshow;
    }
  }
});
```

#### 3. 定义两组类样式：
```css
/* 定义进入和离开时候的过渡状态 */
/* 定义进入过渡的开始状态 和 离开过渡的结束状态 */
   .v-enter,
    .v-leave-to {
      transform: translateX(100px);
      opacity: 0;
    }

    .v-enter-active,
    .v-leave-active {
      transition: all 0.8s ease;
    }

```
---

### 2. 第三方类实现动画
#### 1. 引包

```js
<link rel="stylesheet" type="text/css" href="./lib/animate.css">
```
#### 2. 定义 transition 及属性

```html
<div id="app">
      <input type="button" value="toggle" @click="flag=!flag">
      <!-- 需求： 点击按钮，让 h3 显示，再点击，让 h3 隐藏 -->
      <transition enter-active-class="bounceInRight" leave-active-class="fadeOut" 
      :duration='{enter: 500, leave: 400}'>
      <!-- 使用  :duration="{ enter: 200, leave: 400 }"  来分别设置 入场的时长 和 离场的时长  -->
        <h3 v-if="flag" class="animated">这是一个H3</h3>
      </transition>
    </div>
```

### 3. 钩子函数动画

#### 1. 定义 transition 组件以及三个钩子函数：
```html
<div id="app">
    <input type="button" value="切换动画" @click="isshow = !isshow">
    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
      <div v-if="isshow" class="show">OK</div>
    </transition>
  </div>
```
#### 2. 定义三个 methods 钩子方法：
```js
methods: {
        beforeEnter(el) { // 动画进入之前的回调
          el.style.transform = 'translateX(500px)';
        },
        enter(el, done) { // 动画进入完成时候的回调
          el.offsetWidth;
          el.style.transform = 'translateX(0px)';
          done();
        },
        afterEnter(el) { // 动画进入完成之后的回调
          this.isshow = !this.isshow;
        }
      }
```
#### 3. 定义动画过渡时长和样式：
```js
.show{
      transition: all 0.4s ease;
    }
```
### 4. 列表动画

#### 1. 定义过渡样式：
```css
<style>
    .list-enter,
    .list-leave-to {
      opacity: 0;
      transform: translateY(10px);
    }

    .list-enter-active,
    .list-leave-active {
      transition: all 0.3s ease;
    }
</style>
```
#### 2. 定义DOM结构，其中，需要使用 transition-group 组件把v-for循环的列表包裹起来：
```html
  <div id="app">
    <input type="text" v-model="txt" @keyup.enter="add">

    <transition-group tag="ul" name="list">
      <li v-for="(item, i) in list" :key="i">{{item}}</li>
    </transition-group>
  </div>
```
#### 3. 定义 VM中的结构：
```js
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        txt: '',
        list: [1, 2, 3, 4]
      },
      methods: {
        add() {
          this.list.push(this.txt);
          this.txt = '';
        }
      }
    });
```


### 列表的排序过渡
`<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，**还可以改变定位**。要使用这个新功能只需了解新增的 `v-move` 特性，**它会在元素的改变定位的过程中应用**。
+ `v-move` 和 `v-leave-active` 结合使用，能够让列表的过渡更加平缓柔和：
```js
.v-move{
  transition: all 0.8s ease;
}
.v-leave-active{
  position: absolute;
}
```
### 结束
- 动画的应用场景有很多，例如：组件切换、事件、交互、updated ......
- 自行体会，活用