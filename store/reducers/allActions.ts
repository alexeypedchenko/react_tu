import { userActions } from "./user/userSlice"
import { placeActions } from "./place/placeSlice"

export const allActions = {
  ...userActions,
  ...placeActions,
}
