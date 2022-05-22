import ProfileLayout from '../../components/Profile/ProfileLayout/ProfileLayout'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/reducers/user/userSlice'

const Profile = () => {
  const { user, userData } = useSelector(selectUser)
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
