import React, { useEffect, useState } from 'react'
import styles from './GoogleMap.module.scss'
import { GoogleMap as GMap } from '../../googleMap/googleMap'
import { usePrevious } from '../../hooks/usePrevious'
import { selectPlace } from '../../store/reducers/place/placeSlice'
import { useActions, useAppSelector } from '../../hooks/useStore'

const GoogleMap = () => {
  const { setActivePlace, setHoveredPlace } = useActions()
  const { places, activePlace, hoveredPlace } = useAppSelector(selectPlace)
  const {
    previous: previousHoveredPlace,
    current: currentHoveredPlace
  } = usePrevious(hoveredPlace)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const gmap = new GMap('#map', {
      onMarkerClick: (index) => { setActivePlace(index) },
      onMarkerHover: (index) => { setHoveredPlace(index) },
    })
    gmap.init().then(() => {
      gmap.setMarkers(places)
    })
    setMap(gmap)
  }, [])

  useEffect(() => {
    if (!map) return
    map.setMarkers(places)
  }, [places])

  useEffect(() => {
    if (!map) return
    if (
      previousHoveredPlace !== null &&
      currentHoveredPlace === null
    ) {
      map.removeLastMarker()
      return
    }
    if (
      previousHoveredPlace === null &&
      currentHoveredPlace !== null
    ) {
      map.handleCreateMarker(places[hoveredPlace])
      return
    }
  }, [hoveredPlace])

  useEffect(() => {
    if (!map) return
    if (activePlace != null) map.handleClickMarker(activePlace)
  }, [activePlace])

  // useEffect(() => {
  //   if (!map) return
  //   if (!route.length) {
  //     map.route.clear()
  //   }
  //   map.route.draw(route)
  // }, [route])

  const centeredMap = () => {
    map.centeredMap()
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <h2>
            Google map
          </h2>
          <p>active: {activePlace}</p>
          <p>hovered: {hoveredPlace}</p>
          <button onClick={centeredMap}>
            centeredMap
          </button>
        </div>

        {activePlace !== null && (
          <div className={styles.item}>
            <p>{places[activePlace].name}</p>
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