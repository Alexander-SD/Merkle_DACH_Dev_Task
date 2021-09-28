import * as React from 'react';
import axios from 'axios';

import { TextField, Button, Card, CardContent, CardActions } from '@mui/material';

const RegisterPage = () => {
    const [input, setInput] = React.useState({
        email: '',
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
        axios.post("http://localhost:5000/register", input)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setInput({
            email: '',
            password: ''
        });
    }

    return (
        <div>
            <h1>Register</h1>
            <div className='register-form'>
                <div className='register-window'>
                    <form onSubmit={submitHandler}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <TextField
                                    style={{ paddingRight: '16px' }}
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    name="email"
                                    type="email"
                                    onChange={changeHandler}
                                    value={input.email}
                                />
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={changeHandler}
                                    value={input.password}
                                />
                            </CardContent>
                            <CardActions style={{ paddingLeft: '16px' }}>
                                <Button
                                    className='register-field'
                                    variant="contained"
                                    type="submit"
                                >
                                    Register
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;