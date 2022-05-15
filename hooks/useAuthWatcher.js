import { useEffect } from 'react'
import { authWatcher } from '../firebase/firebaseAuth'
import { useActions } from './useStore'

export const useAuthWatcher = () => {
  const { setUser, setAuth, fetchUserData, clearUserData } = useActions()

  useEffect(() => {
    authWatcher((user, isAuth) => {
      setUser(user)
      setAuth(isAuth)
      if (isAuth) {
        fetchUserData(user.id)
      } else {
        clearUserData()
      }
    })
  }, [])
}
