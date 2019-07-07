import React from 'react'
import clsx from 'clsx'

import styles from './LeadIn.module.css'

const LeadIn = ({ children, className }) => (
  <h2 className={clsx(styles.leadIn, className)}>{children}</h2>
)

export default LeadIn
