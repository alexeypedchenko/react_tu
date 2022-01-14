import React, { useEffect, useRef, useState } from 'react'
import styles from './GoogleMap.module.scss'
import MapBox from './MapBox/MapBox'
import { usePrevious } from '../../hooks/usePrevious'
import { selectPlace } from '../../store/reducers/place/placeSlice'
import { useActions, useAppSelector } from '../../hooks/useStore'

const GoogleMap = () => {
  const map = useRef(null)
  const { setActivePlace, setHoveredPlace } = useActions()
  const { filteredPlaces, activePlace, hoveredPlace } = useAppSelector(selectPlace)
  const { previous: previousHoveredPlace, current: currentHoveredPlace } = usePrevious(hoveredPlace)

  useEffect(() => {
    setHoveredPlace(null)
  }, [])

  useEffect(() => {
    if (!map) return
    if (previousHoveredPlace !== null && currentHoveredPlace !== null) {
      map.current.removeLastMarker()
      map.current.handleCreateMarker(filteredPlaces[hoveredPlace])
      return
    }
    if (previousHoveredPlace !== null && currentHoveredPlace === null) {
      map.current.removeLastMarker()
      return
    }
    if (previousHoveredPlace === null && currentHoveredPlace !== null) {
      map.current.handleCreateMarker(filteredPlaces[hoveredPlace])
      return
    }
  }, [hoveredPlace])

  return (
    <div className={styles.wrap}>
      <MapBox
        ref={map}
        markers={filteredPlaces}
        onMarkerClick={setActivePlace}
        onMarkerHover={setHoveredPlace}
      />
    </div>
  )
}

export default GoogleMap

// для отображения маршрута
// useEffect(() => {
//   if (!map) return
//   if (!route.length) {
//     map.route.clear()
//   }
//   map.route.draw(route)
// }, [route])
