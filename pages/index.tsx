import type {NextPage} from 'next'
import Head from 'next/head'
import {Box} from '../components/Box'
import {styled} from '../stitches.config'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>with-heart.xyz</title>
        <meta name="description" content="with-heart HQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box
          css={{
            display: 'grid',
            minHeight: '100vh',
            placeContent: 'center',
            textAlign: 'center',
            fontSize: '2rem',
            gap: '1rem',
          }}
        >
          <div>There&apos;s nothing to see here... yet.</div>
          <Box
            css={{
              fontSize: '4rem',
            }}
          >
            🌱❤️‍🔥
          </Box>
        </Box>
      </main>
    </div>
  )
}

export default Home
