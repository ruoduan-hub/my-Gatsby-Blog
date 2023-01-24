import React, { useState } from 'react'
import { navigate } from 'gatsby'

import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch-dom'
import * as S from './styles/search.module.scss'

const searchClient = algoliasearch(
  'Y0TJ9RIKLI',
  '798b93a89d62f86e06d6b0ae26b021f6'
)

function Hit({ hit }) {
  return (
    <div
      onClick={() => {
        navigate(hit.slug)
      }}
    >
      <div className={S.Highlight}>
        <Highlight attribute="title" hit={hit} />
      </div>
      <div className={S.hitTitle}>{hit.title}</div>
      <div className={S.excerpt}>{hit.excerpt}</div>
    </div>
  )
}

const Search = () => {
  const [keyWord, setKeyWord] = useState(false)

  return (
    <div className={S.searchContent}>
      <InstantSearch searchClient={searchClient} indexName="blog">
        <SearchBox
          className={S.SearchBox}
          onChange={(e) => setKeyWord(e.target.value)}
          autoFocus
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
