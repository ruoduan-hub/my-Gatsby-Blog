---
title: sitemap
date: 2021-02-21
tags: 记
comments: true
categories: 记
---


# sitemap
> Sitemap 可方便网站管理员通知[搜索引擎](https://baike.baidu.com/item/搜索引擎/104812)他们网站上有哪些可供抓取的网页。最简单的 Sitemap 形式，就是[XML](https://baike.baidu.com/item/XML) 文件，在其中列出网站中的网址以及关于每个网址的其他元[数据](https://baike.baidu.com/item/数据/33305)（上次更新的时间、更改的频率以及相对于网站上其他网址的重要程度为何等），以便搜索引擎可以更加智能地抓取网站。



### 百度提交

[百度搜索资源平台](https://ziyuan.baidu.com/linksubmit/index)

### Google提交

[谷歌搜索平台](https://search.google.com/search-console)



### sitemap.xml

- `gatsby` 中生成

- 1. `npm install gatsby-plugin-sitemap` 安装网站地图插件

  2. Config 配置一下

     ```js
     // In your gatsby-config.js
     siteMetadata: {
       siteUrl: `https://www.example.com`,
     },
     plugins: [`gatsby-plugin-sitemap`]
     ```

     

- 然后在你的`public/` 文件夹下面就会有一个网站地图`sitemap.xml`文件

- 之后在百度和Google提交就可以了



> 其他技术栈可以通过爬虫网站生成 sitemap | 路由生成 等，提交