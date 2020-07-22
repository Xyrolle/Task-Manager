import React, { useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'

const auth = (login: string, password: string) => {
    axios.post('http://46.101.172.171:8008/users/login/', {
        username: login,
        password: password
    })
        .then(function (response) {
            console.log(response);
            // return response;
        })
        .catch(function (error) {
            console.log(error);
        })
}
const Login: React.FC = () => {
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    return (
        <div className="loginWrap">
            <input ref={username} type="text" className="usernameInput" placeholder="Username" />
            <input ref={password} type="password" className="passwordInput" placeholder="Password" />
            <p>Dont have an accout?<Link to={`/register`}> Sign up </Link></p>
            <button
                onClick={() => {
                    auth(
                        username.current!.value,
                        password.current!.value)
                }}
                className="loginButton"
            >
                Log in
            </button>
        </div>
    )
}
export default Login;