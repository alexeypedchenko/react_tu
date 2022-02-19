import React, { useMemo } from 'react'
import styles from './ProfileFavorites.module.scss'

import PlaceItem from '../../Place/PlaceItem/PlaceItem'
import RouteItem from '../../Route/RouteItem/RouteItem'

import { useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'
import { selectUser } from '../../../store/reducers/user/userSlice'
import { selectRoute } from '../../../store/reducers/route/routeSlice'

const types = {
  places: 'places',
  routes: 'routes',
}

const ProfileFavorites = ({ type }) => {
  const { userData } = useAppSelector(selectUser)
  const { places } = useAppSelector(selectPlace)
  const { routes } = useAppSelector(selectRoute)

  const favoriteList = useMemo(() => {
    if (!places || !routes || !userData) return []

    if (types[type] === types.places) {
      return userData.favoritePlaces.map((placeId) => {
        const index = places.findIndex((place) => place.id === placeId)
        return places[index]
      })
    }

    if (types[type] === types.routes) {
      return userData.favoriteRoutes.map((routeId) => {
        const index = routes.findIndex((route) => route.id === routeId)
        return routes[index]
      })
    }
  }, [places, routes, userData])

  return (
    <div className={styles.list}>
      {types[type] === types.places &&
        favoriteList.map((item) => (
          <PlaceItem key={item.id} place={item} showOnMap />
        ))
      }
      {types[type] === types.routes &&
        favoriteList.map((item) => (
          <RouteItem key={item.id} route={item} />
        ))
      }
    </div>
  )
}

ProfileFavorites.defaultProps = {
  type: 'places', // 'places | routes'
}

export default ProfileFavorites