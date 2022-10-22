import Image from 'next/image'
import {forwardRef} from 'react'

export type GrowType = typeof plants[number]
export type LoveType = typeof hearts[number]

export type GrowProps = {plant?: GrowType}
export type LoveProps = {heart?: LoveType}

const plants = [
  'blossom',
  'cactus',
  'cherry-blossom',
  'deciduous-tree',
  'evergreen-tree',
  'four-leaf-clover',
  'herb',
  'hibiscus',
  'leaf-fluttering-in-wind',
  'lotus',
  'palm-tree',
  'rose',
  'rosette',
  'seedling',
  'sunflower',
  'tulip',
] as const

const hearts = [
  'beating-heart',
  'blue-heart',
  'green-heart',
  'growing-heart',
  'heart-on-fire',
  'heart-with-arrow',
  'heart-with-ribbon',
  'purple-heart',
  'red-heart',
  'revolving-hearts',
  'sparkling-heart',
  'two-hearts',
  'white-heart',
  'yellow-heart',
] as const

const Img = ({src}: {src: string}) => {
  return (
    <Image src={src} alt="" width="72px" height="72px" layout="responsive" />
  )
}

export const Grow = ({plant}: GrowProps) => {
  const name = plant ?? randomItemFrom(plants)
  const file = `/plants/${name}.svg`

  return (
    <div className="grow">
      <Img src={file} />
    </div>
  )
}

export const Love = ({heart}: LoveProps) => {
  const name = heart ?? randomItemFrom(hearts)
  const file = `/hearts/${name}.svg`

  return (
    <div className="love">
      <Img src={file} />
    </div>
  )
}

export const GrowLove = forwardRef<HTMLDivElement, {randomize?: boolean}>(
  ({randomize}, ref) => {
    return (
      <div ref={ref} className="growlove">
        <Grow plant={randomize ? undefined : 'seedling'} />
        <Love heart={randomize ? undefined : 'heart-on-fire'} />
      </div>
    )
  },
)
GrowLove.displayName = 'GrowLove'

const randomItemFrom = (xs: readonly any[]) => {
  return xs[Math.floor(Math.random() * xs.length)]
}
