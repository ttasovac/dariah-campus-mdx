import React from 'react'
import clsx from 'clsx'

import styles from './TOC.module.css'

const TOC = ({ className, headings }) => (
  <div className={clsx(styles.toc, className)}>Table of contents</div>
)

export default TOC
