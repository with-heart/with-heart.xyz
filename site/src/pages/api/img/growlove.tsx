import {ImageResponse} from '@vercel/og'
import {ReactNode} from 'react'

export const config = {
  runtime: 'experimental-edge',
}

const emoji = {
  plants: [
    '🌼',
    '🌵',
    '🌸',
    '🌳',
    '🌲',
    '🍀',
    '🌿',
    '🌺',
    '🍃',
    '🌴',
    '🌹',
    '🌱',
    '🌻',
    '🌷',
  ] as const,
  hearts: [
    '💓',
    '💙',
    '💚',
    '💗',
    // '❤️‍🔥',
    '💘',
    '💝',
    '💜',
    '❤️',
    '💞',
    '💖',
    '💕',
    '🤍',
    '💛',
  ] as const,
}

const all = [...emoji.hearts, ...emoji.plants]

const randomFrom = (list: readonly string[]): string => {
  return list[Math.floor(Math.random() * list.length)]
}

const generate = (list: readonly string[], length: number): string[] => {
  return Array.from({length}, () => randomFrom(list))
}

const Container = ({children}: {children: ReactNode}) => {
  return (
    <div
      style={{
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
        padding: '30px 50px 0 50px',
        marginTop: '10px',
        lineHeight: 0.9,
        background: 'white',
      }}
    >
      {children}
    </div>
  )
}

const EmojiGrid = ({width, height}: {width: number; height: number}) => {
  const emoji = generate(all, 138)

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
      }}
    >
      {emoji.map((e, i) => (
        <span key={`${i}.${e}`}>{e}</span>
      ))}
    </div>
  )
}

const font = fetch(
  new URL('../../../../assets/SF-Pro-Display-Black.otf', import.meta.url),
).then((res) => res.arrayBuffer())

export default async function GrowLoveImage() {
  const fontData = await font
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
      fonts: [
        {
          name: 'SF',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}
