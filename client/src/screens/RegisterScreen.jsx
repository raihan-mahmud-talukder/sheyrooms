import { useState } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"
import { Error } from "../components/Error"
import { Success } from "../components/Success"

export const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSucces] = useState()

    const register = async () => {
        if (password == confirmPassword) {
            const user = {
                name, email, password, confirmPassword
            }
            try {
                setLoading(true)
                const result = (await axios.post('/api/users/register', user)).data
                setLoading(false)
                setSucces(true)
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
            }
        } else { alert('Passwords not matched!') }
    }
    return (
        <div className="row justify-content-center mt-5">
            {loading && <Loader />}{error && <Error />}
            <div className="col-md-5 login">
                {success && <Success message='Registration Success!' />}
                <div>
                    <h1>Register</h1>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
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
                    <input
                        type="password"
                        className="form-control"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                    <button className="btn btn-primary" onClick={register}>Register</button>
                </div>
            </div>
        </div>
    )
}
