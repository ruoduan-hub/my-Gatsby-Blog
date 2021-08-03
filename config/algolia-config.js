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
          date(formatString: "YYYY-MM-DD")
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
      return data.pages.edges.map((item) => ({
        objectID: item.objectID.id,
        // alternatively read each one of the fields you want to use manually
        ...item.node.fields,
        ...item.node.frontmatter,
        excerpt: item.node.excerpt,
        rawMarkdownBody: item.node.rawMarkdownBody,
      }));
    }, // optional
    indexName: 'blog', // overrides main index name, optional
    settings: {
      // optional, any index settings
      // Note: by supplying settings, you will overwrite all existing settings on the index
    },
    matchFields: ['slug', 'modified'], // Array<String> overrides main match fields, optional
  },
];

module.exports = queries;