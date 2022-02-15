import React from 'react'
import styles from './PlaceList.module.scss'
import PlaceItem from '../PlaceItem/PlaceItem'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'

const PlaceList = ({ showOnMap, onClick }) => {
  const { setActivePlace, setHoveredPlace } = useActions()
  const { filteredPlaces, activePlace } = useAppSelector(selectPlace)

  return (
    <>
      {filteredPlaces.map((place, idx) => (
        <PlaceItem
          place={place}
          key={place.name}
          onClick={() => onClick(place)}
          onMouseEnter={() => setHoveredPlace(idx)}
          onMouseLeave={() => setHoveredPlace(null)}
          showOnMap={showOnMap}
          // active={activePlace === idx}
        />
      ))}
    </>
  )
}

PlaceList.defaultProps = {
  showOnMap: false,
  onClick: () => {},
}

export default PlaceList
