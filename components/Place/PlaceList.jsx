import React from 'react'
import styles from './Place.module.scss'
import PlaceItem from './PlaceItem'
import { useActions, useAppSelector } from '../../hooks/useStore'
import { selectPlace } from '../../store/reducers/place/placeSlice'

const PlaceList = () => {
  const { setActivePlace, setHoveredPlace } = useActions()
  const { filteredPlaces, activePlace } = useAppSelector(selectPlace)

  return (
    <div className={styles.list}>
      {filteredPlaces.map((place, idx) => (
        <PlaceItem
          place={place}
          key={place.name}
          onClick={() => setActivePlace(activePlace === idx ? null : idx)}
          onMouseEnter={() => setHoveredPlace(idx)}
          onMouseLeave={() => setHoveredPlace(null)}
          active={activePlace === idx}
        />
      ))}
    </div>
  )
}

export default PlaceList
