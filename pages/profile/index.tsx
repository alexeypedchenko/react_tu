import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useStore'
import { selectUser } from '../../store/reducers/user/userSlice'

const Profile: NextPage = () => {
  const { isAuth } = useAppSelector(selectUser)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])

  return (
    <div>
      Profile page
    </div>
  )
}

export default Profile
