## my gatsby 

🚀 基于 Gatsby 开发自己的 blog 


### 插件 🔥
- gatsby-remark-vscode // 代码高亮插件
- antd // 蚂蚁金服框架
- typography-theme-github // Typography.js主题
- office-ui-fabric-react // 微软的极简UI框架
- gitalk //基于github开源评论系统
- react-cplayer // react 音乐播放器
- spark-md5 // 十六进制md5 为comment 系统 提供不超过50位的 主键
- netlify-cms-app // netlify 自动化发布部署


## 坑

- typeof window !== 'undefined' && <Cplayer />
> 组件中使用了 window 全局对象，build 时会报错，处理方式 判断window来渲染组件
