"use client"
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from "./Login.module.scss"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const initialState = {
    email: '',
    password: '',
}


const Login = () => {
    const [details, setDetails] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [err, setError] = useState('')
    const router = useRouter()
    const session = useSession()
    const { email, password } = details

    useEffect(() => {
        if (session.status === "authenticated") {
            router?.push('/gallery')
        }
    }, [router, session.status])

    const submit = async () => {
        if (email.trim().length < 1) {
            setError('Please enter your email')
            return;
        } else if (password.trim().length < 1) {
            setError('Please enter your password')
            return;
        }
        setLoading(true)
        try {
            const res = await signIn('credentials',
                { email: email.trim(), password: password.trim(), redirect: false })
            if (!res?.error) {
                setLoading(false)
                router.push('/gallery')
            } else {
                const [, second] = res?.error.split(':')
                setError(second)
                setLoading(false)
            }
        } catch (error) {
            setError(error.error)
            setLoading(false)
        }
    }
    const style = {
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
        <>
            <section className={styles.login}>

                <form className={styles.loginField} autoComplete='new-password'>
                    <div className={styles.top}>
                        {err ? <p className={styles.err}>{err}</p> : undefined}
                        <Input value={email.trim()} label="Email" type="text" id={'username'}
                            placeholder="user@example.com"
                            onChange={e => setDetails({ ...details, email: e.target.value })}
                            style={style}
                            className={styles.user}
                        />
                    </div>
                    <Input value={password.trim()} label="Password" type="password" id={'password'}
                        onChange={e => setDetails({ ...details, password: e.target.value })}
                        style={stylePassword}
                    />
                    <div className={styles.bottom}>
                        <Button type={'button'} label={loading ? 'Loading...' : 'Login'} onClick={submit}
                            className={err ? `${styles.btn} ${styles.abc}` : `${styles.abc}`}
                        />
                        <p>Default</p>
                        <p>Email: user@example.com</p>
                        <p>Password: 1Password</p>
                    </div>

                </form>
            </section>
        </>
    )
}

export default Login