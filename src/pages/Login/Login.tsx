import React, { useRef, useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { axiosConfig } from 'utils/axiosConfig'
import './Login.css'



const getToken = async (username: string, password: string) => {

    try {
        const response = await axios.post('http://46.101.172.171:8008/users/token/', {
            username,
            password
        })
        if (response.status === 200) {
            localStorage.setItem('token', response.data.access)
        }
    } catch (err) {
        console.log(err)
    }
}

const auth = async (login: string, password: string, setErrorMessage: (message: string) => void) => {
    try {
        const response = await axios.post('http://46.101.172.171:8008/users/login/', {
            username: login,
            password: password
        })
        response.status === 200 && await getToken(login, password)
        return 200;
    } catch (error) {
        error.response.status === 400 && setErrorMessage('Insert username and password')
        error.response.status === 401 && setErrorMessage('Wrong username or password')
    }


}
const Login: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const history = useHistory();
    return (
        <div className="loginWrap">
            <input ref={username} type="text" className="usernameInput" placeholder="Username" />
            <input ref={password} type="password" className="passwordInput" placeholder="Password" />
            <p>Dont have an accout?<Link to={`/register`}> Sign up </Link></p>
            {errorMessage && <div className="errorMessage"> {errorMessage}</div>}
            <button
                onClick={async () => {
                    const status = await auth(
                        username.current!.value,
                        password.current!.value,
                        setErrorMessage)
                    await status === 200 && history.push('/')
                }}
                className="loginButton"
            >
                Log in
            </button>

        </div >
    )
}
export default Login;