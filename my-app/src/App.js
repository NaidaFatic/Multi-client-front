import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './dashboard/dashboard';
import Login from './login/login';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
    <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/dashboard">
              <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
