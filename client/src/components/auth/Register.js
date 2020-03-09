import React, { useState } from 'react';
import Style from '../css/Style';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      console.log('success');
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Register);
