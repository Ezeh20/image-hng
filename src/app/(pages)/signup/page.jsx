"use client"
import axios from 'axios'
import { useState } from "react"
import Input from "@/components/Input/Input"
import Button from '@/components/Button/Button'
import Navigation from '@/components/Navigation/Navigation'
import styles from './SignUp.module.scss'

const initialState = {
    username: '',
    email: '',
    password: '',
}


const SignUp = () => {
    const [details, setDetails] = useState(initialState)
    const { username, email, password } = details
    const submit = async () => {
        try {
            const { data } = await axios.post('/api/auth/register', details)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const style = {
        borderBottom: username.length > 0
            ? '2px solid #FFB000' : '2px solid #fff',
        '&:focus': {
            borderBottom: '2px solid #FFB000'
        }
    }

    const styleEmail = {
        borderBottom: email.length > 0
            ? '2px solid #FFB000' : '2px solid #fff',
        '&:focus': {
            borderBottom: '2px solid #FFB000'
        }
    }

    const stylePassword = {
        borderBottom: password.length > 0
            ? '2px solid #FFB000' : '2px solid #fff',
        '&:focus': {
            borderBottom: '2px solid #FFB000'
        }
    }


    return (
        <section className={styles.signup}>
            <div className={styles.overlay}>
                <div className={styles.nav}>
                    <Navigation path='' text='Login' />
                </div>
                <form className={styles.loginField}>
                    <Input type="text"
                        label={'UserName'}
                        onChange={e => setDetails({ ...details, username: e.target.value })}
                        style={style}
                    />
                    <Input type="text"
                        label={'Email'}
                        onChange={e => setDetails({ ...details, email: e.target.value })}
                        style={styleEmail}
                    />
                    <Input type="password"
                        label={'Password'}
                        onChange={e => setDetails({ ...details, password: e.target.value })}
                        style={stylePassword}
                    />
                    <Button type={'button'} label={'Signup'} onClick={submit} />
                </form>
            </div>
        </section>
    )
}

export default SignUp