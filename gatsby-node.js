const path = require('path')
const { defaultFieldResolver } = require('gatsby/graphql')
const truncate = require('lodash.truncate')

const { createPath } = require('./src/utils/create-path')
const { range } = require('./src/utils/range')
const { slugify } = require('./src/utils/slugify')

const POSTS_PER_PAGE = 10

exports.createSchemaCustomization = ({ actions }) => {
  actions.createFieldExtension({
    name: 'defaultValue',
    args: {
      value: {
        type: 'String!',
        defaultValue: '',
      },
      values: {
        type: '[String!]!',
        defaultValue: [],
      },
    },
    extend(options, fieldConfig) {
      const defaultValue = options.value || options.values
      const resolver = fieldConfig.resolve || defaultFieldResolver
      return {
        resolve(source, args, context, info) {
          const fieldValue = resolver(source, args, context, info)
          return fieldValue != null ? fieldValue : defaultValue
        },
      }
    },
  })
  actions.createFieldExtension({
    name: 'fileInfo',
    extend() {
      return {
        type: 'FileInfo',
        resolve(source, args, context, info) {
          const parentFileNode = context.nodeModel.getNodeById({
            id: source.parent,
          })
          // const parentFileNode = context.nodeModel.findRootNodeAncestor(
          //   source,
          //   node => node.internal && node.internal.type === 'File'
          // )
          return parentFileNode
            ? {
                birthTime: parentFileNode.birthTime,
                mtime: parentFileNode.mtime,
                name: parentFileNode.name,
                relativePath: parentFileNode.relativePath,
                relativeDirectory: parentFileNode.relativeDirectory,
                sourceInstanceName: parentFileNode.sourceInstanceName,
              }
            : null
        },
      }
    },
  })
  actions.createFieldExtension({
    name: 'slug',
    args: {
      from: 'String!',
    },
    extend(options, fieldConfig) {
      const resolver = fieldConfig.resolve || defaultFieldResolver
      return {
        resolve(source, args, context, info) {
          const fieldValue = resolver(source, args, context, info)
          return fieldValue || slugify(source[options.from])
        },
      }
    },
  })
  actions.createFieldExtension({
    name: 'truncate',
    args: {
      characters: 'Int!',
    },
    extend(options, fieldConfig) {
      const resolver = fieldConfig.resolve || defaultFieldResolver
      return {
        resolve(source, args, context, info) {
          const fieldValue = resolver(source, args, context, info)
          return truncate(fieldValue, {
            length: options.characters,
            separator: ' ',
          })
        },
      }
    },
  })

  actions.createTypes(`
    type SiteRoute {
      displayName: String
      name: String
      path: String
      top: Boolean
    }

    type SiteSearchVerification {
      key: String
      name: String
    }

    type SiteSocial {
      key: String
      name: String
      url: String
    }

    type SiteMetadata {
      author: String
      description: String
      email: String
      keywords: [String]
      lang: String
      paths: [SiteRoute]
      publishedAt: Date
      siteUrl: String!
      siteVerification: [SiteSearchVerification]
      social: [SiteSocial]
      title: String
      url: String
    }

    type Site implements Node @dontInfer {
      buildTime: Date
      pathPrefix: String
      siteMetadata: SiteMetadata
    }

    type SitePage implements Node @dontInfer {
      path: String!
    }

    type SitePlugin implements Node @dontInfer {
      id: ID!
    }

    type Author implements Node @dontInfer {
      avatar: File @fileByRelativePath
      description: String
      email: String
      name: String!
      posts: [Mdx] @link(by: "frontmatter.authors.slug", from: "slug")
      slug: String! @slug(from: "name")
      title: String
      twitter: String
    }

    type Category implements Node @dontInfer {
      description: String
      name: String!
      image: File @fileByRelativePath
      posts: [Mdx] @link(by: "frontmatter.categories.slug", from: "slug")
      slug: String! @slug(from: "name")
    }

    type Tag implements Node @dontInfer {
      description: String
      name: String!
      posts: [Mdx] @link(by: "frontmatter.tags.slug", from: "slug")
      slug: String! @slug(from: "name")
    }

    type License implements Node @dontInfer {
      name: String
      url: String
    }

    type Resource implements Node @dontInfer {
      name: String
      icon: String
    }

    type Frontmatter {
      abstract: String @truncate(characters: 140)
      authors: [Author!] @defaultValue(values: ["dariah"]) @link(by: "slug")
      categories: [Category!] @link(by: "slug")
      date: Date @dateformat(formatString: "MMM, DD YYYY")
      # dateModified: Date @fileInfo @dateformat(formatString: "MMM, DD YYYY") @proxy(from: "mtime")
      domain: String @defaultValue(value: "Social Sciences and Humanities")
      featuredImage: File @fileByRelativePath
      isoDate: Date @proxy(from: "date")
      lang: String @defaultValue(value: "en")
      license: License @defaultValue(value: "CCBY 4.0") @link(by: "name")
      pid: ID
      slug: String @slug(from: "title")
      tags: [Tag!] @link(by: "slug")
      """ one of ["Data managers", "Domain researchers", "Data service engineers", "Data scientists/analysts"] """
      targetGroup: String
      title: String!
      toc: Boolean
      type: Resource @link(by: "name")
      version: Float
    }

    type Mdx implements Node {
      fileInfo: FileInfo @fileInfo
      frontmatter: Frontmatter
    }

    type FileInfo {
      birthTime: Date
      mtime: Date
      name: String
      relativeDirectory: String!
      relativePath: String!
      sourceInstanceName: String!
    }
  `)
}

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    query {
      posts: allMdx(
        filter: { fileInfo: { sourceInstanceName: { eq: "posts" } } }
        sort: {
          fields: [frontmatter___isoDate, frontmatter___title]
          order: [DESC, ASC]
        }
      ) {
        count: totalCount
        nodes {
          id
          frontmatter {
            categories {
              slug
            }
            slug
            tags {
              slug
            }
          }
        }
        byAuthor: group(field: frontmatter___authors___slug) {
          count: totalCount
          slug: fieldValue
        }
        byCategory: group(field: frontmatter___categories___slug) {
          count: totalCount
          slug: fieldValue
        }
        byTag: group(field: frontmatter___tags___slug) {
          count: totalCount
          slug: fieldValue
        }
      }
      authors: allAuthor(sort: { fields: [name], order: [ASC] }) {
        count: totalCount
      }
      categories: allCategory(sort: { fields: [name], order: [ASC] }) {
        count: totalCount
      }
      tags: allTag(sort: { fields: [name], order: [ASC] }) {
        count: totalCount
      }
      site {
        siteMetadata {
          paths {
            name
            path
          }
        }
      }
      events: allMdx(
        filter: { fileInfo: { sourceInstanceName: { eq: "events" } } }
      ) {
        group(field: fileInfo___relativeDirectory) {
          directory: fieldValue
          nodes {
            id
            fileInfo {
              name
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  const { paths } = data.site.siteMetadata

  const posts = data.posts.nodes
  const postsBasePath = paths.find(route => route.name === 'post').path
  posts.forEach(({ id, frontmatter }) => {
    actions.createPage({
      path: createPath(postsBasePath, frontmatter.slug),
      component: path.resolve('./src/templates/post.js'),
      context: {
        categories: frontmatter.categories
          ? frontmatter.categories.map(category => category.slug)
          : [],
        id,
        tags: frontmatter.tags ? frontmatter.tags.map(tag => tag.slug) : [],
      },
    })
  })

  const postsPreviews = Math.ceil(data.posts.count / POSTS_PER_PAGE)
  const postsPreviewsBasePath = paths.find(route => route.name === 'posts').path
  range(postsPreviews).forEach(page => {
    actions.createPage({
      path: createPath(postsPreviewsBasePath, page ? page + 1 : null),
      component: path.resolve('./src/templates/posts.js'),
      context: {
        skip: page * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE,
      },
    })
  })

  const postsByAuthor = data.posts.byAuthor
  const postsByAuthorBasePath = paths.find(route => route.name === 'author')
    .path
  postsByAuthor.forEach(({ count, slug }) => {
    const pages = Math.ceil(count / POSTS_PER_PAGE)
    range(pages).forEach(page => {
      actions.createPage({
        path: createPath(postsByAuthorBasePath, slug, page ? page + 1 : null),
        component: path.resolve('./src/templates/author.js'),
        context: {
          slug,
          skip: page * POSTS_PER_PAGE,
          limit: POSTS_PER_PAGE,
        },
      })
    })
  })

  const postsByCategory = data.posts.byCategory
  const postsByCategoryBasePath = paths.find(route => route.name === 'category')
    .path
  postsByCategory.forEach(({ count, slug }) => {
    const pages = Math.ceil(count / POSTS_PER_PAGE)
    range(pages).forEach(page => {
      actions.createPage({
        path: createPath(postsByCategoryBasePath, slug, page ? page + 1 : null),
        component: path.resolve('./src/templates/category.js'),
        context: {
          slug,
          skip: page * POSTS_PER_PAGE,
          limit: POSTS_PER_PAGE,
        },
      })
    })
  })

  const postsByTag = data.posts.byTag
  const postsByTagBasePath = paths.find(route => route.name === 'tag').path
  postsByTag.forEach(({ count, slug }) => {
    const pages = Math.ceil(count / POSTS_PER_PAGE)
    range(pages).forEach(page => {
      actions.createPage({
        path: createPath(postsByTagBasePath, slug, page ? page + 1 : null),
        component: path.resolve('./src/templates/tag.js'),
        context: {
          slug,
          skip: page * POSTS_PER_PAGE,
          limit: POSTS_PER_PAGE,
        },
      })
    })
  })

  // const authors = data.authors.count
  // const authorsBasePath = paths.find(route => route.name === 'authors').path
  // const authorsPages = Math.ceil(authors / POSTS_PER_PAGE)
  // range(authorsPages).forEach(page => {
  //   actions.createPage({
  //     path: createPath(authorsBasePath, page ? page + 1 : null),
  //     component: path.resolve('./src/templates/authors.js'),
  //     context: {
  //       skip: page * POSTS_PER_PAGE,
  //       limit: POSTS_PER_PAGE,
  //     },
  //   })
  // })

  const categories = data.categories.count
  const categoriesBasePath = paths.find(route => route.name === 'categories')
    .path
  const categoriesPages = Math.ceil(categories / POSTS_PER_PAGE)
  range(categoriesPages).forEach(page => {
    actions.createPage({
      path: createPath(categoriesBasePath, page ? page + 1 : null),
      component: path.resolve('./src/templates/categories.js'),
      context: {
        skip: page * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE,
      },
    })
  })

  const tags = data.tags.count
  const tagsBasePath = paths.find(route => route.name === 'tags').path
  const tagsPages = Math.ceil(tags / POSTS_PER_PAGE)
  range(tagsPages).forEach(page => {
    actions.createPage({
      path: createPath(tagsBasePath, page ? page + 1 : null),
      component: path.resolve('./src/templates/tags.js'),
      context: {
        skip: page * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE,
      },
    })
  })

  // An alternative approach to grouping events in the gatsby-node query
  // would have been to just query for all relativeDirectory in
  // sourceInstanceName "events", and pass that to the event template,
  // which would query itself for allMdx files in that directory
  const events = data.events.group
  const eventsPreviews = {}

  const eventBasePath = paths.find(route => route.name === 'event').path
  events.forEach(event => {
    const { directory, nodes } = event

    const index = nodes.find(node => node.fileInfo.name === 'index')
    const about = nodes.find(node => node.fileInfo.name === 'about')
    const sessions = nodes.filter(node =>
      node.fileInfo.name.startsWith('session')
    )

    // We could also have queried separately for allMdx in
    // sourceInstanceName events with fileInfo.name eq index,
    // instead of passing everything through context
    eventsPreviews[directory] = {
      title: index.frontmatter.title,
    }

    actions.createPage({
      path: createPath(eventBasePath, directory),
      component: path.resolve('./src/templates/event.js'),
      context: {
        indexId: index.id,
        aboutId: about.id,
        sessionIds: sessions.map(node => node.id),
      },
    })
  })

  // TODO: paginate events preview page
  const eventsPreviewsBasePath = paths.find(route => route.name === 'events')
    .path
  actions.createPage({
    path: eventsPreviewsBasePath,
    // path: createPath(eventsPreviewsBasePath, page ? page + 1 : null),
    component: path.resolve(`./src/templates/events.js`),
    context: eventsPreviews,
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./contents'),
        'node_modules',
      ],
    },
  })
}
