"use client"
import Navigation from '@/components/Navigation/Navigation'
import Login from '@/components/login/Login'
import styles from './page.module.scss'


export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.overlay}>
        <div className={styles.nav}>
          <Navigation />
        </div>
        <Login />
      </div>
    </main>
  )
}
