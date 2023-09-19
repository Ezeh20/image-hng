"use client"
import { useState } from "react"
import axios from 'axios'

const initialState = {
    username: '',
    email: '',
    password: '',
}


const SignUp = () => {
    const [details, setDetails] = useState(initialState)

    const submit = async () => {
        try {
            const { data } = await axios.post('/api/auth/register', details)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <input type="text" placeholder="email"
                onChange={e => setDetails({ ...details, username: e.target.value })}
            />
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

export default SignUp