import Image, {ImageProps} from 'next/future/image'

const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = `${
  isProduction
    ? `https://with-heart.xyz`
    : `http://localhost:${process.env.PORT ?? 3000}`
}`

/**
 * Normalizes `src` so that if a non-file image is used (API route), the full
 * URL is used so the image is loaded.
 */
const normalizeSrc = (src: any) => {
  if (typeof src === 'string') {
    return /\.\w+$/.test(src) ? src : `${baseUrl}${src}`
  }

  return src
}

// this is not actually responsive. or is it? honestly not sure. it'll figure
// itself out eventually
export const ResponsiveImage = ({src, ...props}: ImageProps) => {
  // @ts-expect-error i know spreading `props` replaces `alt` if it's a prop,
  // that's the point
  return <Image alt="" {...props} src={normalizeSrc(src)} />
}
