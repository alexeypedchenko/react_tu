import React from 'react'
import styles from './PlacePage.module.scss'
import MapBox from '../../MapBox/MapBox'
import Page from '../../Page/Page'

const PlacePage = ({ place, page }) => {
  if (!place && !page) {
    return (<h1>Loading...</h1>)
  }

  return (
    <div className={styles.page}>
      {place && (<>
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
      </>)}

      <div className={styles.content}>
        {place && (<>
          <div className={styles.map}>
            <MapBox markers={[place]} />
          </div>
        </>)}

        {page && (<Page page={page} />)}
      </div>
    </div>
  )
}

PlacePage.defaultProps = {
  page: null,
}

export default PlacePage
