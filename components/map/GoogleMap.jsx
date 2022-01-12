import React, { useEffect, useState } from 'react'
import styles from './GoogleMap.module.scss'
import { GoogleMap as GMap } from '../../googleMap/googleMap'
import { usePrevious } from '../../hooks/usePrevious'
import { selectPlace } from '../../store/reducers/place/placeSlice'
import { useActions, useAppSelector } from '../../hooks/useStore'

const GoogleMap = () => {
  const { setActivePlace, setHoveredPlace } = useActions()
  const { filteredPlaces, activePlace, hoveredPlace } = useAppSelector(selectPlace)
  const {
    previous: previousHoveredPlace,
    current: currentHoveredPlace
  } = usePrevious(hoveredPlace)
  const {
    previous: previousPlaces,
    current: currentPlaces
  } = usePrevious(filteredPlaces)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const gmap = new GMap('#map', {
      onMarkerClick: (index) => { setActivePlace(index) },
      onMarkerHover: (index) => { setHoveredPlace(index) },
    })
    gmap.init().then(() => {
      gmap.setMarkers(filteredPlaces)
    })
    setMap(gmap)
  }, [])

  useEffect(() => {
    if (!map) return
    if (JSON.stringify(previousPlaces) !== JSON.stringify(currentPlaces)) {
      map.setMarkers(filteredPlaces)
    }
  }, [filteredPlaces])

  const centeredMap = () => {
    map.centeredMap()
  }

  useEffect(() => {
    if (!map) return
    if (previousHoveredPlace !== null && currentHoveredPlace === null) {
      map.removeLastMarker()
      return
    }
    if (previousHoveredPlace === null && currentHoveredPlace !== null) {
      map.handleCreateMarker(filteredPlaces[hoveredPlace])
      return
    }
  }, [hoveredPlace])

  // useEffect(() => {
  //   if (!map) return
  //   if (
  //     (previousActivePlace !== null && currentActivePlace !== null) &&
  //     (previousActivePlace !== currentActivePlace)
  //   ) {
  //     map.handleClickMarker(currentActivePlace)
  //     return
  //   }
  //   if (previousActivePlace !== null && currentActivePlace === null) {
  //     map.handleClickMarker(previousActivePlace)
  //     return
  //   }
  //   if (previousActivePlace === null && currentActivePlace !== null) {
  //     map.handleClickMarker(currentActivePlace)
  //     return
  //   }
  // }, [activePlace])

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        {/* <div>
          <p>active: {activePlace}</p>
          <p>hovered: {hoveredPlace}</p>
        </div> */}
        <button onClick={centeredMap}>
          centeredMap
        </button>

        {activePlace !== null && (
          <div className={styles.item}>
            <p>{filteredPlaces[activePlace].name}</p>
            <button onClick={() => { setActivePlace(null) }}>
              close
            </button>
          </div>
        )}
      </div>

      <div id="map" className={styles.map}></div>
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
