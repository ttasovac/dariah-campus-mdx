import React from 'react'
import Image from 'gatsby-image'

import Link from 'components/Link/Link'

import Card from 'elements/Card/Card'
import DateTime from 'elements/DateTime/DateTime'
import Heading from 'elements/Heading/Heading'
import Paragraph from 'elements/Paragraph/Paragraph'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'

import styles from './PostPreview.module.css'

const PostPreview = ({ excerpt, frontmatter }) => {
  const path = createPath(getBasePath('post'), frontmatter.slug)

  return (
    <Card>
      <Card.Body>
        <Heading>
          <Link to={path}>{frontmatter.title}</Link>
        </Heading>
        <DateTime>{frontmatter.date}</DateTime>
        <Paragraph>{frontmatter.abstract || excerpt}</Paragraph>
      </Card.Body>
      <Card.Footer>
        {frontmatter.authors.map(author => (
          <Image
            key={author.slug}
            className={styles.authorImage}
            fixed={author.avatar.image.fixed}
          />
        ))}
        <Link className={styles.readMoreLink} to={path}>
          Read more &rarr;
        </Link>
      </Card.Footer>
    </Card>
  )
}

export default PostPreview
