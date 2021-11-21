import {GetStaticPaths, GetStaticPropsContext} from 'next'
import {getAllContentSlugs, getContentBySlug} from '../lib/content'

export default function ContentPage({content}: {content: string}) {
  return (
    <div>
      <pre>
        <code>{content}</code>
      </pre>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await getAllContentSlugs()
  return {
    paths: content.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params!.slug as string[]
  const content = await getContentBySlug(slug)
  return {props: {content}}
}
