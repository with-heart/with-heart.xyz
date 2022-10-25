import {ImageResponse} from '@vercel/og'
import {NextRequest} from 'next/server'

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
    case 1:
    default:
      return new ImageResponse(<div>Hello World</div>)
  }
}
