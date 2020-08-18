import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AppContext } from 'context/AppContext';
import './Login.css';
import { getUserInfo } from 'context/queries';

const getToken = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      'http://46.101.172.171:8008/users/token/',
      {
        username,
        password,
      }
    );
    if (response.status === 200) {
      localStorage.setItem('token', response.data.access);
    }
  } catch (err) {
    console.log(err);
  }
};

const auth = async (
  login: string,
  password: string,
  setErrorMessage: (message: string) => void
) => {
  try {
    const response = await axios.post(
      'http://46.101.172.171:8008/users/login/',
      {
        username: login,
        password: password,
      }
    );
    response.status === 200 && (await getToken(login, password));
    return 200;
  } catch (error) {
    error.response.status === 400 &&
      setErrorMessage('Insert username and password');
    error.response.status === 401 &&
      setErrorMessage('Wrong username or password');
  }
};

const Login: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const [errorMessage, setErrorMessage] = useState('');
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  //need useHistory from React router dom
  const history = createBrowserHistory({ forceRefresh: true });

  

  const proceedLogin = async () => {
    const status = await auth(
        username.current!.value,
        password.current!.value,
        setErrorMessage)
    if (status === 200) {
      getUserInfo();
      history.push('/');
    }
  };

  return (
    <div className="loginWrap">
      <input
        ref={username}
        type="text"
        className="usernameInput"
        placeholder="Username"
      />
      <input
        ref={password}
        type="password"
        className="passwordInput"
        placeholder="Password"
      />
      <p>
        Don't have an account?<Link to={`/register`}> Sign up </Link>
      </p>
      {errorMessage && <div className="errorMessage"> {errorMessage}</div>}
      <button onClick={proceedLogin} className="loginButton">
        Log in
      </button>
    </div>
  );
};
export default Login;
