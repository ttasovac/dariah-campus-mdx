import React from 'react'
import clsx from 'clsx'

// import { findPostsByTitle } from 'utils/find-posts-by-title'

import styles from './SearchBar.module.css'

const SearchBar = ({ className }) => {
  // const [searchTerm, setSearchTerm] = React.useState('')

  // const searchResults = findPostsByTitle(searchTerm)

  return (
    <form
      className={clsx(styles.searchBar, className)}
      onSubmit={event => {
        event.preventDefault()
        // setSearchTerm(event.target.value)
      }}
    >
      <label className={styles.searchBarLabel} htmlFor="searchbar">
        <input
          className={styles.searchBarInput}
          id="searchbar"
          placeholder="Search..."
          type="search"
        />
      </label>
    </form>
  )
}

export default SearchBar
