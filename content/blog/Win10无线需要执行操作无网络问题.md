---
title: 记-Window10WIFI频繁断开显示“需要执行操作”的解决方法
date: 2020-03-29
tags: 记
categories: 记
---


### 缘起
> 朋友Windows电脑，老是出现 Wifi网络 断开 需要执行操作的问题，来找我，刚开始以为是 dns 和 DHCP 的问题 释放重新获取来 一下发现没有，后台发现没那么简单

### 原因
> 这是微软更新协议导致连接外网需要与服务商重新签订ISP，不影响上网，只是可能对微软的产品或服务会弹出提醒、警示，待微软协议更新完成，服务商重新签订后就好了，据悉，只有移动宽带用户受到了影响，电信没有问题。

- 以通过注册表解决这个问题

1. 按下WIN+R，然后输入regedit回车打开注册表编辑器；

2. 定位到注册表HKEY_LOCAL_MACHINE\SYSTEM\CurrentControSet\servicces\NlaSvc\Parameters\Internet

3. 找到EnableActiveProbing，将其值改为0就可以了。

---
#### 完

