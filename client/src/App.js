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
// Redux
import store from './store';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <GlobalStyle />
        <Navbar />
        <Style.single_page>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Style.single_page>
      </React.Fragment>
    </Router>
  </Provider>
);

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;
