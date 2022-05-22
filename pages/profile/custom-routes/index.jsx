import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import ProfileRoute from '../../../components/Profile/ProfileRoute/ProfileRoute'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/reducers/user/userSlice'

const favoritePlaces = () => {
  const { user, userData } = useSelector(selectUser)
  return (
    <ProfileLayout title="Маршруты">
      <ProfileRoute />
    </ProfileLayout>
  )
}

export default favoritePlaces
