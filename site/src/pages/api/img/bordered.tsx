import {slate} from '@radix-ui/colors'
import {ImageResponse} from '@vercel/og'
import {NextRequest} from 'next/server'
import {ReactNode} from 'react'
import {randomEmojis} from '../../../lib/emoji'
import {fonts} from '../../../lib/fonts'

interface TextBlock {
  type: 'text' | 'code'
  words: string[]
}

type Index = [start: number, end: number]

type RegExpMatch = RegExpExecArray & {indices: Index[]}
type RegExpMatches = RegExpMatch[]

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
      }}
    >
      {children}
    </div>
  )
}

const Title = ({children}: {children: ReactNode}) => {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 80,
        fontWeight: 900,
        marginBottom: '1.5rem',
        lineHeight: 1.3,
      }}
    >
      {children}
    </div>
  )
}

const codeRegex = /`(.*?)`/dgm

const processText = (string: string): TextBlock[] => {
  let match
  const matches: RegExpMatches = []

  do {
    match = codeRegex.exec(string)
    if (match) {
      matches.push(match as RegExpMatch)
    }
  } while (match)

  if (matches.length === 0) {
    return [
      {
        type: 'text',
        words: string.split(' '),
      },
    ]
  }

  const blocks: TextBlock[] = []
  const codeIndices = matches.map((match) => match.indices[0])

  codeIndices.forEach((codeIndex, i) => {
    const prevCodeIndex = codeIndices[i - 1] ?? [0, 0]
    const isLastCodeIndex = i === codeIndices.length - 1

    // create a text block from the end of the previous code index to the start
    // of the code index
    createBlock('text', string.substring(prevCodeIndex[1], codeIndex[0] - 1))

    // create a code block from the current code index
    createBlock('code', string.substring(codeIndex[0], codeIndex[1]))

    // this is the last code block, so create a text index from the end of the
    // code block to the end of `string`
    if (isLastCodeIndex) {
      if (codeIndex[1] >= string.length - 1) return

      createBlock('text', string.substring(codeIndex[1] + 1, string.length - 1))
    }
  })

  return blocks

  function createBlock(type: TextBlock['type'], string: string) {
    if (!(string.trim().length > 0)) return

    blocks.push({
      type,
      words: string
        .trim()
        .split(' ')
        .filter((w) => w.length > 0),
    })
  }
}

const Text = ({children}: {children: ReactNode}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'baseline',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        fontSize: 40,
        maxWidth: '80vw',
      }}
    >
      {children}
    </div>
  )
}

const Block = ({block}: {block: TextBlock}) => {
  if (block.type === 'code') {
    return (
      <span
        style={{
          fontFamily: 'Source Code Pro',
          marginRight: '0.2em',
        }}
      >
        {block.words.map((word, i) => (
          <span key={`${i}.${word}`}>{word}</span>
        ))}
      </span>
    )
  }

  return (
    <span style={{marginRight: '0.2em'}}>
      {block.words.map((word, i) => (
        <span style={{marginRight: '0.2em'}} key={`${i}.${word}`}>
          {word}
        </span>
      ))}
    </span>
  )
}

export default async function BorderedImage(req: NextRequest) {
  const fontsData = await fonts()

  const width = 1200
  const height = 675

  const {searchParams} = new URL(req.url)
  const title = searchParams.get('title') ?? 'Hello `World`'
  const description =
    searchParams.get('description') ??
    'Using `mdx` and `shiki-twoslash` to build some really, really, really cool shit like `with-heart.xyz`'

  const titleBlocks = processText(title)
  const descriptionBlocks = processText(description)

  // console.log('description', JSON.stringify(description), descriptionBlocks)

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
          <Title>
            {titleBlocks.map((block, i) => (
              <Block key={`${i}.${block.words.join('+')}`} block={block} />
            ))}
          </Title>
          <Text>
            {descriptionBlocks.map((block, i) => (
              <Block key={`${i}.${block.words.join('+')}`} block={block} />
            ))}
          </Text>
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
