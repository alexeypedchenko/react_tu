import React, { useMemo } from 'react'
import styles from './RoutePage.module.scss'

import MapBox from '../../MapBox/MapBox'
import Page from '../../Page/Page'
import Tag from '../../UI/Tag/Tag'

import { useSelector } from 'react-redux'
import { selectPlace } from '../../../store/reducers/place/placeSlice'

const RoutePage = ({ route, page }) => {
  const { places } = useSelector(selectPlace)
  const mapRoute = useMemo(() => {
    if (!route) return []
    return route.places.map((placeId) => {
      const index = places.findIndex((place) => place.id === placeId)
      return places[index]
    })
  }, [route])

  if (!route && !page) {
    return (<h1>Loading...</h1>)
  }

  return (
    <div className={styles.page}>
      {route && (<>
        <h1 className={styles.title}>{route.name}</h1>
        <p className={styles.description}>
          {route.description}
        </p>

        <img className={styles.image} src={route.image} alt={route.name} />

        {route.tags.length && (
          <div className={styles.tags}>
            {route.tags.map((tag) => (<Tag key={tag} tag={tag} />))}
          </div>
        )}
      </>)}

      <div className={styles.content}>
        {mapRoute.length > 0 && (<>
          <div className={styles.map}>
            <MapBox markers={mapRoute} showRoute={true} />
          </div>
        </>)}

        {page && (<Page page={page} />)}
      </div>
    </div>
  )
}

RoutePage.defaultProps = {
  route: null,
  page: null,
}

export default RoutePage
