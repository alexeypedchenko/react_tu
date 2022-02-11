import type { NextPage } from 'next'
import ProfileLayout from '../../components/Profile/ProfileLayout/ProfileLayout'
import { useAppSelector } from '../../hooks/useStore'
import { selectUser } from '../../store/reducers/user/userSlice'

const Profile: NextPage = () => {
  const { user, userData } = useAppSelector(selectUser)
  console.log('user:', user)
  console.log('userData:', userData)
  return (
    <ProfileLayout title="Информация о пользователе">
      {user && Object.keys(user).map((key) => (
        <div key={key}>
          {key}: {user[key]}
          <hr />
        </div>
      ))}
    </ProfileLayout>
  )
}

export default Profile
