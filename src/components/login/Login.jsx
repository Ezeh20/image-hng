"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
const initialState = {
    email: '',
    password: '',
}


const Login = () => {
    const [details, setDetails] = useState(initialState)
    const { email, password } = details
    const submit = async () => {
        try {
            const { error } = await signIn('credentials', { email, password, redirect: false })
            const [,second] = error.split(':')
            if (second) {
                console.log(second);
            } else {
                console.log('valid')
            }

        } catch (error) {

        }
    }

    return (
        <div>
            <input type="text" placeholder="email"
                onChange={e => setDetails({ ...details, email: e.target.value })}
            />
            <input type="password" placeholder="password"
                onChange={e => setDetails({ ...details, password: e.target.value })}
            />
            <button onClick={submit}>submit</button>
        </div>
    )
}

export default Login