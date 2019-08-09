import React from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@stefanprobst/combobox'
import { Location } from '@reach/router'
import clsx from 'clsx'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'
import { useMatchedPosts } from 'utils/use-matched-posts'

import '@stefanprobst/combobox/styles.css'
import styles from './SearchBar.module.css'

const SearchBar = React.forwardRef(({ className }, ref) => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const searchResults = useMatchedPosts(searchTerm)

  const basePath = getBasePath('post')

  return (
    <Location>
      {({ navigate }) => (
        <Combobox
          className={clsx(styles.searchBar, className)}
          onSelect={(item, meta) => {
            const matchedPost = searchResults.find(post => post.id === meta)
            if (matchedPost && matchedPost.frontmatter.slug) {
              setSearchTerm('')
              navigate(createPath(basePath, matchedPost.frontmatter.slug))
            }
          }}
        >
          <ComboboxInput
            aria-label="Search"
            className={styles.searchBarInput}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            ref={ref}
            selectOnClick
            type="search"
            value={searchTerm}
          />
          <ComboboxPopover className={styles.searchPopover}>
            <ComboboxList
              aria-label="Search"
              persistSelection
              className={styles.searchResults}
            >
              {searchResults.map(post => (
                <ComboboxOption
                  key={post.id}
                  meta={post.id}
                  value={post.frontmatter.title}
                  className={styles.searchResult}
                />
              ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      )}
    </Location>
  )
})

export default SearchBar
