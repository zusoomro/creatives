import React, { Component } from 'react';
import styled from 'styled-components';
import Style from '../css/Style';

const Landing = () => (
  <Showcase>
    <StyledH2>let's get creative</StyledH2>
    <Style.row>
      <Style.Button to="/login">log in</Style.Button>
      <Style.Button to="/register">Sign up</Style.Button>
    </Style.row>
  </Showcase>
);

export default Landing;

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
