import React from 'react'
import clsx from 'clsx'

import styles from './Title.module.css'

const Title = ({ children, className }) => (
  <h1 className={clsx(styles.title, className)}>{children}</h1>
)

export default Title
