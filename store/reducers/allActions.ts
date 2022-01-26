import { userActions } from "./user/userSlice"
import { placeActions } from "./place/placeSlice"
import { pageActions } from "./page/pageSlice"

export const allActions = {
  ...userActions,
  ...placeActions,
  ...pageActions,
}
