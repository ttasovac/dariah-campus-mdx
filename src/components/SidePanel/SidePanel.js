import React from 'react'
import clsx from 'clsx'

import styles from './SidePanel.module.css'

const SidePanel = ({ children, className, isVisible, setIsVisible }) => (
  <aside className={clsx(styles.sidepanel, className)}>{children}</aside>
)

export default SidePanel
