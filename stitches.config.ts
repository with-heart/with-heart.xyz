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
      system: 'system-ui',
    },
    colors: {
      ...gray,
    },
  },
})
