import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container
      fluid
      className="text-white bg-dark vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://source.unsplash.com/8SmWbHAdz_g/1600x900)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div>
        <h3 className="display-3 mx-2">Let's get creative.</h3>
        <p style={{ maxWidth: 600 }} className="lead mx-2">
          Creatives is a platform for artists and designers to connect. Discuss
          what you've been working on or collaborate with other artists using
          Creatives.
        </p>

        <div className="d-flex flex-column flex-sm-row align-items-sm-center ">
          <Button as={Link} to="/login" className="m-2">
            Log In
          </Button>
          <Button as={Link} to="/register" className="m-2">
            Sign up
          </Button>
        </div>
      </div>
    </Container>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
