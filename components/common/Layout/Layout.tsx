import { FC } from 'react'
import styles from './Layout.module.scss'
import Header from '../Header/Header'
import { useAuthWatcher } from '../../../hooks/useAuthWatcher'
import { usePlaces } from '../../../hooks/usePlaces'
import { useRoutes } from '../../../hooks/useRoutes'

const Layout: FC = ({ children }) => {
  const auth = useAuthWatcher()
  const places = usePlaces()
  const routes = useRoutes()

  return (
    <div className={styles.wrap}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>

      <div id="portal-modal"></div>
    </div>
  )
}

export default Layout
