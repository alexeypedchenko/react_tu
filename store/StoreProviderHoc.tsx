import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

const StoreProviderHoc: FC = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default StoreProviderHoc
