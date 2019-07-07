import React from 'react'
import Image from 'gatsby-image'
import clsx from 'clsx'

import styles from './PostMetadata.module.css'

const getNames = (entities = []) =>
  entities.map(entity => entity.name).join(', ')

const PostMetadata = ({ className, metadata }) => (
  <div className={clsx(styles.metadata, className)}>
    <div className={styles.metadataLeft}>
      <div className={styles.metadataImageContainer}>
        {metadata.authors &&
          metadata.authors.map(author =>
            author.avatar ? (
              <Image
                key={author.id}
                className={styles.metadataImage}
                fixed={author.avatar.image.fixed}
              />
            ) : null
          )}
      </div>
      <div>
        <div>Written by {getNames(metadata.authors)}</div>
        <time>{metadata.date}</time>
      </div>
    </div>
    <div className={styles.metadataRight}>
      <div>Source: {getNames(metadata.categories)}</div>
      <div>Topics: {getNames(metadata.tags)}</div>
    </div>
  </div>
)

export default PostMetadata
