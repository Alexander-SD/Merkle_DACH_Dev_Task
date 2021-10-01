import * as React from 'react';

import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [input, setInput] = React.useState({
        username: '',
        password: ''
    });

    const history = useHistory();

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setInput(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const submitHandler = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            data: input,
            withCredentials: true,
            url: 'http://localhost:5000/login'
        })
            .then(res => {
                console.log(res)
                if (res.data === true) {
                    history.push('/search')
                }
            })
            .catch(err => console.log(err));
        console.log(input);
    }

    return (
        <div className='form-wrapper'>
            <h2>Login</h2>
            <form onSubmit={submitHandler} className='register-form'>
                <TextField
                    style={{ marginBottom: '16px' }}
                    required
                    id='outlined-required-login'
                    label='Username'
                    name='username'
                    type='text'
                    onChange={changeHandler}
                    value={input.username}
                />
                <TextField
                    style={{ marginBottom: '16px' }}
                    required
                    id='outlined-password-input-login'
                    label='Password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    onChange={changeHandler}
                    value={input.password}
                />
                <Button
                    className='register-field'
                    variant='contained'
                    type='submit'
                >
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;