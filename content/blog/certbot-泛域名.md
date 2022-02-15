---
title: "certbot申请泛域名"
date: 2022-02-13
tags: 记
comments: true
categories: 记
---



### 缘起

> 今天在找文档的时候翻看之前写的 blog，发现我的 `blog`  `chrome` 显示不安全；
>
> “ 我记得我的 SSL 证书 续期是不是泛域名的顺势重新申请了个泛域名的 ”
>
> 步骤如下：👇🏻
>
> 

- [certbot 之前的文章](https://www.ruoduan.cn/%E4%BA%86%E4%B8%8D%E8%B5%B7%E7%9A%84certbot%E7%94%B3%E8%AF%B7%E5%85%8D%E8%B4%B9SSL%E8%AF%81%E4%B9%A6/)

#### 1. 申请

> `sudo certbot certonly  -d "*.ruoduan.cn" -d ruoduan.cn --manual --preferred-challenges dns-01  --server https://acme-v02.api.letsencrypt.org/directory`



#### 2. 操作

- 按照提示 一直 Enter Enter ~

#### 3. 设置 DNS TXT 记录

- 在操作第二部的时候会生成一个Txt 记录，去你的域名 DNS 添加一下哦
- 然后 Enter 验证就行了 
- 替换`nginx` 中的 ssl 配置文件
- `nginx -s reload`



#### 完
