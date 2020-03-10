import React, { useEffect } from 'react';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Styling
import Style from './components/css/Style';
// Redux
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // The useEffect hook is the functional component version of
  // the componentDidMount hook (when empty brackets are present)

  // Putting the empty brackers after the user auth ensures that
  // the loadUser function is only run once.

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <GlobalStyle />
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Style.single_page>
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Style.single_page>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;
