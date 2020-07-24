import React, { useRef } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './Login.css'

const getToken = async (username: string, password: string) => {
    axios.post('http://46.101.172.171:8008/users/token/', {
        username,
        password
    })
        .then(function (response: any) {
            localStorage.setItem('token', response.data.access);
        })
        .catch(function (error) {
            console.log('token', error);
        })
}

const auth = (login: string, password: string) => {
    axios.post('http://46.101.172.171:8008/users/login/', {
        username: login,
        password: password
    })
        .then(function (response) {
            getToken(login, password)
        })
        .catch(function (error) {
            console.log(error);
        })
}
const Login: React.FC = () => {
    const history = useHistory();
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
                    history.push('/')
                }}
                className="loginButton"
            >
                Log in
            </button>
        </div>
    )
}
export default Login;