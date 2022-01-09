import type { NextPage } from 'next'
import styles from './styles.module.scss'
import { useEffect } from 'react'
import { useActions, useAppSelector } from '../../hooks/useStore'
import { selectPlace } from '../../store/reducers/place/placeSlice'
import GoogleMap from '../../components/map/GoogleMap'

const Places: NextPage = () => {
  const { fetchPlaces, setActivePlace, setHoveredPlace } = useActions()
  const { places } = useAppSelector(selectPlace)

  useEffect(() => {
    fetchPlaces()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        Places page
      </div>
      <div className={styles.places}>
        {places.map((el, idx) => (
          <div
            className={styles.place}
            key={el.name}
            onClick={() => setActivePlace(idx)}
            onMouseEnter={() => setHoveredPlace(idx)}
            onMouseLeave={() => setHoveredPlace(null)}
          >
            { el.name }
          </div>
        ))}
      </div>
      <div className={styles.map}>
        <GoogleMap />
      </div>
    </div>
  )
}

export default Places
