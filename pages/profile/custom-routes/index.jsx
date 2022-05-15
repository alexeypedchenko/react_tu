import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import ProfileRoute from '../../../components/Profile/ProfileRoute/ProfileRoute'
import { useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'

const favoritePlaces = () => {
  const { user, userData } = useAppSelector(selectUser)
  return (
    <ProfileLayout title="Маршруты">
      <ProfileRoute />
    </ProfileLayout>
  )
}

export default favoritePlaces
