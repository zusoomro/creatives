import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = ({ auth: { isAuthenticated, loading }, logOut }) => {
  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/profiles">
        Profiles
      </Nav.Link>
      <Nav.Link as={Link} to="/dashboard">
        Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/posts">
        Posts
      </Nav.Link>
      <Nav.Link onClick={logOut}>Log Out</Nav.Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className="justify-content-end">
      <Nav.Link as={Link} to="/profiles">
        Profiles
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/" className="ml-2">
        <i className="fas fa-headphones fa-lg mr-2"></i>
        Creatives
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="ml-auto">
        {!loading ? (
          <React.Fragment>
            {isAuthenticated ? authLinks : guestLinks}
          </React.Fragment>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logOut })(NavbarComponent);
