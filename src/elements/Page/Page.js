import React from 'react'
import clsx from 'clsx'

import Container from 'elements/Container/Container'

import styles from './Page.module.css'

const Page = ({ children, className }) => (
  <Container className={clsx(styles.page, className)}>{children}</Container>
)

export default Page
