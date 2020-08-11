import React, { useRef } from 'react';
import axios from 'axios';
import './Registration.css';
import { Link, useHistory } from 'react-router-dom';
import { RegisterType } from './types';

const getToken = async (username: string, password: string) => {
    axios.post('http://46.101.172.171:8008/users/token/', {
        username,
        password
    })
        .then(function (response: any) {
            console.log('token', response.data);
            localStorage.setItem('token', response.data.access);
        })
        .catch(function (error) {
            console.log('token', error);
        })
}
const register: RegisterType = async (first_name, last_name, email, username, password) => {
    axios.post('http://46.101.172.171:8008/users/register/', {
        first_name,
        last_name,
        email,
        username,
        password
    })
        .then(function (response: any) {
            getToken(username, password)
        })
        .catch(function (error) {
            console.log(error);
        })
}

const Registration: React.FC = () => {
    const history = useHistory();
    const first_name = useRef<HTMLInputElement>(null)
    const last_name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    return (
        <div className="registrationWrap">
            <input ref={first_name} type="text" className="registrationInput" placeholder="First Name" />
            <input ref={last_name} type="text" className="registrationInput" placeholder="Last Name" />
            <input ref={email} type="email" className="registrationInput" placeholder="Email" />
            <input ref={username} type="text" className="registrationInput" placeholder="Username" />
            <input ref={password} type="password" className="registrationInput" placeholder="Password" />
            <p>Dont have an accout?<Link to={`/register`}> Sign up </Link></p>
            <button
                onClick={async () => {
                    await register(
                        first_name.current!.value,
                        last_name.current!.value,
                        email.current!.value,
                        username.current!.value,
                        password.current!.value,
                    )
                    await history.push('/')
                }}
                className="loginButton"
            >
                Sign Up
</button>
        </div>
    )
}
export default Registration;