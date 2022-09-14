import type {NextPage} from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>with-heart.xyz</title>
        <meta name="description" content="with-heart HQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome!</h1>
      </main>
    </div>
  )
}

export default Home
