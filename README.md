## my gatsby 

🚀 基于 Gatsby 开发自己的 blog 


### 插件 🔥
- add gatsby-remark-vscode // 代码高亮插件
- add antd
- add typography-theme-github // Typography.js主题
- add office-ui-fabric-react // 微软的极简UI框架
- add gitalk //基于github开源评论系统
- add react-cplayer // react 音乐播放器
- add spark-md5 // 十六进制md5 为comment 系统 提供不超过50位的 主建


## 坑

- typeof window !== 'undefined' && <Cplayer />
> 组件中使用了 window 全局对象，build 时会报错，处理方式 判断window来渲染组件
