import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'
import MapBox from '../../MapBox/MapBox'
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'
import styles from './RouteItem.module.scss'

const RouteItem = ({ route }) => {
  const [showOnMap, setShowOnMap] = useState(false)

  const { places } = useAppSelector(selectPlace)
  const mapRoute = useMemo(() => {
    return route.places.map((placeId) => {
      const index = places.findIndex((place) => place.id === placeId)
      return places[index]
    })
  }, [])

  return (
    <div className={styles.route}>
      <img
        className={styles.image}
        src={route.image}
        alt={route.name}
      />
      <div className={styles.body}>
        <h3 className={styles.name}>
          {route.name}
        </h3>
        <p className={styles.description}>
          {route.description}
        </p>
        <Button text="Показать на карте" onClick={() => setShowOnMap(true)} />
        <Link href={`/routes/${route.id}`}>
          <a className={styles.link}>
            Подробнее
          </a>
        </Link>
      </div>

      {showOnMap && (
        <Modal open={showOnMap} setOpen={() => setShowOnMap(false)}>
          <MapBox markers={mapRoute} showRoute={true} />
        </Modal>
      )}
    </div>
  )
}

export default RouteItem
