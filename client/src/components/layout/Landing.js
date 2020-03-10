import React from 'react';
import styled from 'styled-components';
import Style from '../css/Style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Showcase>
      <StyledH2>let's get creative</StyledH2>
      <Style.row>
        <Style.Button to="/login">log in</Style.Button>
        <Style.Button to="/register">Sign up</Style.Button>
      </Style.row>
    </Showcase>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

const Showcase = styled(Style.single_page)`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(https://source.unsplash.com/8SmWbHAdz_g/1600x900) no-repeat center
      center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
`;

const StyledH2 = styled.h2`
  font-size: 1.5rem;
  margin: 0.5rem;
`;
