import { FC } from 'react'
import { useAuthWatcher } from '../../../hooks/useAuthWatcher'
import styles from './Layout.module.scss'
import Header from '../Header/Header'

const Layout: FC = ({ children }) => {
  const auth = useAuthWatcher()

  return (
    <div className={styles.wrap}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>

      <footer>
        footer
      </footer>
    </div>
  )
}

export default Layout
