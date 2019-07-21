import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import clsx from 'clsx'

import LeadIn from 'elements/LeadIn/LeadIn'
import Section from 'elements/Section/Section'
import Title from 'elements/Title/Title'

import styles from './Help.module.css'

const Help = ({ className }) => {
  const { authors } = useStaticQuery(graphql`
    query {
      authors: allAuthor(
        filter: { slug: { in: ["debs", "erzsebet", "marco", "toma"] } }
        sort: { fields: [slug] }
      ) {
        nodes {
          avatar {
            image: childImageSharp {
              fixed(width: 86, height: 86) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
          id
          name
          title
        }
      }
    }
  `)

  return (
    <Section className={clsx(styles.section, className)}>
      <Title>We are here to help</Title>
      <LeadIn>
        Our DARIAH-Campus team is just an email away and ready to answer your
        questions
      </LeadIn>
      <div className={styles.container}>
        {authors.nodes.map(author => (
          <div key={author.id} className={styles.author}>
            <Image
              fixed={author.avatar.image.fixed}
              className={styles.authorAvatar}
            />
            <strong className={styles.authorName}>{author.name}</strong>
            <div className={styles.authorTitle}>{author.title}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Help
