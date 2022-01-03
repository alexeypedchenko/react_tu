import userReducer from './user/userSlice'
import authReducer from './auth/authSlice'

const rootReducer = {
  user: userReducer,
  auth: authReducer
}

export default rootReducer
