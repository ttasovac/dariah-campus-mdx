import React from 'react'

import CodeBlock from 'components/CodeBlock/CodeBlock'
import Link from 'components/Link/Link'

import Blockquote from 'elements/Blockquote/Blockquote'
import Heading from 'elements/Heading/Heading'
import LeadIn from 'elements/LeadIn/LeadIn'
import List from 'elements/List/List'
import Paragraph from 'elements/Paragraph/Paragraph'
import Title from 'elements/Title/Title'

const components = {
  a: Link,
  blockquote: Blockquote,
  code: CodeBlock,
  h1: Title,
  h2: LeadIn,
  h3: props => <Heading level="2" {...props} />,
  h4: props => <Heading level="3" {...props} />,
  h5: props => <Heading level="4" {...props} />,
  h6: props => <Heading level="5" {...props} />,
  ol: props => <List ordered {...props} />,
  p: Paragraph,
  ul: props => <List {...props} />,
  // wrapper: props => props.children,
}

export default components
