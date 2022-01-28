import { FC } from 'react'
import styles from './Layout.module.scss'
import Header from '../Header/Header'
import { useAuthWatcher } from '../../../hooks/useAuthWatcher'
import { usePlaces } from '../../../hooks/usePlaces'

const Layout: FC = ({ children }) => {
  const auth = useAuthWatcher()
  const places = usePlaces()

  return (
    <div className={styles.wrap}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>

      {/* <footer>
        footer
      </footer> */}
    </div>
  )
}

export default Layout
