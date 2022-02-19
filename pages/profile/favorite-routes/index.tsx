import type { NextPage } from 'next'
import ProfileFavorites from '../../../components/Profile/ProfileFavorites/ProfileFavorites'
import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import { useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'

const favoritePlaces: NextPage = () => {
  const { user, userData } = useAppSelector(selectUser)
  return (
    <ProfileLayout title="Избранные маршруты">
      <ProfileFavorites type="routes" />
    </ProfileLayout>
  )
}

export default favoritePlaces
