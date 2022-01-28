import React from 'react'
import styles from './Filter.module.scss'
import { filterRu } from '../../utils/translate'

const FilterItem = ({ name, list, onChange, value }) => {
  const clear = () => {
    const event = { target: { name, value: '' } }
    onChange(event)
  }

  return (
    <div className={styles.item}>
      <span>
        {filterRu[name]}:
        {value && (<button className={styles.clear} onClick={clear}>x</button>)}
      </span>

      <select value={value} name={name} onChange={onChange}>
        <option value="">
          Выберите {name}
        </option>
        {list.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterItem
