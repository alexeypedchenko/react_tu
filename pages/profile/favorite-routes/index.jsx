import React from 'react'
import { useSelector } from 'react-redux'
import ProfileFavorites from '../../../components/Profile/ProfileFavorites/ProfileFavorites'
import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import { selectUser } from '../../../store/reducers/user/userSlice'

const FavoritePlaces = () => {
  const { user, userData } = useSelector(selectUser)
  return (
    <ProfileLayout title="Избранные маршруты">
      <ProfileFavorites type="routes" />
    </ProfileLayout>
  )
}

export default FavoritePlaces
