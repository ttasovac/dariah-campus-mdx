import React from 'react'
import clsx from 'clsx'

import styles from './SearchBar.module.css'

const SearchBar = ({ className }) => (
  <form
    className={clsx(styles.searchBar, className)}
    onSubmit={event => {
      event.preventDefault()
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

export default SearchBar
