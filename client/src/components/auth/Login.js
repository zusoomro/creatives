import React, { useState } from 'react';
import Style from '../css/Style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if the user is already logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
