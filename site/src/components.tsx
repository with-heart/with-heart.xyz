import type {MDXComponents} from 'mdx/types'
import {ResponsiveImage} from './responsive-image'

export const components: MDXComponents = {
  code: (props) => {
    return <code>{props.children}</code>
  },
  img: (props) => {
    // @ts-expect-error
    return <ResponsiveImage {...props} />
  },
  Image: (props) => {
    return <ResponsiveImage {...props} />
  },
  JoinCode: (props) => {
    return <span className="join-code">⬇️</span>
  },
}
