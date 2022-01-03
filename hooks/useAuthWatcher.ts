import { useEffect } from 'react'
import { authWatcher } from '../firebase/firebaseAuth'
import { useActions } from './useStore'

export const useAuthWatcher = () => {
  const { setUser, setAuth } = useActions()

  useEffect(() => {
    authWatcher((user, isAuth) => {
      setUser(user)
      setAuth(isAuth)
    })
  }, [])
}
