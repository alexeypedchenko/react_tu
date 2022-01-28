import React, { useEffect } from 'react'
import styles from './Filter.module.scss'
import { useActions, useAppSelector } from '../../hooks/useStore'
import { selectPlace } from '../../store/reducers/place/placeSlice'
import FilterItem from './FilterItem'

const Filter = () => {
  const { setFilter, setFilteredPlaces } = useActions()
  const { filter, places, filterList } = useAppSelector(selectPlace)

  const handleCHange = (event) => {
    const { name, value } = event.target
    setFilter({ name, value })
  }

  useEffect(() => {
    setFilteredPlaces({ places, filter })
  }, [filter])

  return (
    <div className={styles.filter}>
      <div className={styles.list}>
        <div className={styles.item}>
          <span>Название:</span>
          <input
            type="text"
            name="name"
            value={filter.name}
            onChange={handleCHange}
            autoComplete="off"
          />
        </div>

        {Object.keys(filterList).map((key) => (
          <FilterItem
            key={key}
            name={key}
            list={filterList[key]}
            onChange={handleCHange}
            value={filter[key]}
          />
        ))}
      </div>
      {/* <pre>{JSON.stringify(filter)}</pre> */}
    </div>
  )
}

export default Filter
