import React from 'react'
import styles from './Filter.module.scss'
import FilterItem from './FilterItem'

const Filter = ({ setFilter, filter, filterList, children }) => {
  const handleCHange = (event) => {
    const { name, value } = event.target
    setFilter({ name, value })
  }

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

      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

export default Filter
