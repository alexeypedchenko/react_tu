import React from 'react'
import styles from './PlacePage.module.scss'
import MapBox from '../../map/MapBox/MapBox'

const PlacePage = ({ place }) => {
  return (
    <div className={styles.page}>
      <h1>{place.name}</h1>
      <img className={styles.image} src={place.image} alt={place.name} />

      <MapBox markers={[place]} />
    </div>
  )
}

export default PlacePage
