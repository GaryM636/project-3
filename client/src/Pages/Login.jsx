import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN, CREATE_USER } from '../utils/mutations';

const Login = ({ handleLogin }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const navigate = useNavigate();

    const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
        onError: (error) => {
            console.error('Login error:', error);
        },
        onCompleted: (data) => {
            console.log('Login success:', data);
            localStorage.setItem('token', data.login.token);
            handleLogin();
            navigate("/");
        },
    });

    const [createUser, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER, {
        onError: (error) => {
            console.error('Sign up error:', error);
        },
        onCompleted: (data) => {
            console.log('Sign up success:', data);
            // Log in the user after sign up
            login({ variables: { email: signupEmail, password: signupPassword } });
        },
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ variables: { email: loginEmail, password: loginPassword } });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser({ variables: { email: signupEmail, password: signupPassword, username: signupUsername } });
        } catch (error) {
            console.error('Sign up error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input className="input-field" type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    <input className="input-field" type="password" autoComplete="on" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    <button className="submit-button" type="submit" disabled={loginLoading}>Login</button>
                </form>
                {loginError && <p className="error-message">Error: {loginError.message}</p>}
            </div>

            <div className="login-form">
                <h2 className="login-title">Sign Up</h2>
                <form onSubmit={handleSignUpSubmit}>
                    <input className="input-field" type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                    <input className="input-field" type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                    <input className="input-field" type="password" autoComplete="on" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                    <button className="submit-button" type="submit" disabled={createUserLoading}>Sign Up</button>
                </form>
                {createUserError && <p className="error-message">Error: {createUserError.message}</p>}
            </div>
        </div>
    );
};

export default Login;
