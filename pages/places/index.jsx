import styles from './styles.module.scss'
import PlaceMap from '../../components/Place/PlaceMap/PlaceMap'
import Filter from '../../components/Filter/Filter'
import PlaceList from '../../components/Place/PlaceList/PlaceList'

import { useActions, useAppSelector } from '../../hooks/useStore'
import { selectPlace} from '../../store/reducers/place/placeSlice'

const Places = () => {
  const { setPlaceFilter } = useActions()
  const { filter, filterList } = useAppSelector(selectPlace)

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <Filter setFilter={setPlaceFilter} filter={filter} filterList={filterList} />
      </div>

      <div className={styles.body}>
        <div className={styles.placesColumn}>
          <PlaceList />
        </div>
        <div className={styles.map}>
          <PlaceMap />
        </div>
      </div>
    </div>
  )
}

export default Places
