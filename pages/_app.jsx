import '../styles/globals.scss'
import Layout from '../components/common/Layout/Layout'
import StoreProviderHoc from '../store/StoreProviderHoc'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProviderHoc>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProviderHoc>
  )
}

export default MyApp
