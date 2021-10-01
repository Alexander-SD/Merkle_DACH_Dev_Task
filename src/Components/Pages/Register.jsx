import * as React from 'react';
import axios from 'axios';

import { TextField, Button } from '@mui/material';

const Register = () => {
    const [input, setInput] = React.useState({
        username: '',
        password: ''
    });

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
            url: 'http://localhost:5000/register'
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        console.log(input);
        setInput({
            username: '',
            password: ''
        });
    }

    return (
        <div className='form-wrapper'>
            <h2>Register</h2>
            <form onSubmit={submitHandler} className='register-form'>
                <TextField
                    style={{ marginBottom: '16px' }}
                    required
                    id='outlined-required-register'
                    label='Username'
                    name='username'
                    type='text'
                    onChange={changeHandler}
                    value={input.username}
                />
                <TextField
                    style={{ marginBottom: '16px' }}
                    required
                    id='outlined-password-input-register'
                    label='Password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    onChange={changeHandler}
                    value={input.password}
                />
                <Button
                    variant='contained'
                    type='submit'
                >
                    Register
                </Button>
            </form>
        </div>
    )
}

export default Register;