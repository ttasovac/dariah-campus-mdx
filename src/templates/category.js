import React from 'react'
import { graphql } from 'gatsby'

import Head from 'components/Head/Head'
import Pagination from 'components/Pagination/Pagination'
import PostPreview from 'components/PostPreview/PostPreview'

import Grid from 'elements/Grid/Grid'
import LeadIn from 'elements/LeadIn/LeadIn'
import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

const CategoryTemplate = ({ data }) => (
  <Page>
    <Head title={`Posts in ${data.category.name}`} />
    <Title>Source: {data.category.name}</Title>
    <LeadIn>{data.category.description}</LeadIn>
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
    <Pagination
      path="category"
      slug={data.category.slug}
      {...data.posts.pageInfo}
    />
  </Page>
)

export default CategoryTemplate

export const query = graphql`
  query($slug: String!, $skip: Int!, $limit: Int!) {
    posts: allMdx(
      limit: $limit
      filter: {
        frontmatter: { categories: { elemMatch: { slug: { eq: $slug } } } }
      }
      skip: $skip
      sort: { fields: [frontmatter___isoDate], order: [DESC] }
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
    category(slug: { eq: $slug }) {
      description
      name
      slug
    }
  }
`
