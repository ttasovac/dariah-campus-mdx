import React from 'react'

import Container from 'elements/Container/Container'
import LeadIn from 'elements/LeadIn/LeadIn'
import Section from 'elements/Section/Section'
import Title from 'elements/Title/Title'

import FAQItems from 'data/faq.mdx'

const FAQ = () => (
  <Section>
    <Title>Frequently asked questions</Title>
    <LeadIn>Time is precious, we know</LeadIn>
    <Container size="small">
      <FAQItems />
    </Container>
  </Section>
)

export default FAQ
