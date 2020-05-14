---
title: "如何写好 Changelog"
date: 2020-05-14
tags: 记
comments: true
categories: 《记》
---


# 如何写好 Changelog

> 在工作中需要写很多项目文档，随着不断的迭代，内容也会不断的变化，时间一长，就很可能忘记之前在什么时候做过什么改动了，所以这个时候就需要文档的写作者保持更新 Changelog 来确保每一个协作者都在同一个步伐。


<br />

- 很多人认为更新日志好像是只有「写代码」才需要的一个文档，但是只要涉及到文档协同、对1个文档进行长期的迭代，我们都需要一个更新文档来记录历史变动，这样新的人进来就可以对整个来龙去脉有一个非常直观的了解。



## 什么是更新日志


> 那什么是更新日志呢？更新日志（Change Log）是一个由人工编辑，以时间为倒叙的列表。 这个列表记录所有版本的重大变动。



一个非常直观的案例 我们可以看下 社区比较优秀的框架 `[ant-design](https://github.com/ant-design/ant-design)` 他们是如何写的 [Antd-Changelog链接](https://github.com/ant-design/ant-design/blob/master/CHANGELOG.zh-CN.md)<br />
<br />可以看到在大型开源项目中 一个简洁明了、层次清晰的 `Changelog` 是非常重要的，还有一些 Emoji ～ 更加生动 哈哈～<br />


### 总结一下：
> 一份优秀的Changelog，应具备：



- [x] 给人而不是机器写的。记住，要说人话。
- [x] 快速跳转到任意段。所以采用markdown格式
- [x] 一个版本对应一个章节。/
- [x] 最新的版本在上，最老的在下面。
- [x] 所有日期采用’YYYY-MM-DD’这种规范。（例如北京奥运会的2008年8月8日是2008-08-08）这个是国际通用，任何语言 都能理解的，并且还被[xkcd](http://xkcd.com/1179/)推荐呢！
- [x] 标出来是否遵守[语义化版本格式](http://semver.org/lang/zh-CN/)
- [x] 每一个软件的版本必须：
- [x] 标明日期（要用上面说过的规范）
- [x] 标明分类（采用英文）。规范如下git：
- [x] ‘Added’ 添加的新功能
- [x] ‘Changed’ 功能变更
- [x] ‘Deprecated’ 不建议使用，未来会删掉
- [x] ‘Removed’ 之前不建议使用的功能，这次真的删掉了
- [x] ‘Fixed’ 改的bug
- [x] ‘Security’ 改的有关安全相关bug



- 另外关于命名规范，他也建议直接将更新日志命名为：`CHANGELOG.md`，注意大小写。
> `ISTORY.txt`, `HISTORY.md`, `History.md`, `NEWS.txt`, `NEWS.md`, `News.txt`, `RELEASES.txt`, `RELEASE.md`, `releases.md`<br />

- 这么多文件`name` 太不统一了 ⬆️
- 也有专门那么一群人定义了一份Changelog标准 [参考 keepachangelog.com](https://keepachangelog.com/zh-CN/1.0.0/)是一个致力于规范更新日志的项目.

<br />


### 完

---

> 本文部分参考网络侵删
> Author：ruoduan 
> [同步Blog](https://www.ruoduan.cn/%E5%A6%82%E4%BD%95%E5%86%99%E5%A5%BDChangelog/)



