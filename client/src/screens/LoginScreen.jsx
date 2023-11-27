import { useState } from "react"
import axios from 'axios'

export const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        const user = {
            email, password
        }
        try {
            const result = (await axios.post('/api/users/login', user)).data
        } catch (error) { console.log(error) }
        console.log(user)
    }
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5 login">
                <div>
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
        </div>
    )
}
