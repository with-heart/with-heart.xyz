import {MDXProvider} from '@mdx-js/react'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {components} from '../components'
import {Layout} from '../layout'
import '../styles/global.scss'

function MyApp({
  Component,
  pageProps,
}: AppProps<{title: string; description: string}>) {
  const title = pageProps.title ? `${pageProps.title} | 🌱❤️‍🔥` : '🌱❤️‍🔥'
  const image = `https://with-heart.xyz/api/img/bordered?title=${pageProps.title}&description=${pageProps.description}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={pageProps.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@grow_love" />
        <meta name="twitter:creator" content="@grow_love" />
        <meta name="twitter:title" content={pageProps.title} />
        <meta name="twitter:description" content={pageProps.description} />
        <meta name="twitter:image" content={image} />
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
