import React from 'react'
import { graphql } from 'gatsby'

import Head from 'components/Head/Head'
import Pagination from 'components/Pagination/Pagination'
import PostPreview from 'components/PostPreview/PostPreview'

import Grid from 'elements/Grid/Grid'
import LeadIn from 'elements/LeadIn/LeadIn'
import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

const TagTemplate = ({ data }) => (
  <Page>
    <Head title={`Posts tagged ${data.tag.name}`} />
    <Title>Topic: {data.tag.name}</Title>
    <LeadIn>{data.tag.description}</LeadIn>
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
    <Pagination path="tag" slug={data.tag.slug} {...data.posts.pageInfo} />
  </Page>
)

export default TagTemplate

export const query = graphql`
  query($slug: String!, $skip: Int!, $limit: Int!) {
    posts: allMdx(
      limit: $limit
      filter: {
        fileInfo: { sourceInstanceName: { eq: "posts" } }
        frontmatter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      }
      skip: $skip
      sort: {
        fields: [frontmatter___isoDate, frontmatter___title]
        order: [DESC, ASC]
      }
    ) {
      nodes {
        excerpt
        frontmatter {
          abstract
          authors {
            name
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
    tag(slug: { eq: $slug }) {
      description
      name
      slug
    }
  }
`
