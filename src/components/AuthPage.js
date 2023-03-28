import React from 'react';
import LoginForm from './Login';
import RegisterForm from './Register';

function AuthPage() {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            <LoginForm />
            <h2 className="mb-4 mt-5">Register</h2>
            <RegisterForm />
        </div>
    );
}

export default AuthPage;
