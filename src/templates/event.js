import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Head from 'components/Head/Head'

import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

const EventTemplate = ({ data }) => (
  <Page>
    <Head title="Event" />
    <Title>Event</Title>

    <h1>Index</h1>
    <MDXRenderer>{data.index.body}</MDXRenderer>

    <h1>About</h1>
    <MDXRenderer>{data.about.body}</MDXRenderer>

    <h1>Sessions</h1>
    {data.sessions.nodes.map(session => (
      <MDXRenderer>{session.body}</MDXRenderer>
    ))}
  </Page>
)

export default EventTemplate

export const query = graphql`
  query($indexId: String!, $aboutId: String!, $sessionIds: [String!]!) {
    index: mdx(id: { eq: $indexId }) {
      body
    }
    about: mdx(id: { eq: $aboutId }) {
      body
    }
    sessions: allMdx(filter: { id: { in: $sessionIds } }) {
      nodes {
        body
      }
    }
  }
`
