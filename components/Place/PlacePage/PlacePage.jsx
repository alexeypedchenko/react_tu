import React from 'react'
import styles from './PlacePage.module.scss'
import MapBox from '../../map/MapBox/MapBox'
import Page from '../../Page/Page'

const PlacePage = ({ place, page }) => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{place.name}</h1>
      <p className={styles.description}>
        {place.description}
      </p>

      <img className={styles.image} src={place.image} alt={place.name} />

      {place.tags.length && (
        <div className={styles.tags}>
          {place.tags.map((tag) => (<span>{tag}</span>))}
        </div>
      )}

      <div className={styles.content}>
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
