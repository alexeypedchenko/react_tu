import type { NextPage } from 'next'
import styles from './styles.module.scss'
import GoogleMap from '../../components/map/GoogleMap'
import Filter from '../../components/Filter/Filter'
import PlaceList from '../../components/Place/PlaceList/PlaceList'
import { useState } from 'react'

const visibilityTypes: {[key: string]: string} = {
  map: 'Карта /\\/',
  grid: 'Сетка #'
}

const Places: NextPage = () => {
  const [visibilityType, setVisibilityType] = useState<string>('map');

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <Filter />

        <div className={styles.toggle}>
          {Object.keys(visibilityTypes).map((key) => (
            <button
              key={key}
              className={visibilityType === key ? styles.toggleActive : ''}
              onClick={() => setVisibilityType(key)}
            >
              {visibilityTypes[key]}
            </button>
          ))}
        </div>
      </div>

      <div className={visibilityType === 'map' ? styles.body : ''}>
        <div className={visibilityType === 'map' ? styles.placesColumn : styles.placesGrid}>
          <PlaceList />
        </div>
        {visibilityType === 'map' && (<div className={styles.map}><GoogleMap /></div>)}
      </div>
    </div>
  )
}

export default Places
