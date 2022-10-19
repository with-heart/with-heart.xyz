import Link from 'next/link'
import {ReactNode} from 'react'
import styles from './layout.module.scss'

export const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className={styles.layout}>
      <header>
        <Link href="/">🌱❤️‍🔥</Link>
      </header>
      <>{children}</>
    </div>
  )
}
