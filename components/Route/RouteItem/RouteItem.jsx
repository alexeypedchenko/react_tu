import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'
import { selectUser } from '../../../store/reducers/user/userSlice'
import CheckAuth from '../../common/CheckAuth/CheckAuth'
import ConfirmAction from '../../common/ConfirmAction/ConfirmAction'
import MapBox from '../../MapBox/MapBox'
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'
import Tag from '../../UI/Tag/Tag'
import styles from './RouteItem.module.scss'

const RouteItem = ({ route }) => {
  const { updateUserData } = useActions()
  const { isAuth, user, userData } = useAppSelector(selectUser)
  const [showOnMap, setShowOnMap] = useState(false)

  const toFavorite = () => {
    const data = JSON.parse(JSON.stringify(userData))
    if (data.favoriteRoutes.includes(route.id)) {
      data.favoriteRoutes = data.favoriteRoutes.filter((placeId) => placeId !== route.id)
    } else {
      data.favoriteRoutes.push(route.id)
    }
    updateUserData({ id: user.id, data })
  }

  const isFavorite = useMemo(() => {
    if (!userData) return
    return isAuth ? userData.favoriteRoutes.includes(route.id) : false
  }, [userData])

  const { places } = useAppSelector(selectPlace)
  const mapRoute = useMemo(() => {
    return route.places.map((placeId) => {
      const index = places.findIndex((place) => place.id === placeId)
      return places[index]
    })
  }, [])

  return (
    <div className={styles.route}>
      <img
        className={styles.image}
        src={route.image}
        alt={route.name}
      />
      <div className={styles.body}>
        <div className={styles.topbar}>
          <div className={styles.tags}>
            {route.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>

          <CheckAuth>
            <ConfirmAction
              text="Удалить маршрут из избранного"
              showDialog={isFavorite}
              action={toFavorite}
              tag="span"
              className={styles.like}
            >
              {isFavorite ? '★' : '☆'}
            </ConfirmAction>
          </CheckAuth>
        </div>

        <h3 className={styles.name}>
          {route.name}
        </h3>
        <p className={styles.description}>
          {route.description}
        </p>
        <Button text="Показать на карте" onClick={() => setShowOnMap(true)} />
        <Link href={`/routes/${route.id}`}>
          <a className={styles.link}>
            Подробнее
          </a>
        </Link>
      </div>

      {showOnMap && (
        <Modal open={showOnMap} setOpen={() => setShowOnMap(false)}>
          <MapBox markers={mapRoute} showRoute={true} />
        </Modal>
      )}
    </div>
  )
}

export default RouteItem
