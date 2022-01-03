import {gray} from '@radix-ui/colors'
import {createStitches} from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    fonts: {
      body: 'system-ui',
    },
    colors: {
      ...gray,
    },
  },
})

export const globalStyles = globalCss({
  html: {
    fontFamily: '$body',
  },
  '*': {
    margin: 0,
    padding: 0,
  },
})
