import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Signin from '../../components/Signin/Signin'
import { selectUser } from '../../store/reducers/user/userSlice'

const Login = () => {
  const { isAuth } = useSelector(selectUser)
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.push('/profile')
    }
  }, [isAuth])

  return (
    <div>
      <h1>Login page</h1>
      <Signin />
    </div>
  )
}

export default Login
