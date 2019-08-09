import React from 'react'
import {
  FaMicrophoneAlt,
  FaCameraRetro,
  FaLayerGroup,
  FaLink,
  FaVideo,
} from 'react-icons/fa'

import Image from 'components/Image/Image'
import Link from 'components/Link/Link'

import Card from 'elements/Card/Card'
import DateTime from 'elements/DateTime/DateTime'
import Heading from 'elements/Heading/Heading'
import Paragraph from 'elements/Paragraph/Paragraph'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'

import styles from './PostPreview.module.css'

const icons = {
  audio: FaMicrophoneAlt,
  images: FaCameraRetro,
  slides: FaLayerGroup,
  video: FaVideo,
  website: FaLink,
}

const PostPreview = ({ excerpt, frontmatter, next, previous }) => {
  const path = createPath(getBasePath('post'), frontmatter.slug)

  const ResourceTypeIcon = frontmatter.type
    ? icons[frontmatter.type.icon] || null
    : null

  return (
    <Card>
      <Card.Body>
        <Heading>
          <Link to={path}>
            {ResourceTypeIcon && (
              <ResourceTypeIcon
                color="var(--color-primary)"
                size="0.75em"
                style={{ marginRight: '1rem' }}
              />
            )}
            {frontmatter.title}
          </Link>
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
