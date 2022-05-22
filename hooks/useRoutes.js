import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from './useStore'
import { selectRoute } from '../store/reducers/route/routeSlice'

export const useRoutes = () => {
  const { filter } = useSelector(selectRoute)
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
