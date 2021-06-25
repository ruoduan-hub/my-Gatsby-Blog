import React from 'react'
import { navigate } from "gatsby"

import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Highlight,
} from "react-instantsearch-dom"
const searchClient = algoliasearch(
  "Y0TJ9RIKLI",
  "798b93a89d62f86e06d6b0ae26b021f6"
)

function Hit(props) {
  const { node } = props.hit

  const { fields, frontmatter, excerpt } = node
  return (
    <div>
      <div className="frontmatter-title">
        <Highlight attribute="title" hit={frontmatter.title} />
      </div>
      <div className="excerpt">
        <Highlight attribute="excerpt" hit={excerpt} />
      </div>
      <div
        onClick={() => {
          console.log(fields.slug)
          navigate(fields.slug)
        }}
        className="hit-price"
      >
        {frontmatter.title}
      </div>
    </div>
  )
}

const Search = () => (
  <div>
    <InstantSearch searchClient={searchClient} indexName="blog">
      <SearchBox />
      <Hits hitComponent={Hit} />
      <Pagination />
    </InstantSearch>
  </div>
)

export default Search
