import type {MDXComponents} from 'mdx/types'

export const components: MDXComponents = {
  code: (props) => {
    return <code>{props.children}</code>
  },
}
