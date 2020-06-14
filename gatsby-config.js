module.exports = {
  // 设置个人信息
  siteMetadata: {
    title: `Ruoduan' Blog`,
    author: `Ruoduan`,
    description: `我的介绍...`,
    siteUrl: `https://github.com/Chad97`,
    keywords: "react, 前端, python, js, ",
    gitalkConfig: {
      //github api
      clientID: "0dd4bb9091d53a67d59a",
      clientSecret: "300d27b2a629b6ccfd197abecbf67774f3f9ddbb",
    },
    social: {
      github: `https://github.com/Chad97`,
      zhihu: `https://www.zhihu.com/people/ruoduan/activities`,
      weibo: `https://weibo.com/p/1005055024868417`,
      email: "z.ruoduan@gmail.com",
      twitter: `xxx`,
      aboutLike: ["Coding", "音乐", "吉他", "民谣", "游戏"],
      skill: [
        "Web前端开发工程师，Vue👌React👌Python👌Linux👌",
        "尝试过 ReactNative 出于兴趣，个人开发的话感觉好累，不过确实能快速迭代开发App",
        "ES5｜6｜7 |... 、 Typescript 、Nodejs, 关注并实践社区新提案",
        "Nginx、Linux、当然是部署我的各种项目咯，折腾 Docker + Python 真香（ps:为了抢张春节高铁票～）",
        "噢～， 对了 Gatsby + Graphql 它香爆啦～",
        "想了解更多，欢迎发邮件给我吧 =_=",
      ],
      myMusicList: [
        {
          src: "../music/玫瑰.mp3",
          title: "玫瑰 - ruoduan .cover 贰佰",
          description: "玫瑰你在哪里，你说你爱过的人都已经离去。",
        },
        {
          src: "../music/忽然2.0.mp3",
          title: "忽然 - ruoduan	.cover 李志",
          description:
            "幻想朝西的生活  幻想着你被害怕定格的角落最后，我一个人就越走越孤单",
        },
        {
          src: "../music/纸短情长.mp3",
          title: "纸短情长（粗糙版）- ruoduan	.cover 烟把儿",
          description: "岁月无法停留，流云的等候",
        },
        {
          src: "../music/南山南.m4a",
          title: "南山南 - ruoduan （指弹）   .cover 马頔",
          description: "他不再和谁谈论相逢的孤岛，因为心里早已荒无人烟",
        },
        {
          src: "../music/告白气球.m4a",
          title: "告白气球 - ruoduan （指弹）   .cover 周杰伦",
          description: "我手一杯，品尝你的美，留下唇印的嘴",
        },
      ],
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // 代码高亮度插件 注释：extensionDataDirectory 使用默认路径
          {
            resolve: `gatsby-remark-vscode`,
            // All options are optional. Defaults shown here.
            options: {
              colorTheme: "Dark+ (default dark)", // Read on for list of included themes. Also accepts object and function forms.
              wrapperClassName: "", // Additional class put on 'pre' tag. Also accepts function to set the class dynamically.
              injectStyles: true, // Injects (minimal) additional CSS for layout and scrolling
              extensions: [], // Extensions to download from the marketplace to provide more languages and themes
              // extensionDataDirectory: // Absolute path to the directory where extensions will be downloaded. Defaults to inside node_modules.
              //   path.resolve('/node_modules'),
              languageAliases: {}, // Map of custom/unknown language codes to standard/known language codes
              replaceColor: x => x, // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
              getLineClassName: ({
                // Function allowing dynamic setting of additional class names on individual lines
                content, //   - the string content of the line
                index, //   - the zero-based index of the line within the code fence
                language, //   - the language specified for the code fence
                codeFenceOptions, //   - any options set on the code fence alongside the language (more on this later)
              }) => "",
              logLevel: "error", // Set to 'warn' to debug if something looks wrong
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`, // 生成目录注入锚点
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ruoduan'Blog`,
        short_name: `Ruoduan Blog .`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/mylogo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
        // 百度统计站点ID https://tongji.baidu.com/
        siteId: "703da8aa602582927b9e3d44ea467963",
        // 配置统计脚本插入位置，默认值为 false, 表示插入到 body 中, 为 true 时插入脚本到 head 中
        head: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-layout`
  ],
}
