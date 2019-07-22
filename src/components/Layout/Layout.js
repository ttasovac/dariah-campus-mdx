import React from 'react'

import Footer from 'components/Footer/Footer'
import Head from 'components/Head/Head'
import Header from 'components/Header/Header'

import 'typeface-roboto'
import 'styles/global.css'
import styles from './Layout.module.css'

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Head />
    <Header className={styles.header} />
    <main className={styles.main}>{children}</main>
    <Footer className={styles.footer} />
  </div>
)

export default Layout
