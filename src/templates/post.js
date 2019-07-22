import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Head from 'components/Head/Head'
import { PostLink } from 'components/Link/Link'
import PostMetadata from 'components/PostMetadata/PostMetadata'
// import PreviousNextPosts from 'components/PreviousNextPosts/PreviousNextPosts'
import RelatedPosts from 'components/RelatedPosts/RelatedPosts'
import ShareButtons from 'components/ShareButtons/ShareButtons'
import TOC from 'components/TOC/TOC'

import Container from 'elements/Container/Container'
import Heading from 'elements/Heading/Heading'
import Page from 'elements/Page/Page'
import Title from 'elements/Title/Title'

import components from 'components'

// FIXME: Decide heading levels in posts, i.e. do we need a subtitle (h2)
const postComponents = {
  ...components,
  a: props => <PostLink {...props} />,
  h2: props => <Heading level="1" {...props} />,
}

const PostTemplate = ({ data }) => (
  <Page>
    <Head
      lang={data.post.frontmatter.lang}
      title={data.post.frontmatter.title}
      type="article"
    />
    <Container size="small">
      <Title>{data.post.frontmatter.title}</Title>
      <PostMetadata metadata={data.post.frontmatter} />
      {data.post.frontmatter.toc && <TOC headings={data.post.headings} />}
      <article>
        <MDXProvider components={postComponents}>
          <MDXRenderer>{data.post.body}</MDXRenderer>
        </MDXProvider>
      </article>
      <ShareButtons metadata={data.post.frontmatter} />
      {/* <PreviousNextPosts /> */}
      <RelatedPosts
        byCategory={data.postsRelatedByCategory}
        byTag={postsRelatedByTag}
      />
    </Container>
  </Page>
)

export default PostTemplate

export const query = graphql`
  query($categories: [String!]!, $id: String!, tags: [String!]!) {
    post: mdx(id: { eq: $id }) {
      body
      frontmatter {
        authors {
          name
          avatar {
            image: childImageSharp {
              fixed(width: 36, height: 36) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        categories {
          name
          slug
        }
        date
        isoDate
        lang
        tags {
          name
          slug
        }
        title
        toc
      }
      headings {
        value
        depth
      }
      id
    }
    postsRelatedByCategory: allMdx(
      filter: {
        id: { ne: $id }
        frontmatter: { categories: { elemMatch: { slug: { in: $categories } } } }
      }
      limit: 5
    ) {
      nodes {
        frontmatter {
          slug
          title
        }
        id
      }
    }
    postsRelatedByTag: allMdx(
      filter: {
        id: { ne: $id }
        frontmatter: { categories: { elemMatch: { slug: { in: $categories } } } }
      }
      limit: 5
    ) {
      nodes {
        frontmatter {
          slug
          title
        }
        id
      }
    }
  }
`
