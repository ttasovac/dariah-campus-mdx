import React from 'react'
import clsx from 'clsx'

import Image from 'components/Image/Image'
import Link from 'components/Link/Link'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'

import styles from './PostMetadata.module.css'

const getNames = (entities = [], basePath) =>
  entities.map((entity, i) => (
    <>
      {i ? ', ' : null}
      <Link key={entity.slug} to={createPath(basePath, entity.slug)}>
        {entity.name}
      </Link>
    </>
  ))

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
        <div>
          Written by {getNames(metadata.authors, getBasePath('author'))}
        </div>
        <time>{metadata.date}</time>
      </div>
    </div>
    <div className={styles.metadataRight}>
      <div>
        Source: {getNames(metadata.categories, getBasePath('category'))}
      </div>
      <div>Topics: {getNames(metadata.tags, getBasePath('tag'))}</div>
    </div>
  </div>
)

export default PostMetadata
