---
title: canvas穿透pointer-events属性
date: 2019-01-18
tags: Front-end
categories: 《Front-end》
---

遇到这个问题这里记录一下，解决方案也非常简单

- 在我们把 canvas 作为 网站的 body 背景的 时候，如果 z-index 的层级没注意设计，默认情况下，canvas 会遮挡网站上的 a 链接 和一些按钮的

  - 遇到这个 问题 我们只需要在 canvas 背景中添加一个 css 属性：pointer-events: none
  - 你可以选择后期用 js 添加，也可以在创建的 时候直接写上，如果是 canvas 在本地 可以直接写上，如果是请求而来的，可以用 js 给相应的 canvas 添加这一条属性

#### 语法

- pointer-events：auto | none | visiblepainted | visiblefill | visiblestroke | visible | painted | fill | stroke | all
- 默认值：auto
- 取值
  - auto： 与 pointer-events 属性未指定时的表现效果相同。在 svg 内容上与 visiblepainted 值相同
  - none：元素永远不会成为鼠标事件的 target。但是，当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶触发父元素的事件侦听器。
    其他值只能应用在 SVG 上。

> 说明：
> 设置或检索在何时成为属性事件的 target。
> 使用 pointer-events 来阻止元素成为鼠标事件目标不一定意味着元素上的事件侦听器永不会触发。如果元素后代明确指定了 pointer-events 属性并允许其成为鼠标事件的目标，那么指向该元素的任何事件在事件传播过程中都将通过父元素，并以适当的方式触发其上的事件侦听器。当然位于屏幕上在父元素上但不在后代元素上的鼠标活动都不会被父元素和后代元素捕获（将会穿过父元素而指向位于其下面的元素）。
> 对应的脚本特性为 pointerEvents。

#### 小栗子

```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
  <head>
    <meta charset="utf-8" />
    <title>pointer-events_CSS参考手册_web前端开发参考手册系列</title>
    <style>
      a[href="http://example.com"] {
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <ul>
      <li><a href="https://developer.mozilla.org/">MDN</a></li>
      <li><a href="http://example.com">一个不能点击的链接</a></li>
    </ul>
  </body>
</html>
```

[参考链接](https://www.css88.com/book/css/properties/user-interface/pointer-events.htm)

结束啦~
