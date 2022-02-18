import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useActions, useAppSelector } from '../../../hooks/useStore'
import { selectPage } from '../../../store/reducers/page/pageSlice'
import { selectRoute } from '../../../store/reducers/route/routeSlice'
import RoutePage from '../../../components/Route/RoutePage/RoutePage'

const Index = () => {
  const router = useRouter()
  const { slug } = router.query
  const { fetchPage } = useActions()
  const { routes } = useAppSelector(selectRoute)
  const { pages, load, error } = useAppSelector(selectPage)

  const [route, setRoute] = useState(null)
  const [page, setPage] = useState(null)

  useEffect(() => {
    if (!slug) return
    const pageIndex = pages.findIndex((page) => page.id === slug)
    if (pageIndex !== -1) {
      setPage(pages[pageIndex])
    } else {
      fetchPage(slug)
    }
  }, [slug, pages])

  useEffect(() => {
    if (!slug) return
    const index = routes.findIndex((route) => route.id === slug)
    if (index !== -1) {
      setRoute(routes[index])
    }

    if (index === -1 && routes.length > 0) {
      console.log('index === -1 && routes.length > 0:')
      router.push('/routes')
    }
  }, [slug, routes])

  return (
    <RoutePage route={route} page={page} />
  )
}

export default Index
