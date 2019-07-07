import React from 'react'
import clsx from 'clsx'

import styles from './RelatedPosts.module.css'

const RelatedPosts = ({ className, posts }) => (
  <div className={clsx(styles.container, className)}>Related posts</div>
)

export default RelatedPosts
