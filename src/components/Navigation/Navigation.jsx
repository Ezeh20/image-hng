import Button from '../Button/Button'
import Container from '../Container/Container'
import Link from 'next/link'
import styles from './Navigation.module.scss'

const Navigation = ({ path = 'signup', text = 'SignUp' }) => {
    return (
        <>
            <header className={styles.header}>
                <Container>
                    <nav className={styles.nav}>
                        <Link href={'/'} className={styles.logo}>
                            <p className={styles.logo}>GreekGods</p>
                        </Link>
                        <Link href={`/${path}`}>
                            <Button label={text} className={styles.btn} />
                        </Link>
                    </nav>
                </Container>
            </header>
        </>
    )
}

export default Navigation