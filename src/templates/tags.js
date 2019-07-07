import React from 'react'
import { graphql } from 'gatsby'

import Head from 'components/Head/Head'
import Pagination from 'components/Pagination/Pagination'
import TagPreview from 'components/TagPreview/TagPreview'

import Grid from 'elements/Grid/Grid'
import LeadIn from 'elements/LeadIn/LeadIn'
import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

const TagsTemplate = ({ data }) => (
  <Page>
    <Head title="Topics" />
    <Title>Interested in particular topics?</Title>
    <LeadIn>Browse learning resources based on their topic</LeadIn>
    <Grid>
      {data.tags.nodes.map((tag, i, tags) => (
        <TagPreview
          key={tag.id}
          {...tag}
          previous={tags[i - 1]}
          next={tags[i + 1]}
        />
      ))}
    </Grid>
    <Pagination path="tags" {...data.tags.pageInfo} />
  </Page>
)

export default TagsTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    tags: allTag(
      limit: $limit
      skip: $skip
      sort: { fields: [name], order: [ASC] }
    ) {
      nodes {
        description
        id
        name
        posts {
          id
        }
        slug
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
      }
    }
  }
`
