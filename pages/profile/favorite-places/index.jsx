import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import ProfileFavorites from '../../../components/Profile/ProfileFavorites/ProfileFavorites'
import { useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'

const favoritePlaces = () => {
  const { user, userData } = useAppSelector(selectUser)
  return (
    <ProfileLayout title="Избранные места">
      <ProfileFavorites type="places" />
    </ProfileLayout>
  )
}

export default favoritePlaces
