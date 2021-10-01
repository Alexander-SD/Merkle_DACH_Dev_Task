import * as React from 'react';

import Register from './Register';
import Login from './Login';

const AuthenticationPage = () => {
    return (
        <div className='authentication-page'>
            <h1>Authentication Page</h1>
            <div className='authentication-form'>
                <Register />
                <Login />
            </div>
        </div>
    )
}

export default AuthenticationPage;