import React from 'react'
import styles from './PlacePage.module.scss'
import MapBox from '../../map/MapBox/MapBox'
import Page from '../../Page/Page'

const PlacePage = ({ place, page }) => {
  return (
    <div className={styles.page}>

      <div className={styles.head}>
        <span>places</span>
        <i> / </i>
        <span>region</span>
        <i> / </i>
        <span>{place.name}</span>
      </div>

      <h1 className={styles.title}>{place.name}</h1>

      <img className={styles.image} src={place.image} alt={place.name} />

      <div className={styles.content}>
        <p className={styles.description}>
          {place.description}
        </p>

        <div className={styles.map}>
          <MapBox markers={[place]} />
        </div>

        {page && (<Page page={page} />)}
      </div>
    </div>
  )
}

PlacePage.defaultProps = {
  page: null,
}

export default PlacePage
