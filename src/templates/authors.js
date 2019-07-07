import React from 'react'
import { graphql } from 'gatsby'

import AuthorPreview from 'components/AuthorPreview/AuthorPreview'
import Head from 'components/Head/Head'
import Pagination from 'components/Pagination/Pagination'

import Grid from 'elements/Grid/Grid'
import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

const AuthorsTemplate = ({ data }) => (
  <Page>
    <Head title="Authors" />
    <Title>Authors</Title>
    <Grid>
      {data.authors.nodes.map((author, i, authors) => (
        <AuthorPreview
          key={author.id}
          {...author}
          previous={authors[i - 1]}
          next={authors[i + 1]}
        />
      ))}
    </Grid>
    <Pagination path="authors" {...data.authors.pageInfo} />
  </Page>
)

export default AuthorsTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    authors: allAuthor(
      limit: $limit
      skip: $skip
      sort: { fields: [name], order: [ASC] }
    ) {
      nodes {
        avatar {
          image: childImageSharp {
            fixed(width: 36, height: 36) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
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
