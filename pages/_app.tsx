import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/common/Layout/Layout'
import StoreProviderHoc from '../store/StoreProviderHoc'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <StoreProviderHoc>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProviderHoc>
  )
}

export default MyApp
