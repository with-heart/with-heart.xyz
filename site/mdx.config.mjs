import {nodeTypes} from '@mdx-js/mdx'
import withMdx from '@next/mdx'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkShikiTwoslash from 'remark-shiki-twoslash'
import remarkToc from 'remark-toc'

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
    const isTableOfContents =
      node.tagName === 'h2' && node.properties?.id === 'table-of-contents'
    return !isGrowLove && !isTableOfContents
  },
}

/** @type {import('remark-toc').Options} */
const remarkTocOptions = {
  maxDepth: 3,
  tight: true,
}

export default withMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkShikiTwoslash.default, remarkShikiTwoslashOptions],
      [remarkFrontmatter],
      [remarkMdxFrontmatter],
      [remarkToc, remarkTocOptions],
    ],
    rehypePlugins: [
      [rehypeRaw, {passThrough: nodeTypes}],
      [rehypeSlug],
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    ],
    recmaPlugins: [[recmaNextjsStaticProps]],
    providerImportSource: '@mdx-js/react',
  },
})
