import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import clsx from 'clsx'
import { FaPlayCircle } from 'react-icons/fa'

import Lightbox from 'components/Lightbox/Lightbox'
import Youtube from 'components/Youtube/Youtube'

import Card from 'elements/Card/Card'
import Heading from 'elements/Heading/Heading'
import LeadIn from 'elements/LeadIn/LeadIn'
import Section from 'elements/Section/Section'
import Title from 'elements/Title/Title'

import styles from './TrainingVideos.module.css'

const TrainingVideos = ({ className }) => {
  const images = useStaticQuery(graphql`
    query {
      romary: file(relativePath: { eq: "DESIR/laurent-romary.jpg" }) {
        image: childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      edmond: file(relativePath: { eq: "DESIR/jennifer-edmond.jpg" }) {
        image: childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      fischer: file(relativePath: { eq: "DESIR/frank-fischer.jpg" }) {
        image: childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <Section className={clsx(styles.section, className)}>
      <Title>Why training and education?</Title>
      <LeadIn>
        Some thoughts on why training and education matter so much for a
        research infrastructure such as DARIAH
      </LeadIn>
      <div className={styles.container}>
        <Lightbox
          overlay={<Youtube id="OqYJNUmhJzw" />}
          className={styles.item}
        >
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <Image
                fluid={images.romary.image.fluid}
                className={styles.cardImage}
              />
              <FaPlayCircle color="var(--color-primary)" size="3em" />
              <Heading className={styles.cardHeading}>Laurent Romary</Heading>
              <div className={styles.cardText}>Former DARIAH Director</div>
            </Card.Body>
          </Card>
        </Lightbox>
        <Lightbox
          overlay={<Youtube id="iwz0uhEhtg4" />}
          className={styles.item}
        >
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <Image
                fluid={images.edmond.image.fluid}
                className={styles.cardImage}
              />
              <FaPlayCircle color="var(--color-primary)" size="3em" />
              <Heading className={styles.cardHeading}>Jennifer Edmond</Heading>
              <div className={styles.cardText}>DARIAH Director</div>
            </Card.Body>
          </Card>
        </Lightbox>
        <Lightbox
          overlay={<Youtube id="soL0itkLYpk" />}
          className={styles.item}
        >
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <Image
                fluid={images.fischer.image.fluid}
                className={styles.cardImage}
              />
              <FaPlayCircle color="var(--color-primary)" size="3em" />
              <Heading className={styles.cardHeading}>Frank Fischer</Heading>
              <div className={styles.cardText}>DARIAH Director</div>
            </Card.Body>
          </Card>
        </Lightbox>
      </div>
    </Section>
  )
}

export default TrainingVideos
