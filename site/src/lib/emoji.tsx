export type PlantKind = keyof typeof plants

export type HeartKind = keyof typeof hearts

export type AllKind = PlantKind | HeartKind

export const plants = {
  blossom: '🌼',
  cactus: '🌵',
  'cherry-blossom': '🌸',
  'deciduous-tree': '🌳',
  'evergreen-tree': '🌲',
  'four-leaf-clover': '🍀',
  herb: '🌿',
  hibiscus: '🌺',
  'leaf-fluttering-in-wind': '🍃',
  'palm-tree': '🌴',
  rose: '🌹',
  seedling: '🌱',
  sunflower: '🌻',
  tulip: '🌷',
} as const
export const plantsKeys = Object.keys(
  plants,
) as unknown as (keyof typeof plants)[]

export const hearts = {
  'beating-heart': '💓',
  'blue-heart': '💙',
  'green-heart': '💚',
  'growing-heart': '💗',
  // 'heart-on-fire': '❤️‍🔥',
  'heart-with-arrow': '💘',
  'heart-with-ribbon': '💝',
  'purple-heart': '💜',
  'red-heart': '❤️',
  'revolving-hearts': '💞',
  'sparkling-heart': '💖',
  'two-hearts': '💕',
  'white-heart': '🤍',
  'yellow-heart': '💛',
} as const
export const heartsKeys = Object.keys(
  hearts,
) as unknown as (keyof typeof hearts)[]

export const all = {
  ...plants,
  ...hearts,
} as const

export const randomFrom = <Kind extends string>(list: Kind[]): Kind => {
  return list[Math.floor(Math.random() * list.length)]
}

export const randomEmojis = (
  length: number,
  source: Record<string, string> = all,
): string[] => {
  const values = Object.values(source)
  const emojis: string[] = []
  let currentIndex = length

  while (currentIndex-- !== 0) {
    emojis.push(randomFrom(values))
  }

  return emojis
}

export const randomEmoji = (source: Record<string, string> = all) => {
  return randomEmojis(1, source)[0]
}

export const randomPlantEmoji = () => {
  return randomEmoji(plants)
}

export const randomHeartEmoji = () => {
  return randomEmoji(hearts)
}
