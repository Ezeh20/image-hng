import Button from '../Button/Button'
import Container from '../Container/Container'
import styles from './Navigation.module.scss'

const Navigation = () => {
    return (
        <>
            <header className={styles.header}>
                <Container>
                    <nav className={styles.nav}>
                        <p className={styles.logo}>GreekGods</p>
                        <Button label={'Signup'} className={styles.btn} />
                    </nav>
                </Container>
            </header>
        </>
    )
}

export default Navigation