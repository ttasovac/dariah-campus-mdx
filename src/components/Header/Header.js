import React from 'react'
import clsx from 'clsx'

import Link from 'components/Link/Link'
import Logo from 'components/Logo/Logo'

import Button from 'elements/Button/Button'
import Container from 'elements/Container/Container'

import { getBasePath } from 'utils/get-base-path'

import styles from './Header.module.css'

const NavLink = props => (
  <Link
    activeClassName={styles.activeNavLink}
    className={styles.navLink}
    {...props}
  />
)

const Header = ({ className }) => (
  <header className={clsx(styles.header, className)}>
    <Container>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <NavLink to="/">
              <Logo critical text />
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to={getBasePath('posts')}>Resources</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to={getBasePath('authors')}>Authors</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to={getBasePath('tags')}>Topics</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to={getBasePath('categories')}>Sources</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/course-registry">Course Registry</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
        <Button
          as={Link}
          className={styles.button}
          to="https://www.dariah.eu/helpdesk/"
        >
          Contact
        </Button>
      </nav>
    </Container>
  </header>
)

export default Header
