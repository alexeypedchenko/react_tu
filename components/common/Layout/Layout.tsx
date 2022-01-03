import { FC } from 'react'
import styles from './Layout.module.scss'
import Header from '../Header/Header'

const Layout: FC = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <Header />

      <main className={styles.main}>
        {children}
      </main>

      <footer>
        footer
      </footer>
    </div>
  )
}

export default Layout
