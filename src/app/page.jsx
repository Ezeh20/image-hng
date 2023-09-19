"use client"
import styles from './page.module.scss'
import Login from '@/components/login/Login'


export default function Home() {

  return (
    <main className={styles.main}>
      <Login />
    </main>
  )
}