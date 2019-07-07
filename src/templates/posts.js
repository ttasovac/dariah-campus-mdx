import React from 'react'
import { graphql } from 'gatsby'

import Head from 'components/Head/Head'
import Pagination from 'components/Pagination/Pagination'
import PostPreview from 'components/PostPreview/PostPreview'

import Grid from 'elements/Grid/Grid'
import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

const PostsTemplate = ({ data }) => (
  <Page>
    <Head title="Resources" />
    <Title>Resources</Title>
    <Grid>
      {data.posts.nodes.map((post, i, posts) => (
        <PostPreview
          key={post.id}
          {...post}
          previous={posts[i - 1]}
          next={posts[i + 1]}
        />
      ))}
    </Grid>
    <Pagination path="posts" {...data.posts.pageInfo} />
  </Page>
)

export default PostsTemplate

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    posts: allMdx(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___isoDate], order: [DESC] }
    ) {
      nodes {
        excerpt
        frontmatter {
          abstract
          authors {
            slug
            avatar {
              image: childImageSharp {
                fixed(width: 36, height: 36) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          date
          isoDate
          slug
          title
        }
        id
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
