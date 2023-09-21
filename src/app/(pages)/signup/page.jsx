"use client"
import axios from 'axios'
import { useState, useEffect } from "react"
import Input from "@/components/Input/Input"
import Button from '@/components/Button/Button'
import Navigation from '@/components/Navigation/Navigation'
import { useSession } from 'next-auth/react'
import styles from './SignUp.module.scss'
import { useRouter } from 'next/navigation'
import { checkEmail } from '@/utils/email-checker'

const initialState = {
    name: '',
    email: '',
    password: '',
}


const SignUp = () => {
    const [details, setDetails] = useState(initialState)
    const { name, email, password } = details
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const session = useSession()
    const router = useRouter()
    const valid = checkEmail(email)

    useEffect(() => {
        if (session.status === "authenticated") {
            router?.push('/gallery')
        }
    }, [router, session.status])

    const submit = async () => {
        if (name.trim().length < 3) {
            setErr('username should be a minimum of 3 characters')
            return;
        } else if (!valid) {
            setErr('enter a valid email')
            return;
        } else if (password.trim().length < 8) {
            setErr('password should be a minimum of 8 characters')
            return;
        }

        try {
            setLoading(true)
            const { data } = await axios.post('/api/auth/register', details)
            if (data?.success) {
                setLoading(false)
                router.push('/')
            }
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    const style = {
        borderBottom: name.length > 0
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
                <p className={styles.err}>{err}</p>
                <div className={styles.nav}>
                    <Navigation path='' text='Login' />
                </div>
                <form className={styles.loginField}>
                    <Input type="text"
                        label={'UserName'}
                        onChange={e => setDetails({ ...details, name: e.target.value })}
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
                    <Button
                        type={'button'}
                        label={loading ? 'Loading...' : 'Signup'}
                        onClick={submit} className={err ? `${styles.errAlt}`
                            : ''}
                    />
                </form>
            </div>
        </section>
    )
}

export default SignUp