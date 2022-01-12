import type { NextPage } from 'next'
import styles from './styles.module.scss'
import GoogleMap from '../../components/map/GoogleMap'
import Filter from '../../components/Filter/Filter'
import PlaceList from '../../components/Place/PlaceList'

const Places: NextPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        Places page
      </div>
      <Filter />
      <div className={styles.places}>
        <PlaceList />
      </div>
      <div className={styles.map}>
        <GoogleMap />
      </div>
    </div>
  )
}

export default Places
