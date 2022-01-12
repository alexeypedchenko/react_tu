import { FC } from 'react'
import { useEffect } from 'react'
import styles from './Layout.module.scss'
import Header from '../Header/Header'
import { useAuthWatcher } from '../../../hooks/useAuthWatcher'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'

const Layout: FC = ({ children }) => {
  const auth = useAuthWatcher()
  const { filter, places } = useAppSelector(selectPlace)
  const { fetchPlaces, setFilteredPlaces, setFilterList } = useActions()

  useEffect(() => {
    fetchPlaces()
  }, [])

  useEffect(() => {
    setFilteredPlaces({ places, filter })
    setFilterList({ places, filter })
  }, [places])

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
