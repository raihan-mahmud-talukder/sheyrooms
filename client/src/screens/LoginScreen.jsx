import { useState } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"
import { Error } from "../components/Error"

export const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const login = async () => {
        const user = {
            email, password
        }
        try {
            setLoading(true)
            const result = (await axios.post('/api/users/login', user)).data
            setLoading(false)
            localStorage.setItem('currentUser', JSON.stringify(result))
            window.location.href = '/home'
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5 login">
            {loading && <Loader />}{error && <Error message= 'Invalid Credentials' />}
                <h1>Login</h1>
                <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
        </div>
    )
}
