import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'
import PlacePage from '../../../components/Place/PlacePage/PlacePage'

// if fetchPlace is active
// useEffect(() => {
//   if (!error) return
//   router.push('/places')
//   clearError()
// }, [error])

const Index = () => {
  const router = useRouter()
  const { slug } = router.query
  const { fetchPlace, clearError } = useActions()
  const { places, load, error } = useAppSelector(selectPlace)
  const [place, setPlace] = useState(null)

  useEffect(() => {
    if (!slug) return
    const index = places.findIndex((place) => place.id === slug)

    if (index !== -1) {
      setPlace(places[index])
    }

    if (index === -1 && places.length > 0) {
      console.log('index === -1 && places.length > 0:')
      router.push('/places')
    }
  }, [slug, places])

  if (load || !place) {
    return (<h1>Loading...</h1>)
  }

  return (
    <div>
      slug: {slug}
      <PlacePage place={place} />
    </div>
  )
}

export default Index
