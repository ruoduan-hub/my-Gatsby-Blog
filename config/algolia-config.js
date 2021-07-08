require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});


const myQuery = `{
  pages: allMarkdownRemark {
    edges {
      objectID: node {
				id
      }
      node {
        fields {
          slug
        }
        frontmatter {
          title
        }
        excerpt
        rawMarkdownBody
      }
    }
  }
}`;

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => {
      const list = [...data.pages.edges]
      list.map(item => item.objectID = item.objectID.id)
      return list
    }, // optional
    indexName: 'blog', // overrides main index name, optional
    settings: {
      // optional, any index settings
      // Note: by supplying settings, you will overwrite all existing settings on the index
    },
    matchFields: ['slug', 'modified'], // Array<String> overrides main match fields, optional
  },
];

module.exports = {
    queries
}