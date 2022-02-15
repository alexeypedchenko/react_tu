import React, { useEffect, useState } from 'react'
import { deleteDbDoc, getDbDocsByField, updateDbDoc } from '../../../firebase/firebaseFirestore'
import { useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'
import ConfirmAction from '../../common/ConfirmAction/ConfirmAction'
import ProfileRouteForm from './ProfileRouteForm'

const collectionName = 'customRoutes'

const ProfileRoute = () => {
  const { user } = useAppSelector(selectUser)
  const [createNew, setCreateNew] = useState(false)
  const [routes, setRoutes] = useState([])
  const [editedRoute, setEditedRoute] = useState(null)

  useEffect(() => {
    if (!user) return
    const field = 'author'
    const value = user.id
    getDbDocsByField(collectionName, field, value).then(setRoutes)
  }, [user])

  const updateRoutes = (route) => {
    const index = routes.findIndex((rt) => rt.id === route.id)
    if (index !== -1) {
      routes[index] = route
      setRoutes([...routes])
    } else {
      setRoutes([...routes, route])
    }
  }

  const deleteRoute = (route) => {
    deleteDbDoc(collectionName, route.id).then(() => {
      setRoutes([...routes.filter((rt) => rt.id !== route.id)])
    })
  }

  const setRouteActive = (route, checked) => {
    if (checked && routes.find((rt) => rt.active)) {
      alert('У вас не может быть более одного активного маршрута!')
      return
    }

    const index = routes.findIndex((rt) => rt.id === route.id)
    route.active = checked
    updateDbDoc(collectionName, route.id, route).then(() => {
      routes[index] = route
      setRoutes([...routes])
    })
  }

  if (!createNew) return (
    <div>
      <button
        onClick={() => setCreateNew(true)}
        style={{ marginBottom: 20 }}
      >
        Создать новый
      </button>

      <h3>Ваши маршруты:</h3>
      <div>
        {routes.map((route) => (
          <div
            key={route.id}
            style={{
              border: '1px solid #000',
              marginBottom: 10,
              padding: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 10
            }}>
              <h3>{route.name}</h3>
              <div>
                <ConfirmAction
                  showDialog
                  text="Удалить маршрут?"
                  action={() => deleteRoute(route)}
                  tag="button"
                  style={{ marginRight: 10 }}
                >
                  Удалить
                </ConfirmAction>
                <button onClick={() => {
                  setEditedRoute(route)
                  setCreateNew(true)
                }}>
                  Редактировать
                </button>
              </div>
            </div>
            <h4>{route.description}</h4>
            <label style={{
              color: route.active ? 'green' : 'inherit',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid black',
              padding: '5px 10px',
            }}>
              {route.active ? 'Опубликован' : 'Опубликовать'}
              <input
                type="checkbox"
                checked={route.active}
                onChange={(event) => setRouteActive(route, event.target.checked)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <ProfileRouteForm
      onCancel={() => {
        setCreateNew(false)
        setEditedRoute(null)
      }}
      onSuccess={updateRoutes}
      editedRoute={editedRoute}
    />
  )
}

export default ProfileRoute
