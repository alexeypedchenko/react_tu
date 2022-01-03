import { bindActionCreators } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { allActions } from '../store/reducers/allActions'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(allActions, dispatch)
}
