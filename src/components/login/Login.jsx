"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import styles from "./Login.module.scss"

const initialState = {
    username: '',
    password: '',
}


const Login = () => {
    const [details, setDetails] = useState(initialState)
    const { username, password } = details
    const submit = async () => {
        try {
            const { error } = await signIn('credentials', { username, password, redirect: false })
            const [, second] = error.split(':')
            if (second) {
                console.log(second);
            } else {
                console.log('valid')
            }

        } catch (error) {

        }
    }
    const style = {
        borderBottom: username.length > 0
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
        <section className={styles.login}>
            <form className={styles.loginField} autoComplete='new-password'>
                <Input value={username} label="UserName" type="text" id={'username'}
                    onChange={e => setDetails({ ...details, username: e.target.value })}
                    style={style}
                />
                <Input label="Password" type="password" id={'password'}
                    onChange={e => setDetails({ ...details, password: e.target.value })}
                    style={stylePassword}
                />
                <Button type={'button'} label={'Login'} />
            </form>
        </section>
    )
}

export default Login