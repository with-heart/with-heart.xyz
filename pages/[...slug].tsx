import {GetStaticPaths, GetStaticPropsContext} from 'next'
import {getMDXComponent} from 'mdx-bundler/client'
import {getAllContentSlugs, getContentBySlug} from '../lib/content'
import {compileMarkdown} from '../lib/markdown'
import {useMemo} from 'react'

export default function ContentPage({
  code,
  frontmatter,
}: {
  code: string
  frontmatter: any
}) {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <div>
      <Component />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await getAllContentSlugs()
  const paths = content.map((slug) => ({
    params: {slug},
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params!.slug as string[]
  const content = await getContentBySlug(slug)
  const {code, frontmatter} = await compileMarkdown(content)

  return {props: {code, frontmatter}}
}
