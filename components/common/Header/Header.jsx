import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'
import Button from '../../UI/Button/Button'
import AccountIcon from '../../../assets/icons/account.svg'
import NoAccountIcon from '../../../assets/icons/no_account.svg'

import { links } from '../../../utils/links'
import { signout } from '../../../firebase/firebaseAuth'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/reducers/user/userSlice'
import CheckAuth from '../CheckAuth/CheckAuth'

const Header = () => {
  const { isAuth } = useSelector(selectUser)
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.link}>
          logo
        </a>
      </Link>

      <nav className={styles.nav}>
        {links.map((link, idx) => (
          <Link key={idx} href={link.path}>
            <a className={`${styles.link} ${pathname === link.path ? styles.activeLink : ''}`}>
              {link.name}
            </a>
          </Link>
        ))}
      </nav>

      <CheckAuth>
        <div className={styles.profile}>
          {isAuth ? (
            <>
              <Button text="Профиль" icon={AccountIcon} push="/profile"/>
              <Button text="Выйти" icon={NoAccountIcon} onClick={signout} />
            </>
          ) : <Button text="Войти" icon={AccountIcon} />
          }
        </div>
      </CheckAuth>
    </header>
  )
}

export default Header
