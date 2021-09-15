---
title: "macOS下蓝牙键盘(Keychron K2)连接失败的解决办法"
date: 2020-12-10
tags: 记
comments: true
categories: 记
---

### macOS下蓝牙键盘(Keychron K2)连接失败的解决办法

![图片](https://i.loli.net/2021/09/15/2A1OzsP7k5XWLDB.jpg)

#### 缘起

> 被种草入手了一个Keychron K2，使用起来感觉不错。后面又买了一个；给我的小老哥也安排了一个



- 但是使用的食用遇到了一点问题 
  1. 长时间不使用键盘进入省电模式后，输入会断断续续 不稳定
  2. 点击蓝牙配对后，mac经过漫长时间的连接，最终显示配对失败。

---

#### 解决方案 

> 打开Finder，按command+shift+G组合键弹出地址输入框后，输入/Library/Preferences，进入到preferences文件夹里，然后找到com.apple.Bluetooth.plist文件，直接删除掉。系统会让你输入密码，输入即可。（这个是mac连接过的蓝牙设备保存文件，如果觉得不放心可以备份一下）然后关闭蓝牙，重启mac，打开键盘蓝牙配对模式，打开mac蓝牙设置界面，选择你的蓝牙键盘设备，应该就可以配对成功了。

- 但是这只是一个暂时的解决方案，应该是 macOS 系统问题