import { FC } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import { links } from '../../../utils/links'
import { signout } from '../../../firebase/firebaseAuth'
import { useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'

const Header: FC = () => {
  const { isAuth } = useAppSelector(selectUser)

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
        {isAuth ? (
          <button onClick={signout}>
            logout
          </button>
        ) : (
          <Link href="/login">
            <a className={styles.link}>
              login
            </a>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
