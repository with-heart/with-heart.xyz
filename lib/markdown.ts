import {bundleMDX} from 'mdx-bundler'

export const compileMarkdown = (source: string) =>
  bundleMDX({
    source,
    xdmOptions: (options) => ({
      ...options,
      rehypePlugins: [],
      remarkPlugins: [],
    }),
  })
