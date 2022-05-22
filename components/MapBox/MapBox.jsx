import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styles from './MapBox.module.scss'
import { usePrevious } from '../../hooks/usePrevious'
import { GoogleMap } from '../../googleMap/googleMap'

const MapBox = forwardRef(({ markers, showRoute, onMarkerClick, onMarkerHover }, ref) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const { previous: previousMarkers, current: currentMarkers } = usePrevious(markers)

  useEffect(() => {
    const gmap = new GoogleMap(mapRef.current, { showRoute, onMarkerClick, onMarkerHover })
    gmap.init().then(() => {
      gmap.setMarkers(markers)
      if (showRoute) {
        // gmap.route.draw(markers)
        gmap.polyline.draw(markers)
      }
      setMap(gmap)
    })
  }, [])

  useEffect(() => {
    if (!map) return
    if (JSON.stringify(previousMarkers) !== JSON.stringify(currentMarkers)) {
      map.setMarkers(markers)
      if (showRoute) {
        // map.route.draw(markers)
        gmap.polyline.draw(markers)
      }
    }
  }, [markers])

  const centeredMap = () => {
    if (map) map.centeredMap()
  }

  // возможность из родительского компонента вызвать метод дочерноего react
  useImperativeHandle(ref, () => ({
    centeredMap() {
      centeredMap()
    },
    removeLastMarker() {
      if (map) map.removeLastMarker()
    },
    handleCreateMarker(marker) {
      if (map) map.handleCreateMarker(marker)
    }
  }))

  return (
    <div className={styles.wrap}>
      {map && (
        <button className={styles.button} onClick={centeredMap}>
          Центрировать
        </button>
      )}
      <div
        ref={mapRef}
        className={styles.map}
      ></div>
    </div>
  )
})

MapBox.defaultProps = {
  markers: [],
  showRoute: false,
  onMarkerClick: (index) => console.log('onMarkerClick:', index),
  onMarkerHover: (index) => console.log('onMarkerHover:', index)
}

MapBox.displayName = 'MapBox'

export default MapBox
