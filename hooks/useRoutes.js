import { useEffect } from 'react'
import { useActions, useAppSelector } from './useStore'
import { selectRoute } from '../store/reducers/route/routeSlice'

export const useRoutes = () => {
  const { filter } = useAppSelector(selectRoute)
  const { fetchRoutes, setRouteFilteredRoutes, setRouteFilterList } = useActions()

  useEffect(() => {
    fetchRoutes().then(() => {
      setRouteFilteredRoutes()
      setRouteFilterList()
    })
  }, [])

  useEffect(() => {
    setRouteFilteredRoutes()
  }, [filter])
}
