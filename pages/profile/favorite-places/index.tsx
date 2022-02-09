import type { NextPage } from 'next'
import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import ProfileFavoritePlaces from '../../../components/Profile/ProfileFavoritePlaces/ProfileFavoritePlaces'
import { useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'

const favoritePlaces: NextPage = () => {
  const { user, userData } = useAppSelector(selectUser)
  return (
    <ProfileLayout title="Избранные места">
      <ProfileFavoritePlaces />
    </ProfileLayout>
  )
}

export default favoritePlaces
