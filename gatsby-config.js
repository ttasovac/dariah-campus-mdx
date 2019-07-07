const path = require('path')

const siteUrl =
  process.env.URL ||
  process.env.DEPLOY_URL ||
  'https://dariah-campus.netlify.com'

module.exports = {
  siteMetadata: {
    author: 'DARIAH Campus',
    description:
      'DARIAH Campus is a pilot project exploring different ways of capturing ' +
      'and consolidating DARIAH learning resources.',
    keywords: [],
    lang: 'en',
    paths: [
      {
        name: 'author',
        path: '/author',
      },
      {
        name: 'authors',
        path: '/authors',
      },
      {
        name: 'category',
        path: '/source',
      },
      {
        name: 'categories',
        path: '/sources',
      },
      {
        name: 'post',
        path: '/resource',
      },
      {
        name: 'posts',
        path: '/resources',
      },
      {
        name: 'tag',
        path: '/tag',
      },
      {
        name: 'tags',
        path: '/tags',
      },
    ],
    siteUrl,
    siteVerification: [
      {
        name: 'google',
        key: '',
      },
    ],
    social: [
      {
        name: 'twitter',
        key: '@dariaheu',
        url: 'https://twitter.com/dariaheu',
      },
      {
        name: 'flickr',
        url:
          'https://www.flickr.com/photos/142235661@N08/albums/with/72157695786965901',
      },
      {
        name: 'youtube',
        url: 'https://www.youtube.com/channel/UCeQpM_gUvNZXUWf6qQ226GQ',
      },
      {
        name: 'github',
        url: 'https://github.com/DARIAH-ERIC',
      },
      {
        name: 'email',
        url: 'https://www.dariah.eu/helpdesk/',
      },
      {
        name: 'website',
        url: 'https://www.dariah.eu',
      },
    ],
    title: 'DARIAH Campus',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.resolve('./src/data'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve('./src/images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve('./src/posts'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: path.resolve('./src/templates/page.js'),
          // posts: '',
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800, // var(--grid-column-width-small)
              withWebp: true, // default false
              // linkImagesToOriginal: false, // default true
              // showCaptions: false, // default false
              // wrapperStyle: undefined, // can be a function that gets passed fixed/fluid
              // backgroundColor: 'transparent', // default 'white'
            },
          },
          // 'gatsby-remark-copy-linked-files',
          // 'gatsby-remark-smartypants',
        ],
        remarkPlugins: [
          // 'remark-slug',
          // 'remark-autolink-headings', // Or just use <Heading /> and custom scroll handling
        ],
        plugins: [
          'gatsby-remark-images', // FIXME: Temporary workaround
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: ({ node }) =>
          node.name.charAt(0).toUpperCase() + node.name.slice(1),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'DARIAH Campus',
        short_name: 'DARIAH Campus',
        start_url: '/',
        background_color: '#006699',
        theme_color: '#006699',
        display: 'minimal-ui',
        icon: 'src/images/dariah-flower.svg',
      },
    },
    // {
    //   resolve: 'gatsby-plugin-nprogress',
    //   options: {
    //     color: '#006699',
    //     showSpinner: false,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    // 'gatsby-plugin-netlify-cache',
    // 'gatsby-plugin-netlify-cms',
  ],
}
