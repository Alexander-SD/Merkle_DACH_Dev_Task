import * as React from 'react';

import {
    Button,
    TextField,
    Paper, Grid,
    // InputLabel,
    // Select,
    // MenuItem,
    // FormControl,
    // Box
} from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SearchPage = () => {
    const [input, setInput] = React.useState({
        textInput: '',
        typeInput: '',
        yearInput: ''
    });
    const [responseData, setResponseData] = React.useState({});

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setInput({
            [name]: value
        });
    }
    console.log(input);

    React.useEffect(() => {
        axios({
            method: 'POST',
            data: input,
            withCredentials: true,
            url: 'http://localhost:5000/api'
        })
            .then(res => {
                setResponseData(res.data)
            })
            .catch(err => console.log(err));
    }, [input]);

    console.log(responseData);

    const history = useHistory();

    const logOut = (event) => {
        event.preventDefault();
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/logout'
        })
            .then(res => {
                console.log(res)
                if (res.data === false) {
                    history.push('/authentication');
                }
            })
            .catch(err => console.log(err));

    }

    return (
        <div className='search-page'>
            <h1>Search Page</h1>
            <div className='search-form'>
                <TextField
                    style={{ marginBottom: '16px' }}
                    required
                    id='outlined-required-register'
                    label='Search'
                    name='textInput'
                    type='text'
                    onChange={changeHandler}
                    value={input.textInput}
                />
                {/* <div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id='select-label'>Type</InputLabel>
                            <Select
                                labelId='select-label'
                                id='demo-simple-select'
                                value={input.typeInput}
                                label='Age'
                                name='typeInput'
                                onChange={changeHandler}
                            >
                                <MenuItem value='movie'>Movie</MenuItem>
                                <MenuItem value='series'>Series</MenuItem>
                                <MenuItem value='episode'>Episode</MenuItem>
                                <MenuItem value='game'>Game</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div> */}
            </div>
            <div className='logout-button'>
                <Button
                    className='register-field'
                    variant='contained'
                    type='button'
                    onClick={logOut}
                >
                    Logout
                </Button>
            </div>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {(responseData.Search !== null && responseData.Search !== undefined) ? responseData.Search.map((value) => (
                            <Grid key={value.imdbID} item>
                                <Paper sx={{
                                    height: 240,
                                    width: 200,
                                    // backgroundImage: value.Poster,
                                    backgroundColor: '#fafafa',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly',
                                    padding: '10%'
                                }}>
                                    <h3>{value.Title}</h3>
                                    <p>{value.Type}</p>
                                    <p>{value.Year}</p>
                                </Paper>
                            </Grid>
                        )) : null}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchPage;