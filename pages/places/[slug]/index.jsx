import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'
import PlacePage from '../../../components/Place/PlacePage/PlacePage'
import { selectPage } from '../../../store/reducers/page/pageSlice'

// if fetchPlace is active
// useEffect(() => {
//   if (!error) return
//   router.push('/places')
//   clearError()
// }, [error])

const Index = () => {
  const router = useRouter()
  const { slug } = router.query
  const { fetchPage } = useActions()
  const { places } = useAppSelector(selectPlace)
  const { pages, load, error } = useAppSelector(selectPage)

  const [place, setPlace] = useState(null)
  const [page, setPage] = useState(null)

  useEffect(() => {
    if (!slug) return
    const pageIndex = pages.findIndex((place) => place.id === slug)
    if (pageIndex !== -1) {
      setPage(pages[pageIndex])
    } else {
      fetchPage(slug)
    }
  }, [slug, pages])

  useEffect(() => {
    if (!slug) return
    const placeIndex = places.findIndex((place) => place.id === slug)
    if (placeIndex !== -1) {
      setPlace(places[placeIndex])
    }

    if (placeIndex === -1 && places.length > 0) {
      console.log('placeIndex === -1 && places.length > 0:')
      router.push('/places')
    }
  }, [slug, places])

  if (load || !place) {
    return (<h1>Loading...</h1>)
  }

  return (
    <div>
      {/* slug: {slug} */}
      <PlacePage place={place} page={page} />
    </div>
  )
}

export default Index
