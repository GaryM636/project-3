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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                <input type="password" autoComplete="on" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                <button type="submit" disabled={loginLoading}>Login</button>
            </form>
            {loginError && <p>Error: {loginError.message}</p>}

            <h2>Sign Up</h2>
            <form onSubmit={handleSignUpSubmit}>
                <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                <input type="password" autoComplete="on" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                <button type="submit" disabled={createUserLoading}>Sign Up</button>
            </form>
            {createUserError && <p>Error: {createUserError.message}</p>}
        </div>
    );
};

export default Login;
