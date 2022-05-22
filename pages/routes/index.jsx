import React from 'react'
import { useSelector } from 'react-redux'
import styles from './routes.module.scss'
import Filter from '../../components/Filter/Filter'
import RouteItem from '../../components/Route/RouteItem/RouteItem'
import { useActions } from '../../hooks/useStore'
import { selectRoute } from '../../store/reducers/route/routeSlice'

const Routes = () => {
  const { filteredRoutes, filter, filterList } = useSelector(selectRoute)
  const { setRouteFilter } = useActions()

  return (
    <div>
      <br />

      <Filter setFilter={setRouteFilter} filter={filter} filterList={filterList} />

      <br />
      <br />

      <div className={styles.list}>
        {filteredRoutes.map((route) => (
          <RouteItem route={route} key={route.id} />
        ))}
      </div>
    </div>
  )
}

export default Routes
