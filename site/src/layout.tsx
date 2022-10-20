import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'
import styles from './layout.module.scss'

export const Layout = ({children}: {children: ReactNode}) => {
  const {route} = useRouter()
  const isIndex = route === '/'

  return (
    <div className={styles.layout}>
      {isIndex ? null : (
        <header>
          <Link href="/">🌱❤️‍🔥</Link>
        </header>
      )}
      <>{children}</>
    </div>
  )
}
