import React, { useMemo } from 'react'
import styles from './ProfileFavoritePlaces.module.scss'
import { useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'
import { selectUser } from '../../../store/reducers/user/userSlice'
import PlaceItem from '../../Place/PlaceItem/PlaceItem'

const ProfileFavoritePlaces = () => {
  const { userData } = useAppSelector(selectUser)
  const { places } = useAppSelector(selectPlace)

  const favoritePlaces = useMemo(() => {
    if (!places || !userData) return []
    return userData.favoritePlaces.map((placeId) => {
      const index = places.findIndex((place) => place.id === placeId)
      return places[index]
    })
  }, [places, userData])

  return (
    <div className={styles.list}>
      {favoritePlaces.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </div>
  )
}

export default ProfileFavoritePlaces