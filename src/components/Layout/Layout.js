import React from 'react'

import Footer from 'components/Footer/Footer'
import Head from 'components/Head/Head'
import Header from 'components/Header/Header'
import SidePanel from 'components/SidePanel/SidePanel'

import 'typeface-roboto'
import 'styles/global.css'
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  const [isSidePanelVisible, setIsSidePanelVisible] = React.useState(false)

  return (
    // TODO: Background that hides sidepanel
    <div className={styles.layout}>
      <Head />
      <Header className={styles.header} />
      <main className={styles.main}>{children}</main>
      <Footer className={styles.footer} />
      <SidePanel
        className={styles.sidepanel}
        isVisible={isSidePanelVisible}
        setIsVisible={setIsSidePanelVisible}
      />
    </div>
  )
}
export default Layout
