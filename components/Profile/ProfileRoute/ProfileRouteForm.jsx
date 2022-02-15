import React, { useMemo, useState } from 'react'
import styles from './ProfileRoute.module.scss'
import Filter from '../../Filter/Filter'
import PlaceList from '../../Place/PlaceList/PlaceList'
import PlaceItem from '../../Place/PlaceItem/PlaceItem'
import Datepicker from '../../UI/Datepicker/Datepicker'
import { useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'

import { addDbDoc, updateDbDoc } from '../../../firebase/firebaseFirestore'
import { selectUser } from '../../../store/reducers/user/userSlice'
import ConfirmAction from '../../common/ConfirmAction/ConfirmAction'
import { getCountDays } from '../../../utils/functions'

const RouteModel = {
  active: false,
  name: 'Name',
  description: 'Description',
  startDate: new Date(),
  endDate: new Date(),
  days: 1,
  places: [],
}

const ProfileRoute = ({ editedRoute, onCancel, onSuccess }) => {
  const { places: allPlaces } = useAppSelector(selectPlace)
  const { user } = useAppSelector(selectUser)
  const [showPlaces, setShowPlaces] = useState(false)
  const [route, setRoute] = useState(editedRoute ? {
    ...editedRoute,
    startDate: new Date(editedRoute.startDate),
    endDate: new Date(editedRoute.endDate),
  } : RouteModel)

  const selectedPlace = (place) => {
    if (route.places.includes(place.id)) return
    setRoute({
      ...route,
      places: [...route.places, place.id]
    })
  }

  const clearPlace = (placeId) => {
    setRoute({
      ...route,
      places: [...route.places.filter((place) => place !== placeId)]
    })
  }

  const locations = useMemo(() => {
    return route?.places?.map((placeId) => {
      const index = allPlaces.findIndex((place) => place.id === placeId)
      return allPlaces[index]
    }) || []
  }, [allPlaces, route?.places])

  const onSave = () => {
    const collectionName = 'customRoutes'

    const customRoute = {
      ...route,
      author: user.id,
      name: route.name,
      description: route.description,
      startDate: `${route.startDate}`,
      endDate: `${route.endDate}`,
      days: getCountDays(route.startDate, route.endDate),
      places: route.places,
    }

    if (editedRoute) {
      updateDbDoc(collectionName, route.id, customRoute).then(() => {
        onSuccess(customRoute)
        onCancel()
      })
      return
    }

    addDbDoc(collectionName, customRoute).then((id) => {
      customRoute.id = id
      onSuccess(customRoute)
      onCancel()
    })
  }

  return (
    <div>
      {/* actions */}
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <button style={{ marginRight: 10 }} onClick={onSave}>Сохранить</button>
        <button onClick={onCancel}>Назад</button>
      </div>

      {/* filters */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginBottom: 10 }}>Даты маршрута:</h4>
        <Datepicker
          startDate={route.startDate}
          endDate={route.endDate}
          setStartDate={(startDate) => setRoute({...route, startDate})}
          setEndDate={(endDate) => setRoute({...route, endDate})}
        />
      </div>

      {/* Название */}
      <div>
        <h4 style={{ marginBottom: 10 }}>Название маршрута</h4>
        <input
          style={{ width: '100%', padding: 10 }}
          type="text"
          placeholder="Название маршрута"
          value={route.name}
          onChange={(event) => setRoute({...route, name: event.target.value})}
        />
        <br />
        <br />
        <h4 style={{ marginBottom: 10 }}>Описание маршрута</h4>
        <textarea
          style={{ width: '100%', padding: 10 }}
          cols="30"
          rows="10"
          placeholder="Описание маршрута"
          value={route.description}
          onChange={(event) => setRoute({...route, description: event.target.value})}
        ></textarea>
        <br />
        <br />
      </div>

      {/* route */}
      <h4 style={{ marginBottom: 10 }}>Ваш маршрут:</h4>
      <div className={styles.route}>
        {locations.map((place) => (
          <div key={place} className={styles.place}>
            <ConfirmAction
              showDialog
              text="Удалить маршрут?"
              action={() => clearPlace(place.id)}
              tag="button"
            >
              Удалить
            </ConfirmAction>
            <PlaceItem small place={place} />
          </div>
        ))}
      </div>

      {/* places list */}
      <div>
        <button style={{ marginBottom: 10 }} onClick={() => setShowPlaces(!showPlaces)}>
          {showPlaces ? 'Скрыть' : 'Выбрать'} локации
        </button>
        {showPlaces && (
          <div>
            <Filter />
            <div className={styles.places}>
              <PlaceList showOnMap onClick={selectedPlace} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ProfileRoute.defaultProps = {
  editedRoute: false,
}

export default ProfileRoute
