import {grayDark} from '@radix-ui/colors'
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
      ...grayDark,
    },
  },
})

export const globalStyles = globalCss({
  html: {
    fontFamily: '$body',
  },
  body: {
    color: '$gray12',
    backgroundColor: '$gray2',
  },
  '*': {
    margin: 0,
    padding: 0,
  },
})
