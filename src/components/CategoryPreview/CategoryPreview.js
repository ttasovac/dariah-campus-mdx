import React from 'react'

import Image from 'components/Image/Image'
import PostsCount from 'components/PostsCount/PostsCount'
import ReadMoreLink from 'components/ReadMoreLink/ReadMoreLink'

import Card from 'elements/Card/Card'
import Heading from 'elements/Heading/Heading'
import Paragraph from 'elements/Paragraph/Paragraph'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'

import styles from './CategoryPreview.module.css'

const CategoryPreview = ({ description, image, name, posts, slug }) => {
  const path = createPath(getBasePath('category'), slug)

  return (
    <Card>
      <div className={styles.container}>
        {image && (
          <div className={styles.imageContainer}>
            <Image fluid={image.image.fluid} className={styles.image} />
          </div>
        )}
        <Card.Body>
          <Heading>
            <ReadMoreLink posts={posts} to={path}>
              {name}
            </ReadMoreLink>
          </Heading>
          <PostsCount posts={posts} />
          <Paragraph>{description}</Paragraph>
          <ReadMoreLink posts={posts} to={path} />
        </Card.Body>
      </div>
    </Card>
  )
}

export default CategoryPreview
