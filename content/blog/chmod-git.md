---
title: 记 chmod -R 权限变更导致git大量变更
date: 2022-11-24
tags: 记
comments: true
categories: 记
---

### 缘起
> chmod 修改项目文件夹的权限以后，git status 发生了大量变化的文件。原因是 Git 不仅能够管理文件的版本，而且能够管理对文件的访问权限。
> Git对文件的访问权限的管理与配置选项core.filemode有关。core.filemode选项默认true，即区分文件的执行权限，校验Git的Index中和工作目录中的文件权限。

- 关闭git权限校验

```shell
  git config core.fileMode false
```
~~~