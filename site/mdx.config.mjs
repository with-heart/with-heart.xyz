import {nodeTypes} from '@mdx-js/mdx'
import withMdx from '@next/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
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

/** @type {import('rehype-autolink-headings').Options} */
const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap',
  test: (node) => {
    const isGrowLove =
      node.tagName === 'h1' && node.properties?.id === '-growlove'
    return !isGrowLove
  },
}

export default withMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkShikiTwoslash.default, remarkShikiTwoslashOptions],
      [remarkFrontmatter],
      [remarkMdxFrontmatter],
    ],
    rehypePlugins: [
      [rehypeRaw, {passThrough: nodeTypes}],
      [rehypeSlug],
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    ],
    providerImportSource: '@mdx-js/react',
  },
})
