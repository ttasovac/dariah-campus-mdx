import React from 'react'
import clsx from 'clsx'

import Loader from 'react-loader-spinner'

import styles from './Spinner.module.css'

const Spinner = ({ className }) => (
  <div className={clsx(styles.spinner, className)}>
    <Loader type="Oval" height="40" width="40" color="var(--color-primary)" />
  </div>
)

export default Spinner
