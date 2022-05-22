import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { allActions } from '../store/reducers/allActions'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(allActions, dispatch)
}
