import type { NextPage } from 'next'
import styles from './styles.module.scss'
import GoogleMap from '../../components/map/GoogleMap'
import Filter from '../../components/Filter/Filter'
import PlaceList from '../../components/Place/PlaceList/PlaceList'

const Places: NextPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <Filter />

        <div className={styles.toggle}>
          <button className={styles.toggleActive}>Карта /\/</button>
          <button>Сетка #</button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.places}>
          <PlaceList />
        </div>

        <div className={styles.map}>
          <GoogleMap />
        </div>
      </div>
    </div>
  )
}

export default Places
