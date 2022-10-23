import {ImageResponse} from '@vercel/og'
import {ReactNode} from 'react'
import {randomEmojis} from '../../../lib/emoji'
import {fonts} from '../../../lib/fonts'

export const config = {
  runtime: 'experimental-edge',
}

const Container = ({children}: {children: ReactNode}) => {
  return (
    <div
      style={{
        fontFamily: 'Inter',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        fontSize: 70,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  )
}

const Text = ({children}: {children: ReactNode}) => {
  return (
    <div
      style={{
        fontSize: 164,
        fontWeight: 900,
        background: 'white',
        padding: '0 43px',
      }}
    >
      {children}
    </div>
  )
}

const EmojiGrid = ({width, height}: {width: number; height: number}) => {
  const emoji = randomEmojis(136)

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        position: 'absolute',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        top: 0,
        left: 0,
        width,
        height,
        fontSize: 70,
      }}
    >
      {emoji.map((e, i) => (
        <span key={`${i}.${e}`}>{e}</span>
      ))}
    </div>
  )
}

export default async function GrowLoveImage() {
  const fontsData = await fonts()
  const width = 1200
  const height = 675

  return new ImageResponse(
    (
      <Container>
        <EmojiGrid width={width} height={height} />
        <Text>GrowLove</Text>
      </Container>
    ),
    {
      width,
      height,
      emoji: 'openmoji',
      fonts: fontsData,
    },
  )
}
