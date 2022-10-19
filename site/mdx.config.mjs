import {nodeTypes} from '@mdx-js/mdx'
import withMdx from '@next/mdx'
import rehypeRaw from 'rehype-raw'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkShikiTwoslash from 'remark-shiki-twoslash'

/** @type {import('remark-shiki-twoslash').Options} */
const remarkShikiTwoslashOptions = {
  includeJSDocInHover: true,
  defaultCompilerOptions: {
    target: 'LATEST',
  },
  theme: 'github-light',
}

export default withMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkShikiTwoslash.default, remarkShikiTwoslashOptions],
      [remarkFrontmatter],
      [remarkMdxFrontmatter],
    ],
    rehypePlugins: [[rehypeRaw, {passThrough: nodeTypes}]],
    providerImportSource: '@mdx-js/react',
  },
})
