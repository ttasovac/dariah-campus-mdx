import React from 'react'
import clsx from 'clsx'

import Link from 'components/Link/Link'

import Heading from 'elements/Heading/Heading'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'

import styles from './RelatedPosts.module.css'

const RELATED_POSTS_COUNT = 4

const pick = (posts, n) => {
  if (posts.length < n - 1) {
    return posts
  }

  const picked = []
  while (picked.length < n - 1) {
    picked.push(posts[Math.floor(Math.random() * posts.length)])
  }

  return picked
}

const RelatedPosts = ({ byCategory, byTag, className }) => {
  const related = pick([...byCategory, ...byTag], RELATED_POSTS_COUNT)

  if (!related.length) {
    return null
  }

  return (
    <div className={clsx(styles.container, className)}>
      <Heading>Related posts</Heading>
      <ul className={styles.relatedPosts}>
        {related.map(post => (
          <li className={styles.relatedPost} key={post.id}>
            <Link to={createPath(getBasePath('post'), post.frontmatter.slug)}>
              &rarr; {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedPosts
