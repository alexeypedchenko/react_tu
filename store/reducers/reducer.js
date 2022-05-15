import user from './user/userSlice'
import page from './page/pageSlice'
import place from './place/placeSlice'
import route from './route/routeSlice'

const rootReducer = {
  user,
  place,
  page,
  route,
}

export default rootReducer
