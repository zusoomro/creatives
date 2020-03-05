import React, { useState } from 'react';
import Style from '../css/Style';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords do not match');
    } else {
      console.log(formData);
    }
  };

  return (
    <Style.container>
      <Style.Form onSubmit={e => onSubmit(e)}>
        <h1>Register</h1>
        <p> Heyo, register here! </p>

        <Style.Label>Name</Style.Label>
        <Style.Input
          name="name"
          type="text"
          value={name}
          onChange={e => onChange(e)}
          required
        />

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

        <Style.Label>Re-enter Password</Style.Label>
        <Style.Input
          name="password2"
          type="password"
          value={password2}
          onChange={e => onChange(e)}
          required
        />
        <input type="submit" value="Submit"></input>
      </Style.Form>
    </Style.container>
  );
};

export default Register;
