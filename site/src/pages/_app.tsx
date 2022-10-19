import {MDXProvider} from '@mdx-js/react'
import type {AppProps} from 'next/app'
import {components} from '../components'
import {Layout} from '../layout'
import '../styles/global.scss'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Layout>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Layout>
  )
}

export default MyApp
