const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagsIndex = path.resolve(`./src/templates/tags-index.js`)
  const homeIndex = path.resolve(`./src/templates/blog-index.js`)


  const result = await graphql(
    `{
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tags
        }
      }
    }
  }
}`
  )

  if (result.errors) {
    throw result.errors
  }

  // 获取md数据
  const posts = result.data.allMarkdownRemark.edges
  // 创建详情页
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create blog post list pages
  const postsPerPage = 8
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: homeIndex,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // 创建标签过滤后的首页
  posts.forEach((tags, index) => {
    createPage({
      path: `/tags/${tags.node.frontmatter.tags}`,
      component: tagsIndex,
      context: {
        tags: tags.node.frontmatter.tags, // 模版传餐 把标签字段传过去
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
// 用到全局 window 等 要在这里声明
exports.onCreateWebpackConfig = ({
  getConfig,
  stage,
  actions,
  plugins,
  loaders,
}) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-cplayer/,
            use: loaders.null(),
          },
        ],
      },
    })
  }

  if (stage === "build-javascript") {
    const currentConfig = getConfig()

    // sanity check so we don't access undefined
    if (
      currentConfig.optimization &&
      currentConfig.optimization.minimizer &&
      currentConfig.optimization.minimizer.length
    ) {
      // replace instance of TerserPlugin with new one with custom options
      currentConfig.optimization.minimizer = currentConfig.optimization.minimizer.map(
        plugin => {
          if (plugin.constructor.name !== `TerserPlugin`) {
            return plugin
          }

          return plugins.minifyJs({
            terserOptions: {
              compress: {
                // ecma: 5,
                // pure_funcs: [`console.log`],
                drop_console: true,
              },
            },
          })
        }
      )

      actions.replaceWebpackConfig(currentConfig)
    }
  }
}
