---
title: Shell-字符串替换生成模板文件
date: 2023-02-16
tags: Shell
categories: Shell
---


### 缘起
> 在构建 Build 的时候需要根据平台和环境写入配置文件, 需要写一个脚本来提供不同的模板,记于此

- 例如 👇🏻

```html
...
{{ base }}
...

替换

<base href="test/xxx/xx">
or
<base href="prod/xxx/xx">
```



模板文件: 



```html
... 略

{{base}}

.... 略
```





### 代码

可以使用 `shell` 的 `sed` 命令就行替换

```xml
sed "s/{{base}}/<base href=\"\/yhk\/\">/g" $filename > ./web/index.html
```



在当前文件替换修改加 `-i`   👉🏻   `sed -i "s/{{base}}/<base href=\"\/yhk\/\">/g" $filename`

但是在 `MacOS`中 不行 需使用 `sed -i '' "s/{{base}}/<base href=\"\/yhk\/\">/g" $filename`  原因 👇🏻

![image-20230216172557340](https://s2.loli.net/2023/02/16/qEaeTCgVoxR3Q52.png)



- **其他解决方法**

> 调整mac下sed的用法，使其与linux一致
> mac上安装gnu-sed

```yaml
brew install gnu-sed

alias sed=gsed
```

>  调整后两系统下sed的用法完全一致。

### 完
