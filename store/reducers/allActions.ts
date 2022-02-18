import { userActions } from "./user/userSlice"
import { pageActions } from "./page/pageSlice"
import { placeActions } from "./place/placeSlice"
import { routeActions } from "./route/routeSlice"

export const allActions = {
  ...userActions,
  ...placeActions,
  ...pageActions,
  ...routeActions,
}
