import { FC } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' },
]

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.link}>
        <Link href="/">
          <a>
            logo
          </a>
        </Link>
      </div>

      <nav className={styles.nav}>
        {links.map((link, idx) => (
          <Link key={idx} href={link.path}>
            <a className={styles.link}>
              {link.name}
            </a>
          </Link>
        ))}
      </nav>

      <div className={styles.profile}>
        login
      </div>
    </header>
  )
}

export default Header
