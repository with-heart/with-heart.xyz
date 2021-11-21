import * as fs from 'fs/promises'
import path from 'path'
import {globby} from 'globby'

// pages/nested/something.mdx -> nested/something

const contentPath = 'pages'

const getContentFiles = () =>
  globby(contentPath, {
    expandDirectories: {
      files: ['*'],
      extensions: ['mdx'],
    },
  })

/** Converts a file string to a slug array */
const fileToSlug = (file: string) => {
  const relativePath = path.relative(contentPath, file)
  return relativePath.replace('.mdx', '').split('/')
}

const slugToFilePath = (slug: string[]) => {
  const filePath = `${slug.join('/')}.mdx`
  return path.resolve(contentPath, filePath)
}

/** Get all content files and convert them to a slug array */
export const getAllContentSlugs = async () => {
  const files = await getContentFiles()
  return files.map((file) => fileToSlug(file))
}

/**
 * Read the file for the given slug and return its contents
 *
 * @example
 * getContentBySlug(['nested', 'something']) // "# I'm a header"
 */
export const getContentBySlug = async (slug: string[]) => {
  const filePath = slugToFilePath(slug)
  const content = await fs.readFile(filePath, 'utf-8')
  return content
}
