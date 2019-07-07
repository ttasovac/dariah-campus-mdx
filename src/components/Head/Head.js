import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'

const Head = ({ author, description, image, keywords, lang, title, type }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          description
          keywords
          lang
          siteUrl
          siteVerification {
            name
          }
          social {
            name
          }
          title
        }
      }
      logo: file(relativePath: { eq: "dariah-flower.png" }) {
        image: childImageSharp {
          fixed(width: 1500, height: 1500) {
            src
            width
            height
          }
        }
      }
    }
  `)

  const metadata = data.site.siteMetadata

  const mdAuthor = (author && author.name) || metadata.author
  const mdDescription = description || metadata.description
  const mdImage = image || data.logo.image.fixed
  const mdKeywords = keywords || metadata.keywords
  const mdLanguage = lang || metadata.lang
  const mdSiteTitle = (title && `${title} | `) + metadata.title
  const mdTitle = title | metadata.title

  const mdSiteTwitter =
    metadata.social.find(social => social.name === 'twitter') || {}
  const mdTwitter = (author && author.twitter) || mdSiteTwitter.key

  const googleSiteVerification =
    metadata.siteVerification.find(provider => provider.name === 'google') || {}

  return (
    <Location>
      {({ location }) => {
        const mdCanonicalUrl = metadata.siteUrl + location.pathname

        return (
          <Helmet>
            <html lang={mdLanguage} />

            <title>{mdSiteTitle}</title>

            <meta name="description" content={mdDescription} />

            <meta name="keywords" content={mdKeywords.join(', ')} />

            <meta name="author" content={mdAuthor} />

            <link rel="canonical" href={mdCanonicalUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={mdSiteTwitter} />
            <meta name="twitter:creator" content={mdTwitter} />

            <meta property="og:url" content={mdCanonicalUrl} />
            <meta property="og:title" content={mdTitle} />
            <meta property="og:description" content={mdDescription} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content={mdLanguage} />
            <meta property="og:site_name" content={metadata.title} />

            <meta
              name="google-site-verification"
              content={googleSiteVerification.key}
            />

            <meta property="og:image" content={mdImage.src} />
            <meta property="og:image:alt" content={mdImage.alt} />
            <meta property="og:image:height" content={mdImage.height} />
            <meta property="og:image:width" content={mdImage.width} />

            {/* {type === 'article' ? (
              <>
                <meta property="article:published_time" content="" />
                <meta property="article:author" content="" />
                <meta property="article:tag" content={tag} />
                <meta property="article:tag" content={anothertag} />
              </>
            ) : null} */}
          </Helmet>
        )
      }}
    </Location>
  )
}

Head.defaultProps = {
  type: 'website',
}

Head.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    twitter: PropTypes.string,
  }),
  description: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
}

export default Head
