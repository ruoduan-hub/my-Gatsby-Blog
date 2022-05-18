---
title: Parallels Desktop 科学版 - 小记
date: 2022-05-18
tags: 记
categories: 记
---



### 缘起

> 今天需要在 MAC 上安装一个 Windows 系统来使用一个软件，那 mac 上肯定首选`Parallels Desktop `
>
> 囊中羞涩，迫于无奈 只能选择 `学习版`来学习了. 找了一圈最新版各大`学习网站`都没有了 。
>
> 找了个老版本 12版本的来使用

ps: 幸好不是`M1`芯片，最近对M1 芯片非常反感，在ipad，mac中适配都不是很好，兼容性问题，闪退，层出不穷



好了回归正题：

在我下载好了软件准备安装的时候看到安装包的一句话非常 **hacker** 记于此 👇🏻

```toml
why join the navy if you can be a pirate ？

如果你能成为海盗，为什么要加入海军 ？
```

**Awesome ！**

在这里提倡使用`官方正版软件`，本文章仅供学习！



---



### 过程

- 正常安装是无法安装的，—— “ Parallels Desktop”已损坏,无法打开。 您应该推出磁盘映像 “。
- 首先要打开：设置 -> 安全与隐私 -> 允许从以下位置下载APP ： **选择任何来源**
  - 没有的话 输入 `sudu spctl --master-disable` 
- 然后按快捷键 shift + command + .  会看到安装包里隐藏的“Parallels Desktop.app”文件
- Desktop.app 拖到桌面
- `sudo xattr -r -d com.apple.quarantine ~/Desktop/Parallels\ Desktop.app`















