import type {MDXComponents} from 'mdx/types'

export const components: MDXComponents = {
  code: (props) => {
    return <code>{props.children}</code>
  },
  JoinCode: (props) => {
    return <span className="join-code">⬇️</span>
  },
}
