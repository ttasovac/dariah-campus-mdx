import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Layout from 'components/Layout/Layout'

import components from 'components'

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
