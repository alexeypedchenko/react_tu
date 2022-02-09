import React, { useMemo } from 'react'
import Link from 'next/link'
import styles from './PlaceItem.module.scss'
import CheckAuth from '../../common/CheckAuth/CheckAuth'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'

const PlaceItem = ({ place, active, onClick, onMouseEnter, onMouseLeave }) => {
  const { updateUserData } = useActions()
  const { isAuth, user, userData } = useAppSelector(selectUser)

  const toFavorite = () => {
    const data = JSON.parse(JSON.stringify(userData))
    if (data.favoritePlaces.includes(place.id)) {
      const agree = confirm('Вы действительно хотите удалить место из избранных?');
      if (!agree) return
      data.favoritePlaces = data.favoritePlaces.filter((placeId) => placeId !== place.id)
    } else {
      data.favoritePlaces.push(place.id)
    }
    updateUserData({id: user.id, data})
  }

  const isFavorite = useMemo(() => {
    return isAuth ? userData.favoritePlaces.includes(place.id) : false
  }, [userData])

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
          <CheckAuth action={toFavorite}>
            <span className={styles.like}>
              {isFavorite ? '★' : '☆'}
            </span>
          </CheckAuth>
        </div>

        <span className={styles.name}>
          {place.name}
        </span>

        <span className={styles.description}>
          {place.description}
        </span>



        <Link href={`/places/${place.id}`}>
          <a className={styles.more} onClick={(event) => event.stopPropagation()}>
            Подробнее
          </a>
        </Link>

        {/* <span className={styles.date}>
          {createdAt}
        </span> */}
      </div>
    </div>
  )
}

export default PlaceItem
