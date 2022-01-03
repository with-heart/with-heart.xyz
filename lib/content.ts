import * as fs from 'fs/promises'
import {constants as fsConstants} from 'fs'
import path from 'path'
import {globby} from 'globby'

const contentPath = 'pages'

const getContentFiles = () =>
  globby(contentPath, {
    expandDirectories: {
      files: ['*'],
      extensions: ['mdx'],
    },
  })

/**
 * @example
 * fileToSlug('index.mdx') // []
 * fileToSlug('nested/file.mdx') // ['nested', 'file']
 * fileToSlug('nested/index.mdx') // ['nested']
 */
const fileToSlug = (file: string) => {
  const relativePath = path.relative(contentPath, file)

  if (relativePath === 'index.mdx') {
    return []
  }

  // 'nested/index.mdx'
  if (relativePath.endsWith('/index.mdx')) {
    return relativePath.replace('/index.mdx', '').split('/')
  }

  return relativePath.replace('.mdx', '').split('/')
}

const fileExists = async (path: string) => {
  try {
    await fs.stat(path)
    return true
  } catch (error) {
    return false
  }
}

const slugToFilePath = async (slug: string[]) => {
  const resolvedPath = path.resolve(contentPath, `${slug.join('/')}`)
  const filePath = `${resolvedPath}.mdx`

  if (await fileExists(filePath)) {
    return filePath
  }

  const nestedPath = path.join(resolvedPath, 'index.mdx')
  if (await fileExists(nestedPath)) {
    return nestedPath
  }

  throw Error(`File for slug ${slug} does not exist`)
}

/** Get all content files and convert them to a slug array */
export const getAllContentSlugs = async () => {
  const files = await getContentFiles()
  return files.map((file) => {
    const slug = fileToSlug(file)
    return slug
  })
}

/**
 * Read the file for the given slug and return its contents
 *
 * @example
 * getContentBySlug(['nested', 'something']) // "# I'm a header"
 */
export const getContentBySlug = async (slug: string[]) => {
  const filePath = await slugToFilePath(slug)
  const content = await fs.readFile(filePath, 'utf-8')
  return content
}
