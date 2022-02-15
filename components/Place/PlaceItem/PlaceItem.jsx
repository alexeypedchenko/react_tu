import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './PlaceItem.module.scss'
import CheckAuth from '../../common/CheckAuth/CheckAuth'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'
import MapBox from '../../map/MapBox/MapBox'
import ConfirmAction from '../../common/ConfirmAction/ConfirmAction'

const PlaceItem = ({ place, active, small, showOnMap, onClick, onMouseEnter, onMouseLeave }) => {
  const { updateUserData } = useActions()
  const { isAuth, user, userData } = useAppSelector(selectUser)
  const [openMap, setOpenMap] = useState(false)

  const toFavorite = () => {
    const data = JSON.parse(JSON.stringify(userData))
    if (data.favoritePlaces.includes(place.id)) {
      data.favoritePlaces = data.favoritePlaces.filter((placeId) => placeId !== place.id)
    } else {
      data.favoritePlaces.push(place.id)
    }
    updateUserData({ id: user.id, data })
  }

  const isFavorite = useMemo(() => {
    return isAuth ? userData.favoritePlaces.includes(place.id) : false
  }, [userData])

  if (small) return (
    <div
      className={`${styles.smallItem} ${active ? styles.itemActive : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        className={styles.smallImage}
        src={place.image}
        alt={place.name}
      />
      <span className={styles.smallName}>
        {place.name}
      </span>
    </div>
  )

  return (
    <div
      className={`${styles.item} ${active ? styles.itemActive : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        className={styles.image}
        src={place.image}
        alt={place.name}
      />

      <div className={styles.body}>
        <div className={styles.topbar}>
          {place.tags.length && (
            <div className={styles.tags}>
              {place.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          <CheckAuth>
            <ConfirmAction
              text="Удалить место из избранного"
              showDialog={isFavorite}
              action={toFavorite}
              tag="span"
              className={styles.like}
            >
              {isFavorite ? '★' : '☆'}
            </ConfirmAction>
          </CheckAuth>
        </div>

        <span className={styles.name}>
          {place.name}
        </span>

        <span className={styles.description}>
          {place.description}
        </span>

        {showOnMap && (
          <Button
            text="Показать на карте"
            onClick={(event) => {
              event.stopPropagation()
              setOpenMap(true)
            }}
          />
        )}

        <Link href={`/places/${place.id}`}>
          <a className={styles.more} onClick={(event) => event.stopPropagation()}>
            Подробнее
          </a>
        </Link>

        {openMap && (
          <Modal open={openMap} setOpen={() => setOpenMap(false)}>
            <MapBox markers={[place]} />
          </Modal>
        )}
      </div>
    </div>
  )
}

PlaceItem.defaultProps = {
  active: false,
  small: false,
  showOnMap: false,
  onClick: () => { },
  onMouseEnter: () => { },
  onMouseLeave: () => { },
}

export default PlaceItem
