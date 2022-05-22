import React from 'react'
import { useSelector } from 'react-redux'
import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import ProfileFavorites from '../../../components/Profile/ProfileFavorites/ProfileFavorites'
import { selectUser } from '../../../store/reducers/user/userSlice'

const FavoritePlaces = () => {
  const { user, userData } = useSelector(selectUser)
  return (
    <ProfileLayout title="Избранные места">
      <ProfileFavorites type="places" />
    </ProfileLayout>
  )
}

export default FavoritePlaces
