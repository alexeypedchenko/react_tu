import React from 'react'
import { useSelector } from 'react-redux'
import ProfileLayout from '../../../components/Profile/ProfileLayout/ProfileLayout'
import ProfileRoute from '../../../components/Profile/ProfileRoute/ProfileRoute'
import { selectUser } from '../../../store/reducers/user/userSlice'

const CustomRoutes = () => {
  const { user, userData } = useSelector(selectUser)
  return (
    <ProfileLayout title="Маршруты">
      <ProfileRoute />
    </ProfileLayout>
  )
}

export default CustomRoutes
