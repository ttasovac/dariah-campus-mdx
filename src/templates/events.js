import React from 'react'
// import { graphql } from 'gatsby'

import Head from 'components/Head/Head'
import Link from 'components/Link/Link'

import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

import { createPath } from 'utils/create-path'
import { getBasePath } from 'utils/get-base-path'

const EventTemplate = ({ pageContext }) => {
  const basePath = getBasePath('event')

  return (
    <Page>
      <Head title="Events" />
      <Title>Events</Title>

      <ul>
        {Object.entries(pageContext).map(([slug, { title }]) => (
          <h4>
            <Link to={createPath(basePath, slug)}>{title}</Link>
          </h4>
        ))}
      </ul>
    </Page>
  )
}

export default EventTemplate
