import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Signin from '../../components/Signin/Signin'
import { useAppSelector } from '../../hooks/useStore'

const Login: NextPage = () => {
  const { isAuth } = useAppSelector((state) => state.user)
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
