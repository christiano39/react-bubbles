import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push } = useHistory();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const login = e => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post('http://localhost:5000/api/login', formValues)
      .then(res => {
        setIsLoading(false);
        setError('');
        localStorage.setItem('token', res.data.payload);
        push('/bubbles');
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err.response)
        setError(err.response.data.error)
      })
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={login}>
        <label htmlFor='username'>Username:&nbsp;</label>
        <input 
          type='text'
          id='username'
          name='username'
          value={formValues.username}
          onChange={handleInputChange}
        />
        <label htmlFor='password'>Username:&nbsp;</label>
        <input 
          type='password'
          id='password'
          name='password'
          value={formValues.password}
          onChange={handleInputChange}
        />
        <br/>
        <button>{isLoading ? 'Loading...' : 'Log in'}</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </>
  );
};

export default Login;
