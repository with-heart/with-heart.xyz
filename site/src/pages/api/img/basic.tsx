import {ImageResponse} from '@vercel/og'
import {NextRequest} from 'next/server'
import {ReactNode} from 'react'

export const config = {
  runtime: 'experimental-edge',
}

export default function BasicImg(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const step = searchParams.get('step')
    ? Number(searchParams.get('step'))
    : undefined

  switch (step) {
    case 2:
      return new ImageResponse(<div>Hello World</div>, {
        width: 400,
        height: 200,
      })
    case 3:
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              backgroundColor: 'white',
              border: '1px solid black',
            }}
          >
            Hello World
          </div>
        ),
        {
          width: 400,
          height: 200,
        },
      )
    case 4: {
      const Container = ({children}: {children: ReactNode}) => (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            border: '1px solid black',
          }}
        >
          {children}
        </div>
      )

      const Text = ({children}: {children: ReactNode}) => (
        <div
          style={{
            fontSize: 64,
          }}
        >
          {children}
        </div>
      )

      return new ImageResponse(
        (
          <Container>
            <Text>Hello World</Text>
          </Container>
        ),
        {
          width: 400,
          height: 200,
        },
      )
    }
    case 1:
    default:
      return new ImageResponse(<div>Hello World</div>)
  }
}
