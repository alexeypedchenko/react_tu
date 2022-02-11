import React, { useState } from 'react'
import styles from './ProfileRoute.module.scss'
import Filter from '../../Filter/Filter'
import PlaceList from '../../Place/PlaceList/PlaceList'

const ProfileRoute = () => {
  const [showPlaces, setShowPlaces] = useState(false)
  const [createNew, setCreateNew] = useState(false)
  const [places, setPlaces] = useState([])

  const selectedPlace = (place) => {
    if (places.includes(place.id)) return
    setPlaces([...places, place.id])
  }
  const clearPlace = (placeId) => {
    setPlaces([...places.filter((place) => place !== placeId)])
  }

  return (
    <div>
      {createNew ? (
        <div>
          {/* actions */}
          <div style={{display: 'flex', marginBottom: 20}}>
            <button style={{marginRight: 10}} onClick={() => setCreateNew(false)}>Сохранить</button>
            <button onClick={() => setCreateNew(false)}>Назад</button>
          </div>

          {/* Название */}
          <div>
            <h4 style={{marginBottom: 10}}>Название маршрута</h4>
            <input style={{width: '100%', padding: 10}} type="text" placeholder="Название маршрута" />
            <br />
            <br />
            <h4 style={{marginBottom: 10}}>Описание маршрута</h4>
            <textarea style={{width: '100%', padding: 10}} cols="30" rows="10" placeholder="Описание маршрута"></textarea>
            <br />
            <br />
          </div>

          {/* places */}
          <div>
            {places.map((place) => (
              <div key={place}>
                <div onClick={() => clearPlace(place)}>close</div>
                {place}
              </div>
            ))}
          </div>

          {/* places list */}
          <div>
            <button style={{marginBottom: 10}} onClick={() => setShowPlaces(!showPlaces)}>
              {showPlaces ? 'Скрыть' : 'Выбрать' } локации
            </button>
            {showPlaces && (
              <div>
                <Filter />
                <div className={styles.places}>
                  <PlaceList onClick={selectedPlace} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3>Ваши маршруты:</h3>
          <button onClick={() => setCreateNew(true)}>Создать новый</button>
        </div>
      )}
    </div>
  )
}

export default ProfileRoute