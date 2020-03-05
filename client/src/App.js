import React from 'react';
import './App.css';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Style from './components/css/Style';

const App = () => (
  <Router>
    <React.Fragment>
      <GlobalStyle />
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Style.single_page>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Style.single_page>
    </React.Fragment>
  </Router>
);

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica';
  }
`;
