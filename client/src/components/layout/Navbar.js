import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logOut }) => {
  const authLinks = (
    <NavList>
      <NavListItem to="/dashboard">Dashboard</NavListItem>
      <NavListItem onClick={logOut} to="#!">
        Log Out
      </NavListItem>
    </NavList>
  );

  const guestLinks = (
    <NavList>
      <NavListItem to="/">Creatives</NavListItem>
      <NavListItem to="/register">Register</NavListItem>
      <NavListItem to="/login">Login</NavListItem>
    </NavList>
  );

  return (
    <StyledNavbar>
      <StyledNavHeading to="/">Creatives</StyledNavHeading>
      {!loading ? (
        <React.Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </React.Fragment>
      ) : null}
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logOut })(Navbar);

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  background-color: #333;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const StyledNavHeading = styled(StyledLink)`
  font-size: 1.5rem;
`;

const NavList = styled.ul`
  display: flex;
`;

const NavListItem = styled(StyledLink)`
  font-size: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  :hover {
    background: #fff;
    color: #333;
    border-radius: 5px;
  }
`;
