import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <StyledNavbar>
    <StyledNavHeading to="/">Creatives</StyledNavHeading>
    <NavList>
      <NavListItem to="/">Creatives</NavListItem>
      <NavListItem to="/register">Register</NavListItem>
      <NavListItem to="/login">Login</NavListItem>
    </NavList>
  </StyledNavbar>
);

export default Navbar;

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
