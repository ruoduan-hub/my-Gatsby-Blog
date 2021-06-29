import React, { useState } from "react"
import { navigate } from "gatsby"

import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom"
import S from "./styles/search.module.scss"

const searchClient = algoliasearch(
  "Y0TJ9RIKLI",
  "798b93a89d62f86e06d6b0ae26b021f6"
)

function Hit({ hit }) {
  const { node } = hit

  const { fields, frontmatter, excerpt } = node
  return (
    <div>
    <div className={S.Highlight}>
      <Highlight attribute="title" hit={hit} />
    
    </div>
      <div
        onClick={() => {
          console.log(fields.slug)
          navigate(fields.slug)
        }}
        className={S.hitTitle}
      >
        {frontmatter.title}
      </div>
      <div className={S.excerpt}>
        {excerpt}
      </div>
    </div>
  )
}

const Search = () => {
  const [keyWord, setKeyWord] = useState(false)

  return (
    <div className={S.searchContent}>
      <InstantSearch searchClient={searchClient} indexName="blog">
        <SearchBox
          onChange={(e) => setKeyWord(e.target.value)}
        />

        {!!keyWord.length && (
          <div className={S.list}>
            <Hits className={S.hits} hitComponent={Hit} />
          </div>
        )}
      </InstantSearch>
    </div>
  )
}

export default Search
