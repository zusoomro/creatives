// Utils
import React, { useEffect } from 'react';

// Components
import NavbarComponent from './components/layout/NavbarComponent';
import Landing from './components/layout/Landing';
import AlertComponent from './components/layout/AlertComponent';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Container from 'react-bootstrap/Container';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

// Styling
import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

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
          <NavbarComponent />
          <Route exact path="/" component={Landing} />
          <Container className="my-5">
            <AlertComponent />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <Route exact path="/profiles" component={Profiles} />
            </Switch>
          </Container>
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
