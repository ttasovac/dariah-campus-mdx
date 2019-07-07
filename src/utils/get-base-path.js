import { graphql, useStaticQuery } from 'gatsby'

export const getBasePath = path => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          paths {
            name
            path
          }
        }
      }
    }
  `)

  const route = data.site.siteMetadata.paths.find(route => route.name === path)

  if (!route) {
    throw new Error(`No route path found for ${path}.`)
  }

  return route.path
}
