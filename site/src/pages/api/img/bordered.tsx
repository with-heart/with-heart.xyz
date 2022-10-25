import {slate} from '@radix-ui/colors'
import {ImageResponse} from '@vercel/og'
import {NextRequest} from 'next/server'
import {ReactNode} from 'react'
import {randomEmojis} from '../../../lib/emoji'
import {fonts} from '../../../lib/fonts'

export const config = {
  runtime: 'experimental-edge',
}

const Row = ({emoji, side}: {emoji: string[]; side: 'top' | 'bottom'}) => {
  const containerProps = side === 'top' ? {top: 0} : {bottom: 0}

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        ...containerProps,
      }}
    >
      {emoji.map((emoji, i) => (
        <span key={`${i}.${emoji}`}>{emoji}</span>
      ))}
    </div>
  )
}

const Column = ({emoji, side}: {emoji: string[]; side: 'left' | 'right'}) => {
  const containerProps = side === 'left' ? {left: 0} : {right: 0}

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'space-around',
        height: '100%',
        padding: '70px 0',
        top: 0,
        ...containerProps,
      }}
    >
      {emoji.map((emoji, i) => (
        <span key={`${i}.${emoji}`}>{emoji}</span>
      ))}
    </div>
  )
}

const Borders = ({
  width,
  height,
  size = 70,
}: {
  width: number
  height: number
  size: number
}) => {
  const xCount = Math.floor(width / size)
  const yCount = Math.floor(height / size - 2)
  const [top, right, bottom, left] = [
    randomEmojis(xCount),
    randomEmojis(yCount),
    randomEmojis(xCount),
    randomEmojis(yCount),
  ]

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        fontSize: size,
        width,
        height,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Row emoji={top} side="top" />
      <Row emoji={bottom} side="bottom" />
      <Column emoji={left} side="left" />
      <Column emoji={right} side="right" />
    </div>
  )
}

const Content = ({children}: {children: ReactNode}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '75vw',
        lineHeight: 1.5,
        paddingBottom: 40,
      }}
    >
      {children}
    </div>
  )
}

const Title = ({children}: {children: string}) => {
  const fontSize =
    children.length <= 20
      ? 80
      : children.length <= 30
      ? 60
      : children.length <= 45
      ? 40
      : children.length <= 100
      ? 40
      : 30

  return (
    <div
      style={{
        display: 'flex',
        fontSize,
        fontWeight: 900,
        marginBottom: '1.5rem',
        lineHeight: 1.2,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}

const Text = ({children}: {children: string}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'baseline',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        fontSize: 40,
        maxWidth: '80vw',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}

export default async function BorderedImage(req: NextRequest) {
  const fontsData = await fonts()

  const width = 1200
  const height = 675

  const {searchParams} = new URL(req.url)
  const title = searchParams.get('title') ?? ''
  const description = searchParams.get('description') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontSize: 70,
          fontFamily: 'SF',
          color: slate.slate12,
          backgroundColor: slate.slate1,
        }}
      >
        <Borders width={width} height={height} size={70} />
        <Content>
          <Title>{title}</Title>
          <Text>{description}</Text>
        </Content>
        <div
          style={{
            position: 'absolute',
            bottom: 88,
            color: slate.slate11,
            left: '50%',
            fontSize: 36,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            transform: 'translateX(-50%)',
          }}
        >
          with-heart.xyz
        </div>
      </div>
    ),
    {
      width,
      height,
      emoji: 'openmoji',
      fonts: fontsData,
    },
  )
}
