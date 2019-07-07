import React from 'react'
import clsx from 'clsx'

import styles from './Spinner.module.css'

const Spinner = ({ className }) => (
  <div className={clsx(styles.spinner, className)}>Loading...</div>
)

export default Spinner
