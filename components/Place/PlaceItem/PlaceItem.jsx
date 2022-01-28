import React from 'react'
import Link from 'next/link'
import styles from './PlaceItem.module.scss'

const PlaceItem = ({ place, active, onClick, onMouseEnter, onMouseLeave }) => {
  const createdAt = new Date(place.createdAt).toLocaleDateString('uk-UA')
  return (
    <div
      className={`${styles.item} ${active ? styles.itemActive : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        className={styles.image}
        src={place.image}
        alt={place.name}
      />

      <div className={styles.body}>
        <div className={styles.topbar}>
          {place.tags.length && (
            <div className={styles.tags}>
              {place.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
          <span className={styles.like}>
            ★
            {/* ☆ */}
          </span>
        </div>


        <span className={styles.name}>
          {place.name}
        </span>

        <span className={styles.description}>
          {place.description}
        </span>



        <Link href={`/places/${place.id}`}>
          <a className={styles.more} onClick={(event) => event.stopPropagation()}>
            Подробнее
          </a>
        </Link>

        {/* <span className={styles.date}>
          {createdAt}
        </span> */}
      </div>
    </div>
  )
}

export default PlaceItem
