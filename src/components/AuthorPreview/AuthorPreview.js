import React from 'react'
import Image from 'gatsby-image'

import PostsCount from 'components/PostsCount/PostsCount'
import ReadMoreLink from 'components/ReadMoreLink/ReadMoreLink'

import Card from 'elements/Card/Card'
import Heading from 'elements/Heading/Heading'
import Paragraph from 'elements/Paragraph/Paragraph'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'

import styles from './AuthorPreview.module.css'

const AuthorPreview = ({ avatar, description, name, posts, slug }) => {
  const path = createPath(getBasePath('author'), slug)

  return (
    <Card>
      <Card.Body>
        <Heading>
          <ReadMoreLink posts={posts} to={path}>
            {name}
          </ReadMoreLink>
        </Heading>
        <PostsCount posts={posts} />
        <Paragraph>{description}</Paragraph>
        {avatar && (
          <Image
            style={{
              position: 'absolute',
              top: 'var(--padding-huge)',
              right: 'var(--padding-huge)',
            }}
            className={styles.authorImage}
            fixed={avatar.image.fixed}
          />
        )}
        <ReadMoreLink posts={posts} to={path} />
      </Card.Body>
    </Card>
  )
}

export default AuthorPreview
