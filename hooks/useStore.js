import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { allActions } from '../store/reducers/allActions'

export const useAppSelector = useSelector

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(allActions, dispatch)
}
