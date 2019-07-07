import React from 'react'

import Head from 'components/Head/Head'

import Page from 'elements/Page/Page'

const PageTemplate = ({ children, pageContext }) => (
  <Page>
    <Head title={pageContext.frontmatter.title} />
    {children}
  </Page>
)

export default PageTemplate
