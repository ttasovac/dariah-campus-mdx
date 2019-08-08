import React from 'react'
import PropTypes from 'prop-types'
import { Link as RelativeLink } from 'gatsby'
import clsx from 'clsx'

import styles from './Link.module.css'

// const isAbsoluteUrl = url => {
//   try {
//     new URL(url)
//     return true
//   } catch {
//     return false
//   }
// }
const isAbsoluteUrl = url => url.startsWith('http')

const Link = ({
  activeClassName,
  children,
  className,
  href,
  rel,
  to,
  ...rest
}) => {
  if (String(to || href).startsWith('#')) {
    return (
      <a className={clsx(styles.link, className)} href={to || href}>
        {children}
      </a>
    )
  }

  if (isAbsoluteUrl(to || href)) {
    /* eslint-disable react/jsx-no-target-blank */
    return (
      <a
        className={clsx(styles.link, className)}
        href={to || href}
        target="_blank"
        rel={['noopener', 'noreferrer', rel].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <RelativeLink
      activeClassName={clsx(styles.activeLink, activeClassName)}
      className={clsx(styles.link, className)}
      rel={rel}
      to={to || href}
      {...rest}
    >
      {children}
    </RelativeLink>
  )
}

// Overwrites for posts
export const PostLink = ({ className, ...rest }) => (
  <Link {...rest} className={clsx(className, styles.postLink)} />
)

Link.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
}

export default Link
