import React from 'react'
import Link from 'next/link'
import styles from './PlaceItem.module.scss'

const PlaceItem = ({ place, active, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`${styles.item} ${active ? styles.itemActive : ''}`}
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

      <Link href={`/places/${place.id}`}>
        <a className={styles.more} onClick={(event) => event.stopPropagation()}>
          Подробнее
        </a>
      </Link>
    </div>
  )
}

export default PlaceItem
