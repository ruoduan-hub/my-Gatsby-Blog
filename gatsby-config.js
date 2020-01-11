module.exports = {
  // 设置个人信息
  siteMetadata: {
    title: `Ruoduan' Blog`,
    author: `Ruoduan`,
    description: `我的介绍...`,
    siteUrl: `https://github.com/Chad97`,
    gitalkConfig:{//github api
      clientID: 'fad2bb575a7f7c6bd704',
      clientSecret: '57f5ef5bb1704102ec4474ad83b524c2a4d14462'
    },
    social: {
      github: `https://github.com/Chad97`,
      zhihu: `https://www.zhihu.com/people/ruoduan/activities`,
      weibo: `https://weibo.com/p/1005055024868417`,
      email: 'z.ruoduan@gmail.com',
      twitter: `xxx`,
      aboutLike:[
        'Coding', '音乐', '吉他', '民谣','游戏'
      ],
      skill: [
        'web 前端开发工程师，Vue👌React👌Python👌Linux👌',
        '尝试过 ReactNative 出于兴趣，个人开发的话感觉好累，不过确实能快速迭代开发app',
        '不会python的前端不是好产品经理，会各种数据库的使用咯～ Nodejs 长时间不用 忘了大半',
        '代码洁癖 对脏代码 0 容忍, review — 喷子',
        'Nginx、Linux、当然是部署我的各种blog和项目咯，折腾 Docker + Python 真香（ps:为了抢张春节高铁票～）',
        'switch 塞尔达爆肝 ～, LOL 下水道 ___',
        '噢～， 对了 Gatsby + Graphql 它香爆拉～'
      ]
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
              colorTheme: 'Dark+ (default dark)', // Read on for list of included themes. Also accepts object and function forms.
              wrapperClassName: '',   // Additional class put on 'pre' tag. Also accepts function to set the class dynamically.
              injectStyles: true,     // Injects (minimal) additional CSS for layout and scrolling
              extensions: [],         // Extensions to download from the marketplace to provide more languages and themes
              // extensionDataDirectory: // Absolute path to the directory where extensions will be downloaded. Defaults to inside node_modules.
              //   path.resolve('/node_modules'),
              languageAliases: {},    // Map of custom/unknown language codes to standard/known language codes
              replaceColor: x => x,   // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
              getLineClassName: ({    // Function allowing dynamic setting of additional class names on individual lines
                content,              //   - the string content of the line
                index,                //   - the zero-based index of the line within the code fence
                language,             //   - the language specified for the code fence
                codeFenceOptions      //   - any options set on the code fence alongside the language (more on this later)
              }) => '',
              logLevel: 'error'       // Set to 'warn' to debug if something looks wrong
            }
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
        icon: `content/assets/mylogo.jpg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
