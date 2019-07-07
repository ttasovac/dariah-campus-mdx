import React from 'react'

import Link from 'components/Link/Link'

import Container from 'elements/Container/Container'
import LeadIn from 'elements/LeadIn/LeadIn'
import Section from 'elements/Section/Section'
import Title from 'elements/Title/Title'

import styles from './FAQ.module.css'

const FAQ = ({ children }) => (
  <details className={styles.faq}>{children}</details>
)

const Question = ({ children }) => (
  <summary className={styles.question}>{children}</summary>
)

const Answer = ({ children }) => <div className={styles.answer}>{children}</div>

const FAQs = () => (
  <Section>
    <Title>Frequently asked questions</Title>
    <LeadIn>Time is precious, we know</LeadIn>
    <Container size="small">
      <FAQ>
        <Question>What is DARIAH?</Question>
        <Answer>
          <p>
            DARIAH is a pan-European infrastructure for arts and humanities
            scholars working with computational methods. It supports digital
            research as well as the teaching of digital research methods.
          </p>
          <p>
            To learn more, check out{' '}
            <Link to="https://www.dariah.eu/">dariah.eu</Link>.
          </p>
        </Answer>
      </FAQ>
      <FAQ>
        <Question>What is DARIAH-CAMPUS?</Question>
        <Answer>
          <p>
            DARIAH-Campus is a pilot project exploring different ways of
            capturing and consolidating DARIAH learning resources. It is being
            developed in the context of a H2020-funded project{' '}
            <Link to="https://www.dariah.eu/activities/projects-and-affiliations/desir/">
              DESIR
            </Link>
            .
          </p>
          <p>
            Being a pilot project, DESIR-CAMPUS is not yet ready for an official
            release. We will be evaluating the project in the coming months and
            make a decision on how to proceed.
          </p>
        </Answer>
      </FAQ>
      <FAQ>
        <Question>Is DARIAH-CAMPUS exhaustive?</Question>
        <Answer>
          <p>
            Definitely not. It’s a pilot project and therefore limited in scope.
            If you can think of ways to contribute or if you know of resources
            that should be represented on DARIAH-CAMPUS, feel free to get in
            touch.
          </p>
        </Answer>
      </FAQ>
      <FAQ>
        <Question>How to get in touch?</Question>
        <Answer>
          <p>
            The easiest way for you to get in touch with us is by using the{' '}
            <Link to="https://www.dariah.eu/helpdesk/">DARIAH Help Desk</Link>.
            Make sure you select “Education and training” as the subject of your
            message.
          </p>
        </Answer>
      </FAQ>
      <FAQ>
        <Question>What is DARIAH-CAMPUS powered by?</Question>
        <Answer>
          <p>
            In addition to being powered by an enthusiasm for research
            infrastructures and an awareness of the importance of training and
            education for building sustainable RIs, DARIAH-CAMPUS is a{' '}
            <Link to="https://www.gatsbyjs.org">Gatsby</Link>-powered static
            website hosted on <Link to="https://www.netlify.com">Netlify</Link>.
          </p>
          <p>More extensive documentation will be forthcoming.</p>
        </Answer>
      </FAQ>
    </Container>
  </Section>
)

export default FAQs
