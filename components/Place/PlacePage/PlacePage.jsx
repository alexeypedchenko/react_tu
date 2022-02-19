import React from 'react'
import styles from './PlacePage.module.scss'
import MapBox from '../../MapBox/MapBox'
import Page from '../../Page/Page'
import Tag from '../../UI/Tag/Tag'
import RouteItem from '../../Route/RouteItem/RouteItem'

const PlacePage = ({ place, page, routes }) => {
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

        {!!place.tags.length && (
          <div className={styles.tags}>
            {place.tags.map((tag) => (<Tag key={tag} tag={tag} />))}
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

        {routes && (
          <>
            <h2>Маршруты с этим местом:</h2>
            <div className={styles.routes}>
              {routes.map((route) => (
                <RouteItem key={route.id} route={route} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

PlacePage.defaultProps = {
  page: null,
  page: null,
  routes: null,
}

export default PlacePage
