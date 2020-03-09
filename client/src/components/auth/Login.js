import React, { useState } from 'react';
import Style from '../css/Style';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('success');
  };

  return (
    <Style.container>
      <Style.Form onSubmit={e => onSubmit(e)}>
        <h1>Login</h1>
        <p> Heyo, Login here! </p>

        <Style.Label>Email</Style.Label>
        <Style.Input
          name="email"
          type="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />

        <Style.Label>Password</Style.Label>
        <Style.Input
          name="password"
          type="password"
          value={password}
          onChange={e => onChange(e)}
          required
        />
        <input type="submit" value="Submit"></input>
      </Style.Form>
    </Style.container>
  );
};

export default Login;
