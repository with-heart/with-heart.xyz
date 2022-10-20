import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'
import {GrowLove} from './growlove'
import styles from './layout.module.scss'

export const Layout = ({children}: {children: ReactNode}) => {
  const {route} = useRouter()
  const isIndex = route === '/'

  return (
    <div className={styles.layout}>
      {isIndex ? null : (
        <header>
          <Link href="/">
            <div className="pointer" title="GrowLove">
              <GrowLove randomize />
            </div>
          </Link>
        </header>
      )}
      <>{children}</>
      <footer>
        <GrowLove randomize />
      </footer>
    </div>
  )
}
