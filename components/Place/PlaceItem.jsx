import React from 'react'
import styles from './Place.module.scss'

const PlaceItem = ({place, active, onClick, onMouseEnter, onMouseLeave}) => {
  return (
    <div
      className={`${styles.item} ${active ? styles.itemActive: ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={place.image} alt={place.name} />
      <span>
        {place.name}
      </span>

      <span>
        {place.description}
      </span>

      <span>
        {place.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </span>
    </div>
  )
}

export default PlaceItem
