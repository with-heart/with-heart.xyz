import {MDXProvider} from '@mdx-js/react'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {components} from '../components'
import {Layout} from '../layout'
import '../styles/global.scss'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </>
  )
}

export default MyApp
