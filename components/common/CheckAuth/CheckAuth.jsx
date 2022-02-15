import React, { useEffect, useState } from 'react';
import Modal from '../../UI/Modal/Modal'
import { useAppSelector } from '../../../hooks/useStore'
import { selectUser } from '../../../store/reducers/user/userSlice'
import Signin from '../../Signin/Signin';

const CheckAuth = ({ action, children }) => {
  const { isAuth, userDataLoad } = useAppSelector(selectUser)
  const [modalOpen, setModapOpen] = useState(false)

  const handleClick = (event) => {
    if (userDataLoad) return

    if (!isAuth) {
      event.stopPropagation()
      event.preventDefault()
      setModapOpen(true)
      console.log('you need to auth')
    }
  }

  useEffect(() => {
    if (isAuth) {
      setModapOpen(false)
    }
  }, [isAuth])

  return (
    <>
      <div onClickCapture={handleClick}>
        {children}
      </div>
      <Modal open={modalOpen} setOpen={() => setModapOpen(false)}>
        <Signin />
      </Modal>
    </>
  );
};

CheckAuth.defaultProps = {
  action: () => { }
}

export default CheckAuth;
