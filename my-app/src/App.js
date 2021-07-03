import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './dashboard/dashboard';
import LoginRegister from './login-register/login-register';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <LoginRegister setToken={setToken} />
  }
  return (
    <div className="wrapper">
    <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginRegister/>
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
