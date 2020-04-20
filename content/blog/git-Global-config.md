---
title: 记-Git 设置全局 ".gitignore"
date: 2020-04-20
tags: 记
categories: 记
---





### 缘起

> 每次换 IDE 编辑器 或者电脑系统 都会生成一些需要Git忽略的文件 每次去改项目的`.gitignore` 太麻烦 去设置一些 公共的配置放在全局



### 流程

- git config --global core.excludesfile '~/.gitignore'

> 生成全局`~/.gitignore`

- `vim .gitignore`

小栗子 🌰

```shell
.idea
.sonar
.DS_Store
```



### 删除库的冗余

`git rm --cached -r .idea/`



Ps:  https://www.gitignore.io/  生成`gitignore`

