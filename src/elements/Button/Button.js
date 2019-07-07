import React from 'react'
import clsx from 'clsx'

import styles from './Button.module.css'

const Button = ({
  as: Component = 'button',
  children,
  className,
  primary,
  ...rest
}) => (
  <Component
    className={clsx(primary ? styles.buttonPrimary : styles.button, className)}
    {...rest}
  >
    {children}
  </Component>
)

export default Button
