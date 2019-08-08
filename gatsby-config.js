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
    email: 'https://www.dariah.eu/helpdesk/',
    keywords: ['Digital Humanities'],
    lang: 'en',
    paths: [
      {
        displayName: 'About',
        name: 'about',
        path: '/about',
        top: true,
      },
      {
        displayName: 'Author',
        name: 'author',
        path: '/author',
        top: false,
      },
      {
        displayName: 'Authors',
        name: 'authors',
        path: '/authors',
        top: true,
      },
      {
        displayName: 'Category',
        name: 'category',
        path: '/source',
        top: false,
      },
      {
        displayName: 'Categories',
        name: 'categories',
        path: '/sources',
        top: true,
      },
      {
        displayName: 'Contact',
        name: 'contact',
        path: '/contact',
        top: true,
      },
      {
        displayName: 'Course Registry',
        name: 'course-registry',
        path: '/course-registry',
        top: true,
      },
      {
        displayName: 'Home',
        name: 'home',
        path: '/',
        top: true,
      },
      {
        displayName: 'Resource',
        name: 'post',
        path: '/resource',
        top: false,
      },
      {
        displayName: 'Resources',
        name: 'posts',
        path: '/resources',
        top: true,
      },
      {
        displayName: 'Tag',
        name: 'tag',
        path: '/tag',
        top: false,
      },
      {
        displayName: 'Tags',
        name: 'tags',
        path: '/tags',
        top: true,
      },
    ],
    publishedAt: '2019-08-30',
    siteUrl,
    siteVerification: [
      // {
      //   name: 'facebook',
      //   key: 'fbAppId',
      // },
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
    url: 'https://www.dariah.eu',
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
          data: path.resolve('./src/templates/component.js'),
          default: path.resolve('./src/templates/page.js'),
          // pages: '',
          // posts: '',
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              withWebp: true,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '400',
              icon: false,
            },
          },
        ],
        remarkPlugins: [],
        plugins: [
          'gatsby-remark-images', // FIXME: Temporary workaround
          'gatsby-remark-autolink-headers', // FIXME: Temporary workaround
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
    // {
    //   resolve: 'gatsby-plugin-postcss',
    //   options: {
    //     postCssPlugins: [require('postcss-custom-properties')],
    //   },
    // },
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
    // 'gatsby-plugin-polyfill-io',
    'gatsby-plugin-netlify',
    // 'gatsby-plugin-netlify-cache',
    // 'gatsby-plugin-netlify-cms',
  ],
}
