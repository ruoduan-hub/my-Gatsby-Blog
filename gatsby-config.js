const queries = require("./config/algolia-config")

module.exports = {
  // 设置个人信息
  siteMetadata: {
    title: `Ruoduan' Blog`,
    author: `Ruoduan`,
    description: `我的介绍...`,
    siteUrl: `https://www.ruoduan.cn`,
    keywords: "react, 前端, python, js, ",
    avatarImg: '../images/avatarImg.jpg',
    gitalkConfig: {
      //github api
      clientID: "0dd4bb9091d53a67d59a",
      clientSecret: "300d27b2a629b6ccfd197abecbf67774f3f9ddbb",
    },
    social: {
      github: `https://github.com/ruoduan-hub`,
      zhihu: `https://www.zhihu.com/people/ruoduan/activities`,
      juejin: `https://juejin.cn/user/2559318800733111/posts`,
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
          src: "../music/老男孩-(片段).m4a",
          title: "老男孩 - ruoduan .cover 筷子兄弟",
          description: "也许永远都不会跟她说出那句话 注定我要浪迹天涯 怎么能有牵挂。",
        },
        {
          src: "../music/我是真的爱上你-cover王杰.m4a",
          title: "我是真的爱上你 - ruoduan .cover 王杰",
          description: "你有一双会说话的眼睛 你有善解人意的心。",
        },
        {
          src: "../music/晴天-coverJay.m4a",
          title: "晴天 - ruoduan .cover 周杰伦",
          description: "刮风这天 我试过握着你手 但偏偏 雨渐渐 大到我看你不见。",
        },
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
      douyinlink: 'https://www.douyin.com/user/MS4wLjABAAAAfI8zw_OOjs8BNCdbVEjadn0mvib_BH8aZVlMEozfKt7tgufYvaxtzCT2Ik9OaYY_',
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
          // {
          //   resolve: `gatsby-remark-highlight-code`,
          //   options: {
          //     // terminal: 'ubuntu',
          //     // theme: 'dracula',
          //     // editable: false,
          //     // lineNumbers: true,
          //     terminal: 'carbon',
          //     theme: 'blackboard'
          //   },
          // },
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
            resolve: `gatsby-plugin-alias-imports`,
            options: {
              alias: {
                "@src": "src",
              },
              extensions: []
            }
          },
          // {
          //   resolve: `gatsby-remark-images`,
          //   options: {
          //     maxWidth: 590,
          //   },
          // },
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
        trackingId: `G-2MXR8XC5ZF`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  author: 'Ruoduan',
                  description: edge.node.excerpt,
                  categories: [edge.node.frontmatter.tags],
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `{
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    edges {
      node {
        excerpt
        html
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY年MM月DD日")
          tags
        }
      }
    }
  }
}`,
            output: "/rss.xml",
            title: "若端的博客网站 - Ruoduan's blog site",
          },
        ],
      },
    },
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
    // 配置mdx
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about`,
        path: `${__dirname}/src/pagex/about`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        name: `about`,
        path: `${__dirname}/src/pagex/about`,
      },
    },
    // 默认模板
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `default`,
        path: `${__dirname}/src/pagex/default`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        name: `default`,
        path: `${__dirname}/src/pagex/default`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `layout404`,
        path: `${__dirname}/src/pagex/404`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        name: `layout404`,
        path: `${__dirname}/src/pagex/404`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        // defaultLayouts: {
        //   default: require.resolve("./src/components/mdx-layout/DefLayout.js"),
        //   about: require.resolve("./src/components/mdx-layout/AboutLayout.js"),
        //   layout404: require.resolve("./src/components/mdx-layout/Layout404.js"),
        // },
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    `gatsby-plugin-sass`,
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
        // Tip: use Search API key with GATSBY_ prefix to access the service from within components
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
        settings: {
          // optional, any index settings
          // Note: by supplying settings, you will overwrite all existing settings on the index
        },
        enablePartialUpdates: false, // default: false
        matchFields: ["slug", "modified"], // Array<String> default: ['modified']
        concurrentQueries: true, // default: true
        skipIndexing: false, // default: false, useful for e.g. preview deploys or local development
        continueOnFailure: false, // default: false, don't fail the build if algolia indexing fails
      },
    },
    // 配置 sentry 监控错误
    {
      resolve: "gatsby-plugin-sentry",
      options: {
        dsn:
          "https://4fbce79e87204965940cc53ec287c210@o394392.ingest.sentry.io/5852479",
        // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
        environment: process.env.NODE_ENV,
        // enabled: (() =>
        //   ["production", "stage"].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
  ],
}
