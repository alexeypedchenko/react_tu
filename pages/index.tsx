import type { NextPage } from 'next'
import ConfirmAction from '../components/common/ConfirmAction/ConfirmAction'

const Home: NextPage = () => {
  const action = () => {
    console.log('action')
  }

  return (
    <div>
      <h1>hello from project of dream!</h1>

      <ConfirmAction condition={false} action={action}>
        <button>some action</button>
      </ConfirmAction>
    </div>
  )
}

export default Home
