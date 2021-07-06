import React from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import Register from './register/register';
import Profile from './profile/profile';
import UserProfile from './userProfile/userProfile';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="wrapper">
    <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard" render={() => (
            token ? (
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
             ) : (
             <Redirect to="/login"/>
             )
           )}/>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/login">
            <Login setToken={setToken}/>
          </Route>
          <Route path="/register">
            <Register setToken={setToken}/>
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/user/:id" render={(props) => <UserProfile {...props} />}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
